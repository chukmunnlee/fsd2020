// load the 4 libs
const express = require('express')
const handlebars = require('express-handlebars')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

// configure the PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000
const API_KEY = process.env.API_KEY || "";
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'

// create an instance of express
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// configure app
app.get('/', (req, resp) => {
    resp.status(200)
    resp.type('text/html')
    resp.render('index')
})

/*
https://api.giphy.com/v1/gifs/search
    ?api_key=API_KEY
    &q=noodles
    &limit=10
    &rating=g
    &lang=en
    &offset=0
*/

app.get('/search', 
    async (req, resp) => {
        const search = req.query['search-term']

        console.info('search-term: ', search)
        // construct the url with the query parameters
        const url = withQuery(GIPHY_URL, {
            api_key: API_KEY,
            q: search,
            limit: 10
        })

        const result = await fetch(url)
        const giphys = await result.json()

        //console.info('giphys: \n', giphys)

        //search Giphy, use await
        /*
        const imgs = []
        for (let d of giphys.data) {
            const title = d.title
            const url = d.images.fixed_height.url
            imgs.push({ title, url })
        }
        */

        const imgs = giphys.data
            .map( d => {
                    return { title: d.title, url: d.images.fixed_height.url }
                }
            )

        console.info(imgs)

        resp.status(200)
        resp.type('text/html')
        resp.render('giphy', {
            search, imgs,
            hasContent: imgs.length > 0
            //hasContent: !!imgs.length
        })
    }
)


if (API_KEY)
    app.listen(PORT, () => {
        console.info(`Application started on port ${PORT} at ${new Date()}`)
        console.info(`with key ${API_KEY}`)
    })
else
    console.error('API_KEY is not set')