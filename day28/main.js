// Load express, mysql and mongo
const morgan = require('morgan')
const { MongoClient } = require('mongodb')
const mysql = require('mysql2/promise')
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

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create app
const app = express()

app.use(morgan('combined'))

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