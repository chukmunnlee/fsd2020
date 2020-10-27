// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// configure the environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000 

// create an instance of express
const app = express()

// configure handlebars
app.engine('hbs', 
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

let timeCounter = 0

app.use(
    (req, resp, next) => {
        console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
        next()
    }
)

// prefix match
app.use('/time', 
    (_, __, next) => {
        timeCounter++
        next()
    }
)

const cart = [
    { name: 'apple', quantity: 10 },
    { name: 'orange', quantity: 4 }
]

app.get('/cart', 
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('cart',
            {
                empty: cart.length <= 0,
                count: cart.length,
                myCart: cart
            }
        )
    }
)

// GET /time/used
// literal match
app.get('/time/used', 
    (req, resp) => {
        resp.status(200)
        // set a custom header
        // Set the content type
        resp.type('text/html')
        // Set the payload
        //resp.send(`<h1>/time has been use ${timeCounter} times</h1>`)
        resp.render('timeCounter', { times: timeCounter })
    }
)

app.get('/time/hbs',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('time',
            {
                currentTime: new Date()
            }
        )
    }
)

// GET /time
app.get('/time',
    (req, resp) => {
        //console.info(`The request is ${req.originalUrl}`)
        // set the status
        resp.status(200)
        // set a custom header
        resp.set('X-My-Header', 'fred')
        // Set the content type
        resp.type('text/html')
        // Set the payload
        resp.send(`<h1>The current time is ${new Date()}</h1>`)
    }
)

// configure the application
app.use(
    express.static(__dirname + '/static')
)

app.use(
    (req, resp) => {
        resp.status(404)
        resp.type('text/html')
        resp.sendFile(__dirname + '/static/404.html')
        //resp.redirect('/404.html')
    }
)

// start the server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})