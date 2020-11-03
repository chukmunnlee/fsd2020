// load the libs
const express = require('express')
const handlebars = require('express-handlebars')
const mysql = require('mysql2/promise')

// configurables
const LIMIT = 30

// SQL
const SQL_TV_LIST = 'select tvid, name from tv_shows order by name asc limit ?'
const SQL_TV_SHOW = 'select * from tv_shows where tvid = ?'

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

// create an instance of the application
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// configure application
app.get('/', async (req, resp) => {

	const conn = await pool.getConnection()

	try {
		const [ result, _ ] = await conn.query(SQL_TV_LIST, [ LIMIT ])
		resp.status(200)
		resp.type('text/html')
		resp.render('index', { shows: result })
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	} finally {
		conn.release()
	}
})

app.get('/show/:tvid', async (req, resp) => {

	const tvid = req.params.tvid

	const conn = await pool.getConnection()

	try {
		const [ result, _ ] = await conn.query(SQL_TV_SHOW, [ tvid ])
		resp.status(200)
		resp.type('text/html')
		resp.render('show', { show: result[0], hasSite: !!result[0].official_site })
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	} finally {
		conn.release()
	}
})

app.use((req, resp) => {
	resp.redirect('/')
})

// start application
startApp(app, pool)
