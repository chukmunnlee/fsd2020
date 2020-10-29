// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of the application
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// routes
app.get('/', (req, resp) => {
    const cart = []
    resp.status(200)
    resp.type('text/html')
    resp.render('index', { cartState: JSON.stringify(cart)})
})

app.post('/', 
    express.urlencoded({ extended: true }),
    (req, resp) => {
        console.info('body: ', req.body)
        const cart = JSON.parse(req.body.cartState)
        cart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        })
        resp.status(200)
        resp.type('text/html')
        resp.render('index', { 
            cart: cart,
            cartState: JSON.stringify(cart)
        })
    }
)

app.use(express.static(__dirname + '/static'))

// start the application
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})