const mysql = require('mysql2/promise')
const fs = require('fs')

const pool = mysql.createPool({
	user: 'root',
	password: 'root',
	database: 'leisure',
	connectionLimit: 2
})


const READ_PICTURE = 'select * from pictures where pic_id = ?'

const run = async (pic_id, pool) => {

	const conn = await pool.getConnection()

	try {
		const result = await conn.query(READ_PICTURE, [ pic_id ])
		console.info('result = ', result[0][0].pictures)
		const buff = result[0][0].pictures
		const title = result[0][0].title
		conn.release()

		fs.writeFile(`/opt/tmp/${title}`, buff,
			(err) => {
				if (null != err) {
					console.info('err: ', err)
					return;
				}
				console.info('> written')
			}
		)
	} catch(e) {
		console.error('error = ', e)
	}
}


run(1, pool)
