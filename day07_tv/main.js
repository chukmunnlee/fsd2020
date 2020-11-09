// load the libs
const express = require('express')
const handlebars = require('express-handlebars')
const mysql = require('mysql2/promise')

// configurables
const LIMIT = 30

// SQL
const SQL_TV_LIST = 'select tvid, name from tv_shows order by name asc limit ?'
const SQL_TV_SHOW = 'select * from tv_shows where tvid = ?'

const mkQuery = (sqlStmt, pool) => {
	const f = async (params) => {
		// get a connection from the pool
		const conn = await pool.getConnection()

		try {
			// Execute the query with the parameter
			const results = await pool.query(sqlStmt, params)
			return results[0]
		} catch(e) {
			return Promise.reject(e)
		} finally {
			conn.release()
		}
	}
	return f
}

const startApp = async (app, pool) => {
	const conn = await pool.getConnection()
	try {
		console.info('Pinging database...')
		await conn.ping()
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	} catch(e) {
		console.error('Cannot ping database', e)
	} finally {
		conn.release()
	}
}

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT) || 3306,
	database: 'leisure',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	connectionLimit: 4
})

// create queries
const getTVList = mkQuery(SQL_TV_LIST, pool)
const getTVShowById = mkQuery(SQL_TV_SHOW, pool)

// create an instance of the application
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// configure application
app.get('/', async (req, resp) => {

	try {
		//const [ result, _ ] = await conn.query(SQL_TV_LIST, [ LIMIT ])
		const result = await getTVList([ LIMIT ])
		resp.status(200)
		resp.type('text/html')
		resp.render('index', { shows: result })
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	}
})

app.get('/show/:tvid', async (req, resp) => {

	const tvid = req.params.tvid

	try {
		// const [ result, _ ] = await conn.query(SQL_TV_SHOW, [ tvid ])
		const result = await getTVShowById([ tvid ])
		resp.status(200)
		resp.type('text/html')
		resp.render('show', { show: result[0], hasSite: !!result[0].official_site })
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	}
})

app.use((req, resp) => {
	resp.redirect('/')
})

// start application
startApp(app, pool)
