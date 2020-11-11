const express = require('express')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

const poller = require('./poller')

const PORT = 3000;

const queue = []

const app = express()

app.get('/', (req, resp) => {
	console.info('Queuing request...')
	queue.push(
		// Give it some work. Will be executed in the next second
		async () => {
			const result = await fetch('http://httpbin.org/get')
			const data = await result.json()
			resp.status(200).json(data)
		}
	)
})

app.listen(PORT, () => {
	console.info(`Starting application on ${PORT} at ${new Date()}`)
	poller(queue, 1300)
})
