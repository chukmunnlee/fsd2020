const morgan = require('morgan')
const express = require('express')

// import the mongodb driver
const MongoClient = require('mongodb').MongoClient

// connection string
const MONGO_URL = 'mongodb://localhost:27017'
//const MONGO_USER = process.env.MONGO_USER 
//const MONGO_PASSWORD = process.env.MONGO_PASSWORD
//const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@paf-cluster.huwql.mongodb.net/?retryWrites=true&w=majority`

// create a client - pool
const mongoClient = new MongoClient(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
 )

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const app = express()

app.use(morgan('combined'))

// GET /countries - list of sorted countries
app.get('/countries', async (req, resp) => {

    try {
        const result = await mongoClient.db('winemag')
            .collection('wine')
            .distinct('country')

        resp.status(200)
        resp.type('application/json')
        resp.json(result)
    } catch(e) {
        resp.status(500)
        resp.type('application/json')
        resp.json({ error: e })
    }

})

// GET /country/:country
app.get('/country/:country', async (req, resp) => {
    const country = req.params['country']

    try {
        const result = await mongoClient.db('winemag')
            .collection('wine')
            .find({
                country: {
                    $regex: country,
                    $options: 'i'
                }
            })
            .sort({ province: 1 })
            .limit(50)
            .project({ title: 1, price: 1 })
            .toArray()

        resp.status(200)
        resp.type('application/json')
        resp.json(result)
    } catch(e) {
        resp.status(500)
        resp.type('application/json')
        resp.json({ error: e })
    }
})

app.use(express.static('/opt/tmp/frontend'))

mongoClient.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`)
        })
    })
    .catch(e => {
        console.error('Cannot connect to mongodb: ', e)
    })