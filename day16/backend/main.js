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
app.use(express.json())

// create resources
// GET /cart
app.get('/cart', (req, resp) => {
    resp.status(200)
    resp.type('application/json')
    resp.json(cart)
})

// GET /cart/:id
app.get('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const item = cart.find(i => i.id == id)

    resp.type('application/json')
    if (undefined == item) {
        resp.status(404)
        resp.json({})
        return
    }

    resp.status(200)
    resp.json(item)
})

// PUT /cart/:id
app.put('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const payload = req.body

    console.info('>>> payload: ', payload)
    const idx = cart.findIndex(i => i.id == payload.id)
    if (idx < 0)
        cart.push(payload)
    else
        cart[idx] = payload

    resp.status(200)
    resp.type('application/json')
    resp.json({})
})

// start the app
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})