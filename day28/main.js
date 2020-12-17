// Load express, mysql and mongo
const morgan = require('morgan')
const { MongoClient } = require('mongodb')
const mysql = require('mysql2/promise')
const { mkQuery, gameReviews } = require('./db_utils')
const express = require('express')

// configure the databases
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'fred',
    password: process.env.DB_PASSWORD || 'fred',
    database: process.env.DB_NAME || 'bgg',
    connectionLimit: 4,
    timezone: '+08:00'
})

const findGameById = mkQuery('select * from game where gid = ?', pool)

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const MONGO_DB = 'bgg'
const MONGO_COLLECTION = 'reviews'
const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create app
const app = express()

app.use(morgan('combined'))

app.get('/game/:gid', async (req, resp) => {
    const gid = parseInt(req.params['gid'])

    resp.type('application/json')

    try {
        const p0 = findGameById([ gid ])
        const p1 = gameReviews(gid, client.db(MONGO_DB).collection(MONGO_COLLECTION))

        const [ game, reviews ] = await Promise.all([ p0, p1 ])
        if (game.length <= 0) {
            resp.status(404)
            resp.json({ message: `Cannot find game ${gid}`})
            return
        }

        resp.status(200)
        resp.json({
            gid: game[0].gid,
            name: game[0].name,
            year: game[0].year,
            url: game[0].url,
            image: game[0].image,
            ...reviews[0]
        })

    } catch(e) {
        console.error('ERROR: ', e)
        resp.status(500)
        resp.json({ error: e })
    }
})

// start the server, 
// check the databases are up before starting the server

// IIFE
const p0 = (async () => {
    const conn = await pool.getConnection()
    await conn.ping()
    conn.release()
    return true
})()

const p1 = (async () => {
    await client.connect()
    return true
})()

Promise.all([ p0, p1 ])
    .then((r) => {
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`)
        })
    })
