import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http'
import {Game} from 'phaser'
import {MainScene} from './scenes/main.scene';

@Injectable()
export class GameService {

	created = false
	game: Game
  player = 0
  socket: WebSocket

	constructor(private http: HttpClient) {}

	createGame() {
		if (this.created)
			return

		this.game = new Game({
			width: 64 * 10, height: 64 * 10,
			parent: 'game',
			type: Phaser.AUTO,
			scene: [ MainScene ]
		})
	}

	registerPlayer() {
    this.socket = new WebSocket(`ws://localhost:3000/play/${this.player}`)
	}
}
