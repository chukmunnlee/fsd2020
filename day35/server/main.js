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

		case 'request-movement':		
			var player = players.find(p => p.charId == msg.player)
			const origX = player.x
			const origY = player.y
			let finalX = origX
			let finalY = origY
			switch (msg.direction.toLowerCase()) {
				case 'arrowup':
					finalY = (finalY - 1) < 0? 9: (finalY - 1)
					break;

				case 'arrowdown':
					finalY = (finalY + 1) % 10
					break;

				case 'arrowleft':
					finalX = (finalX - 1) < 0? 9: (finalX - 1)
					break;

				case 'arrowright':
					finalX = (finalX + 1) % 10
					break;
				
				default:
					return
			}

			// update the player's new location
			player.x = finalX
			player.y = finalY

			resp = JSON.stringify({
				type: 'player-moved',
				player: player.charId,
				from: { x: origX, y: origY },
				to: { x: finalX, y: finalY }
			})
			for (let i in players)
				players[i].ws.send(resp)

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
