
const { MongoClient  } = require('mongodb')
const AWS = require('aws-sdk')
const morgan = require('morgan')
const multer = require('multer')
const express = require('express')
const fs = require('fs')

const DATABASE = 'take-temp-together'
const COLLECTION = 'temperature'

const mkTemperature = (params, image) => {
	return {
		ts: new Date(),
		user: params.userName,
		q1: 'true' == params.q1.toLowerCase(),
		q2: 'true' == params.q2.toLowerCase(),
		temperature: parseFloat(params.temperature),
		image
	}
}

const readFile = (path) => new Promise(
	(resolve, reject) => 
		fs.readFile(path, (err, buff) => {
			if (null != err)
				reject(err)
			else 
				resolve(buff)
		})
)

const putObject = (file, buff, s3) => new Promise(
	(resolve, reject) => {
		const params = {
			Bucket: 'acme',
			Key: file.filename, 
			Body: buff,
			ACL: 'public-read',
			ContentType: file.mimetype,
			ContentLength: file.size
		}
		s3.putObject(params, (err, result) => {
			if (null != err)
				reject(err)
			else
				resolve(result)
		})
	}
)

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000
const MONGO_URL = 'mongodb://localhost:27017'

const s3 = new AWS.S3({
	endpoint: new AWS.Endpoint('sgp1.digitaloceanspaces.com'),
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const mongoClient = new MongoClient(MONGO_URL, 
	{ useNewUrlParser: true, useUnifiedTopology: true })

const upload = multer({
	dest: process.env.TMP_DIR || '/opt/tmp/uploads'
})

const app = express()

app.use(morgan('combined'))

// POST /temperature
//app.post('/temperature', express.json(), (req, resp) => {
app.post('/temperature', upload.single('temp-img'), (req, resp) => {
	// req.body.userName, 
	// req.body.q1, req.body.q2, 
	// req.body.temperature

	console.info('>>> req.body: ', req.body)
	console.info('>>> req.file: ', req.file)

	resp.on('finish', () => {
		// delete the temp file
		fs.unlink(req.file.path, () => { })
	})

	const doc = mkTemperature(req.body, req.file.filename)

	readFile(req.file.path)
		.then(buff => 
			putObject(req.file, buff, s3)
		)
		.then(() => 
			mongoClient.db(DATABASE).collection(COLLECTION)
				.insertOne(doc)
		)
		.then(results => {
			console.info('insert results: ', results)
			resp.status(200)
			resp.json({ id: results.ops[0]._id })
		})
		.catch(error => {
			console.error('insert error: ', error)
			resp.status(500)
			resp.json({ error })
		})

	//TODO insert doc into mongo
	/*
	resp.type('application/json')
	mongoClient.db(DATABASE).collection(COLLECTION)
		.insertOne(doc)
		.then(result => {
			console.info('insert result: ', result)
			resp.status(200)
			resp.json({})
		})
		.catch(error => {
			console.error('insert error: ', error)
			resp.status(500)
			resp.json({ error })
		})
	*/
})

const p0 = new Promise(
	(resolve, reject) => {
		if ((!!process.env.ACCESS_KEY) && (!!process.env.SECRET_ACCESS_KEY))
			resolve()
		else
			reject('S3 keys not found')
	}
)
const p1 = mongoClient.connect()

Promise.all([[p0, p1]])
	.then(() => {
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	})
	.catch(err => { console.error('Cannot connect: ', err) })
