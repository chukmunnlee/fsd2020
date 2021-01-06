import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatMessage, ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  text = 'Join'
  form: FormGroup

  messages: ChatMessage[] = []
  event$: Subscription

  constructor(private fb: FormBuilder, private chatSvc: ChatService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: this.fb.control(''),
      message: this.fb.control('')
    })
  }

  ngOnDestroy() {
    // check if we are connected before unsubscribing
    if (null != this.event$) {
      this.event$.unsubscribe()
      this.event$ = null
    }
  }

  sendMessage() {
    const message = this.form.get('message').value
    this.form.get('message').reset()
    console.info('>>> message: ', message)
    this.chatSvc.sendMessage(message)
  }

  toggleConnection() {
    if (this.text == 'Join') {
      this.text = 'Leave'
      const name = this.form.get('username').value
      this.chatSvc.join(name)
      // subscribe to incoming messages
      this.event$ = this.chatSvc.event.subscribe(
        (chat) => {
          this.messages.unshift(chat)
        }
      )
    } else {
      this.text = 'Join'
      this.chatSvc.leave()
      this.event$.unsubscribe()
      this.event$ = null
    }
  }
}
