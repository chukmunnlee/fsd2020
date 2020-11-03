// load the libraries
const express = require('express')
const handlebars = require('express-handlebars')
const mysql = require('mysql2/promise')

// configure the PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// configure connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306, 
    database: process.env.DB_NAME || 'playstore',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 4, 
    timezone: '+08:00'
})

// SQL
const SQL_GET_APP_CATEGORIES = 'select distinct(category) from apps';
const SQL_GET_APPS = 'select app_id, name from apps limit ? offset ?';
const SQL_GET_APP_BY_APPID = 'select * from apps where app_id = ?'

// create express
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// application
app.get('/', async (req, resp) => {

    const conn = await pool.getConnection()

    try {
        const results = await conn.query(SQL_GET_APPS, [ 20, 0 ])

        resp.status(200)
        resp.type('text/html')
        resp.render('index', { apps: results[0] })

    } catch(e) {
        resp.status(500)
        resp.type('text/html')
        resp.send(JSON.stringify(e))
    } finally {
        conn.release()
    }

})

app.get('/app/:appId', async (req, resp) => {
    const appId = req.params['appId']

    const conn = await pool.getConnection()

    try {
        const results = await conn.query(SQL_GET_APP_BY_APPID, [ appId ])
        const recs = results[0]

        if (recs.length <= 0) {
            //404!
            resp.status(404)
            resp.type('text/html')
            resp.send(`Not found: ${appId}`)
            return
        }

        resp.status(200)
        resp.format({
            'text/html': () => {
                resp.type('text/html')
                resp.render('app', { app: recs[0] })
            },
            'application/json': () => {
                resp.type('application/json')
                resp.json(recs[0])
            },
            'default': () => {
                resp.type('text/plain')
                resp.send(JSON.stringify(recs[0]))
            }
        })

    } catch(e) {
        resp.status(500)
        resp.type('text/html')
        resp.send(JSON.stringify(e))
    } finally {
        conn.release()
    }
})

app.get('/category', async (req, resp) => {

    const conn = await pool.getConnection()

    try {
        const results = await conn.query(SQL_GET_APP_CATEGORIES)
        const cats = results[0].map(v => v.category)

        resp.status(200)
        resp.type('text/html')
        resp.render('index', { category: cats })

    } catch(e) {
        resp.status(500)
        resp.type('text/html')
        resp.send(JSON.stringify(e))
    } finally {
        conn.release()
    }

})

// start the server
pool.getConnection()
    .then(conn => {
        console.info('Pinging database...')
        const p0 = Promise.resolve(conn)
        const p1 = conn.ping()
        return Promise.all([ p0, p1 ])
    })
    .then(results => {
        const conn = results[0]
        // release the connection
        conn.release()

        // start the server
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`)
        })
    })
    .catch(e => {
        console.error('Cannot start server: ', e)
    })