//const MongoClient = require('mongodb').MongoClient
//const Timestamp = require('mongodb').Timestamp

const { Timestamp, MongoClient } = require('mongodb')
const morgan = require('morgan')
const express = require('express')

const DATABASE = 'take-temp-together'
const COLLECTION = 'temperature'

const mkTemperature = (params) => {
	return {
		ts: Timestamp.fromNumber((new Date()).getTime()),
		user: params.userName,
		q1: params.q1,
		q2: params.q2,
		temperature: params.temperature
	}
}

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000
const MONGO_URL = 'mongodb://localhost:27017'

const mongoClient = new MongoClient(MONGO_URL, 
	{ useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(morgan('combined'))

// POST /temperature
app.post('/temperature', express.json(), (req, resp) => {
	// req.body.userName, 
	// req.body.q1, req.body.q2, 
	// req.body.temperature
	const doc = mkTemperature(req.body)

	//TODO insert doc into mongo

	resp.status(200)
	resp.type('application/json')
	resp.json({})
})

mongoClient.connect()
	.then(() => {
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	})
	.catch(err => { console.error('Cannot connect: ', err) })
