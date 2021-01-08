const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const expressWS = require('express-ws')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const players = [ ]

const processMessage = (payload) => {
	const msg = JSON.parse(payload)
	console.info('Recevied: ', msg)
	let resp;
	switch (msg.type) {
		case 'get-player-location':
			const charId = msg.player
			var player = players.find(p => p.charId == charId)
			// assume no error, construct the response message
			resp = {
				type: 'player-location',
				player: charId,
				x: player.x,
				y: player.y,
			}
			player.ws.send(JSON.stringify(resp))
			break;

        case 'get-all-player-locations':
			var player = players.find(p => p.charId == msg.player)
			resp = { type: 'all-player-locations' }
			resp.players = players.map(
				v => ({
					type: 'player-location',
					player: v.charId,
					x: v.x, y: v.y
				})
			)
			player.ws.send(JSON.stringify(resp))
			break;

		default:
			// ignore message type that we don't understand
	}
}

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

	// handle message
	ws.on('message', processMessage)

	// handle close
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

	// notify all connected players
	// construct player-joined message
	const msg = JSON.stringify({
		type: 'player-joined',
		player: charId,
		x, y
	})
	for (let i = 0; i < players.length; i++) {
		const p = players[i]
		p.ws.send(msg)
	}
})

app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})
