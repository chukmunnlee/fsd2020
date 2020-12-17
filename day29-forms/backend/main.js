const cors = require('cors')
const express = require('express')

const PORT = 3000

const app = express()

app.use(cors())

// application/x-www-form-urlencoded
app.post('/book', express.urlencoded({ extended: true }),
	(req, resp) => {

		console.info('>> payload: ', req.body)

		resp.status(200).type('application/json')
		resp.json({ message: 'accepted' })
	}
)

app.use(express.static(__dirname + '/public'))

app.listen(PORT, () => {
	console.info(`Application started on port ${3000} at ${new Date()}`)
})
