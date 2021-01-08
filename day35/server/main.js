const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const expressWS = require('express-ws')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const players = [ ]

const app = express()
const appWS = expressWS(app)

app.use(morgan('combined'))
app.use(cors())

app.ws('/play/:charId', (ws, req) => {

	const charId = parseInt(req.params.charId)
	const x = Math.floor(Math.random() * 10)
	const y = Math.floor(Math.random() * 10)

	console.info('Player joining: ', charId)

	players.push({ charId, x, y, ws })

	ws.on('close', () => {
		console.info('Player leaving: ', charId)
		// find the player
		const playerIdx = players.findIndex(p => p.charId == charId)
		// get the player object
		const player = players[playerIdx]
		// remove player from list
		players.splice(playerIdx, 1)
		// close the connection
		player.ws.close()
	})

})

app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})
