// Install libraries
const express = require('express')
const cors = require('cors')

const cart = [
    { id: 'abc', item: 'apple', quantity: 10 },
    { id: 'def', item: 'orange', quantity: 10 },
    { id: 'ghi', item: 'pear', quantity: 10 },
    { id: 'jkl', item: 'grapes', quantity: 5 }
]

// configure the environment variable
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of express
const app = express()

// Add CORS header to the response
app.use(cors())

// create resources
// GET /cart
app.get('/cart', (req, resp) => {
    resp.status(200)
    resp.type('application/json')
    resp.json(cart)
})

// start the app
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})