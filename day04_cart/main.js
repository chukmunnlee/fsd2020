// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

const { getCart, postCart } = require('./my_middleware')
//const myMiddleware = require('./my_middleware')

// port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of the application
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// routes
app.get('/', getCart)
app.post('/', 
    express.urlencoded({ extended: true }),
    postCart
)

app.use(express.static(__dirname + '/static'))

// start the application
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})