import {Scene, GameObjects } from 'phaser'
import {SCENE_MAIN, IMG_TILES} from '../constants'
import {GameService} from '../game.service'
import {Globals, ID_TO_IMG} from '../models'
import { ScreenMapper } from '../scene-mapper'

export class MainScene extends Scene {

	gameSvc: GameService
	me: GameObjects.Sprite
	currX = 5
	currY = 5
	screenMap: ScreenMapper

	constructor() {
		super(SCENE_MAIN)
		this.gameSvc = Globals.injector.get(GameService)
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
