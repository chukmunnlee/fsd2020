import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http'
import { Subject } from "rxjs";

export interface ChatMessage {
  from: string
  message: string
  timestamp: string
}

@Injectable()
export class ChatService {

  private sock: WebSocket = null
  event = new Subject<ChatMessage>()

  sendMessage(msg) {
    this.sock.send(msg)
  }

  join(name: string) {
    const params = new HttpParams().set('name', name)
    const url = `ws://localhost:3000/chat?${params.toString()}`
    console.info('ws url: ', url)
    this.sock = new WebSocket(url)
    // handle accental socket error
    // handle incoming message
    this.sock.onmessage = (payload: MessageEvent) => {
      // parse the string to ChatMessage
      const chat = JSON.parse(payload.data) as ChatMessage
      this.event.next(chat)
    }

    this.sock.onclose = () => {
      if (this.sock != null) {
        this.sock.close()
        this.sock = null
      }
    }
  }

  leave() {
    if (this.sock != null) {
      this.sock.close()
      this.sock = null
    }
  }
}
