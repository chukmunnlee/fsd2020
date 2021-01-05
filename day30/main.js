const morgan = require('morgan')
const express = require('express')
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER || 'fred',
    password: process.env.DB_PASSWORD || 'fred',
    database: 'paf2020',
    connectionLimit: 4,
    timezone: '+08:00'
})

const SQL_SELECT_USER = 'select user_id, email from user where user_id = ? and password = sha1(?)'

// Passport core
const passport = require('passport')
// Passport strategy
const LocalStrategy = require('passport-local').Strategy

const mkAuth = (passport) => {
    return (req, resp, next) => {
        passport.authenticate('local',
            (err, user, info) => {
                if (null != err) {
                    resp.status(401)
                    resp.type('application/json')
                    resp.json({ error: err })
                    return
                }
                next()
            }
        )(req, resp, next)
    }
}

// configure passport with a strategy
passport.use(
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' },
        async (user, password, done) => {
            // perform the authentication
            console.info(`LocalStrategy> username: ${user}, password: ${password}`)
            const conn = await pool.getConnection()
            try {
                const [ result, _ ] = await conn.query(SQL_SELECT_USER, [ user, password ])
                if (result.length > 0)
                    done(null, {
                        username: result[0].user_id,
                        avatar: `https://i.pravatar.cc/400?u=${result[0].email}`,
                        loginTime: (new Date()).toString()
                    })
                else
                    done('Incorrect login', false)
            } catch(e) {
                done(e, false)
            } finally {
                conn.release()
            }
        }
    )
)

const localStrategyAuth = mkAuth(passport)

const PORT = parseInt(process.env.PORT) || 3000

const app = express()
app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// initialize passport after json and form-urlencoded
app.use(passport.initialize())

app.post('/login', 
    // passport middleware to perform login
    // passport.authenticate('local', { session: false }),
    // authenticate with custom error handling
    localStrategyAuth,
    (req, resp) => {
        // do something 
        console.info(`user: `, req.user)
        // generate JWT token

        resp.status(200)
        resp.type('application/json')
        resp.json({ message: `Login in at ${new Date()}`})
    }
)

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})