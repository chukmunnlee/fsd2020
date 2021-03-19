//load the libs
const express = require('express')
const handlebars = require('express-handlebars')

const fortuneCookies = require('./fortune-cookie')

// create an instance of express
const app = express()

const PORT = parseInt(process.env.PORT) || 3000

// configure the application 
app.get('/', (req, resp) => {
    resp.status(200)
    // the key is the Accept
    resp.format(
        {
            'text/html': () => {
                resp.send(`<h3>${fortuneCookies()}</h3>`)
            },
            'text/plain': () => {
                resp.send(fortuneCookies())
            },
            'application/json': () => {
                const text = fortuneCookies()
                resp.json(
                    { 
                        cookieText: text,
                        generatedOn: (new Date()).toDateString()
                    }
                )
            },
            'default': () => {
                resp.status(406)
                resp.type('text/plain')
                resp.send(`Not supported: ${req.get("Accept")}`)
            }
        }
    )
})

// start server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})