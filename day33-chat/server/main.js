const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const expressWS = require('express-ws')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const ROOM = {}

const app = express()
const appWS = expressWS(app)

app.use(cors())
app.use(morgan('combined'))

app.ws('/chat', (ws, req) => {
	const name = req.query.name
	console.info(`New websocket connection: ${name}`)
	// add the web socket connection to the room
	ws.participantName = name
	ROOM[name] = ws

	// setup
	ws.on('message', (payload) => {
		console.info('>>> payload: ', payload)
		// construct the message and stringify it
		const chat = JSON.stringify({
			from: name,
			message: payload,
			timestamp: (new Date()).toString()
		})
		// broadcast to everyone in the ROOM
		for (let p in ROOM) 
			ROOM[p].send(chat)
	})

	ws.on('close', () => {
		console.info(`Closing websocket connection for ${name}`)
		// close our end of the connection
		ROOM[name].close()
		// remove ourself from the room
		delete ROOM[name]
	})
	
})


app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})
