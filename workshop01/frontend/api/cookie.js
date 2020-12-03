// setup libraries
const fortuneCookie = require('fortune-cookie')
const morgan = require('morgan')
const express = require('express')

const cookies = () => {
    const idx = Math.floor(Math.random() * fortuneCookie.length)
    return fortuneCookie[idx]
}

// Note: no PORT

module.exports = (req, resp) => {
  // create an instance of express
  const app = express()

  // use morgan to log all request. Use the combined format
  app.use(morgan('combined'))

  // resources
  // GET /api/cookie -> application/json { cookie: 'cookie text' }
  // GET /api/cookie?count=4 -> application/json [ { cookie: 'cookie text' }, ... ]
  app.get('/api/cookie', (req, resp) => {
      const count = parseInt(req.query['count']) || 1

      resp.status(200)
      resp.type('application/json')

      if (count == 1)
          resp.json({ cookie: cookies() })
      else {
          const c = []
          for (let i = 0; i < count; i++)
              c.push({ cookie: cookies() })
          resp.json(c)
      }
  })

  app.use((req, resp) => {
    resp.redirect('/')
  })

  // no listen, pass req, resp to express
  app(req, resp)
}
