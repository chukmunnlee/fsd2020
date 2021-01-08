import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http'
import {Game} from 'phaser'
import {MainScene} from './scenes/main.scene';
import { BaseMessage, GetAllPlayerLocationsMessage, GetPlayerLocationMessage, MSG_TYPE_GET_ALL_PLAYER_LOCATIONS, MSG_TYPE_GET_PLAYER_LOCATION } from "./messages";
import { Subject } from "rxjs";

@Injectable()
export class GameService {

	created = false
	game: Game
  player = 0
  socket: WebSocket
  event = new Subject<BaseMessage>()

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
    this.socket.onmessage = (payload: MessageEvent) => {
      // BaseMessage - cause all message is derived from BaseMessage
      const msg = JSON.parse(payload.data) as BaseMessage
      console.info('Received: ', msg)
      this.event.next(msg)
    }
    this.socket.onclose = () => {
      // handle close
    }
  }

  getAllPlayerLocations() {
    const msg: GetAllPlayerLocationsMessage = {
      type: MSG_TYPE_GET_ALL_PLAYER_LOCATIONS,
      player: this.player
    }
    this.socket.send(JSON.stringify(msg))
  }

  getPlayerLocation() {
    // construct message
    const msg: GetPlayerLocationMessage = {
      type: MSG_TYPE_GET_PLAYER_LOCATION,
      player: this.player
    }
    this.socket.send(JSON.stringify(msg))
  }
}
