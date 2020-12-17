const mysql = require('mysql2/promise')

const pool = mysql.createPool({
	user: 'root',
	password: 'root',
	database: 'neatstack',
	connectionLimit: 2
})

const board = {
	board_id: 'efghijk',
	user_id: 'fred', 
	title: 'Hello world',
	created_on: new Date()
}

const INSERT_KBOARD = 'insert into kboard (board_id, user_id, title, created_on) values (?, ?, ?, ?)'
const INSERT_KCARD = 'insert into kcard (board_id, description, priority) values (?, ?, ?)'


const run = async (pool) => {
	const conn = await pool.getConnection()

	try {
		conn.beginTransaction()

		console.info('>>> inserting kboard')
		conn.query(INSERT_KBOARD, [ 'abcd6789', 'fred', 'hello, world', new Date() ])

		console.info('>>> inserting kcard 1')
		conn.query(INSERT_KCARD, [ 'abcd6789', 'todo 1', 1 ])

		console.info('>>> inserting kcard 2')
		conn.query(INSERT_KCARD, [ 'abcd6789', 'todo 2', 2 ])

		throw new Error('simulated error')

		/*
		console.info('>>> inserting kcard 3')
		conn.query(INSERT_KCARD, [ 'abcd6789', 'todo 3', 2 ])

		conn.commit()

		console.info('committed')
		*/

	} catch(e) {
		console.info('> error: ', e)
		conn.rollback()
	}
}

run(pool)
