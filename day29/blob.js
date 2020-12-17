const mysql = require('mysql2/promise')
const fs = require('fs')

const pool = mysql.createPool({
	user: 'root',
	password: 'root',
	database: 'leisure',
	connectionLimit: 2
})


const INSERT_PICTURE = 'insert into pictures (pictures, title) values (?, ?)'

fs.readFile('/opt/tmp/pitbull.jpg', async (err, buff) => {
	if (null != err) {
		console.error('file read error: ', err)
		process.exit(-1)
	}
	console.log('buffer = ', buff)

	const conn = await pool.getConnection()
	try {
		const result = await conn.query(INSERT_PICTURE, 
			[ buff, `Pitbull ${new Date()}` ]
		)
		console.info('result = ', result)
		conn.release()
	} catch(e) {
		console.error('error = ', e)
	}
})

//run(pool)
