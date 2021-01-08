import {Scene, GameObjects } from 'phaser'
import { Subscription } from 'rxjs'
import {SCENE_MAIN, IMG_TILES} from '../constants'
import {GameService} from '../game.service'
import { AllPlayerLocationsMessage, MSG_TYPE_ALL_PLAYER_LOCATIONS, MSG_TYPE_PLAYER_JOINED, MSG_TYPE_PLAYER_LOCATION, PlayerJoinedMessage, PlayerLocationMessage } from '../messages'
import {Globals, ID_TO_IMG} from '../models'
import { ScreenMapper } from '../scene-mapper'

interface OtherPlayer {
  player: number
  sprite: GameObjects.Sprite
}

export class MainScene extends Scene {

	gameSvc: GameService
	me: GameObjects.Sprite
	currX = 5
	currY = 5
  screenMap: ScreenMapper
  game$: Subscription

  otherPlayer: OtherPlayer[] = []

	constructor() {
		super(SCENE_MAIN)
    this.gameSvc = Globals.injector.get(GameService)
    this.game$ = this.gameSvc.event.subscribe(
      (msg) => {
        switch (msg.type) {
          case MSG_TYPE_PLAYER_LOCATION:
            //const playerLocationMsg: PlayerLocationMessage = msg as PlayerLocationMessage
            var { player, x, y } = msg as PlayerLocationMessage
            if (this.gameSvc.player != player)
              return
            this.screenMap.placeObjectAt(x, y, this.me)
            this.currX = x
            this.currY = y
            break;

          case MSG_TYPE_ALL_PLAYER_LOCATIONS:
            const allPlayerLoc = msg as AllPlayerLocationsMessage
            for (let i = 0; i < allPlayerLoc.players.length; i++) {
              const m = allPlayerLoc.players[i]
              // if the player is us, update our position
              if (m.player == this.gameSvc.player) {
                this.screenMap.placeObjectAt(m.x, m.y, this.me)
                this.currX = m.x
                this.currY = m.y
                continue
              }
              // other player, create the object
              const newPlayer = this.add.sprite(m.x, m.y, IMG_TILES)
              newPlayer.setFrame(ID_TO_IMG[m.player])
              this.screenMap.placeObjectAt(m.x, m.y, newPlayer)
              this.otherPlayer.push({ player: m.player, sprite: newPlayer })
            }

          case MSG_TYPE_PLAYER_JOINED:
            var { player, x, y } = msg as PlayerJoinedMessage
            // if it is us, ignore it
            if (this.gameSvc.player == player)
              return

            const newPlayer = this.add.sprite(x, y, IMG_TILES)
            newPlayer.setFrame(ID_TO_IMG[player])
            this.screenMap.placeObjectAt(x, y, newPlayer)
            this.otherPlayer.push({ player, sprite: newPlayer })

          default:
        }
      }
    )
	}

	preload() {
		this.load.spritesheet(IMG_TILES, 'assets/64x64.png',
			{ frameWidth: 64, frameHeight: 64 })
	}

	create() {
		this.screenMap = new ScreenMapper({
			columns: 10, rows: 10, scene: this
    })

		this.me = this.add.sprite(0, 0, IMG_TILES)
		this.me.setFrame(ID_TO_IMG[this.gameSvc.player])
    this.screenMap.placeObjectAt(this.currX, this.currY, this.me)

    //this.gameSvc.getPlayerLocation()
    this.gameSvc.getAllPlayerLocations()

		this.screenMap.drawGrids()

		this.input.keyboard.on('keydown', (eventName, event) => {
			const key = eventName.key
			if ('ArrowUp' == key)
				this.currY = (this.currY - 1) < 0? 9: this.currY - 1

			else if ('ArrowDown' == key)
				this.currY = (this.currY + 1) % 10

			else if ('ArrowLeft' == key)
				this.currX = (this.currX - 1) < 0? 9: this.currX - 1

			else if ('ArrowRight' == key)
				this.currX = (this.currX + 1) % 10

			this.screenMap.placeObjectAt(this.currX, this.currY, this.me)

		})

	}

	update() {
	}
}
