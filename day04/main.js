// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// configure the port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of the application
const app = express()

// setup handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// configure express to parse 
// POST application/x-www-form-urlencoded, application/json
// form data is in req.body
//app.use(express.urlencoded({ extended: true }))
//app.use(express.json())

// configure routes
app.post('/register',
    express.urlencoded({ extended: true}),
    express.json(),
    (req, resp, next) => {
        const name = req.body.name.toLowerCase().trim()
        if (name == 'fred')
            return next()

        resp.status(403)
        resp.type('text/html')
        resp.end('<h1>You shall not pass</h1>')
    },
    (req, resp) => {
        console.info('body: ', req.body)

        resp.status(201)
        resp.type('text/html')
        resp.render('thankyou', {
            name: req.body.name,
            available: req.body['available-date']
        })
    }
)

app.get('/time', 
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.end(`<h1>The current time is <code>${new Date()}</code></h1>`)
    }
)

app.use(express.static(__dirname + '/static'))

// start the server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})