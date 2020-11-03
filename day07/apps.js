// load express
const express = require('express')

// SQL
const SQL_GET_APP_CATEGORIES = 'select distinct(category) from apps';
const SQL_GET_APPS = 'select app_id, name from apps limit ? offset ?';
const SQL_GET_APP_BY_APPID = 'select * from apps where app_id = ?'

module.exports = function(p) {

    const router = express.Router()
    const pool = p

    router.get('/', async (req, resp) => {

        const conn = await pool.getConnection()

        try {
            const results = await conn.query(SQL_GET_APPS, [ 20, 0 ])

            resp.status(200)
            resp.type('text/html')
            resp.render('index', { apps: results[0] })

        } catch(e) {
            resp.status(500)
            resp.type('text/html')
            resp.send(JSON.stringify(e))
        } finally {
            conn.release()
        }

    })

    router.get('/app/:appId', async (req, resp) => {
        const appId = req.params['appId']

        const conn = await pool.getConnection()

        try {
            const results = await conn.query(SQL_GET_APP_BY_APPID, [ appId ])
            const recs = results[0]

            if (recs.length <= 0) {
                //404!
                resp.status(404)
                resp.type('text/html')
                resp.send(`Not found: ${appId}`)
                return
            }

            resp.status(200)
            resp.format({
                'text/html': () => {
                    resp.type('text/html')
                    resp.render('app', { app: recs[0] })
                },
                'application/json': () => {
                    resp.type('application/json')
                    resp.json(recs[0])
                },
                'default': () => {
                    resp.type('text/plain')
                    resp.send(JSON.stringify(recs[0]))
                }
            })

        } catch(e) {
            resp.status(500)
            resp.type('text/html')
            resp.send(JSON.stringify(e))
        } finally {
            conn.release()
        }
    })

    router.get('/category', async (req, resp) => {

        const conn = await pool.getConnection()

        try {
            const results = await conn.query(SQL_GET_APP_CATEGORIES)
            const cats = results[0].map(v => v.category)

            resp.status(200)
            resp.type('text/html')
            resp.render('index', { category: cats })

        } catch(e) {
            resp.status(500)
            resp.type('text/html')
            resp.send(JSON.stringify(e))
        } finally {
            conn.release()
        }
    })

    return (router)
}
