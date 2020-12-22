import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private router: Router,
      private gameSvc: GameService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: this.fb.control('', [ Validators.required ])
    })
  }

  makeGreetings() {
    const message = this.form.get('message').value
    this.router.navigate([ '/card' ], {
      queryParams: { message }
    })
  }

}
