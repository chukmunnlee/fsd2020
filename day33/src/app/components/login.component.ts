import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	form: FormGroup

  constructor(private fb: FormBuilder, private router: Router,
    private authSvc: AuthService) { }

  ngOnInit(): void {
	  this.form = this.fb.group({
		  username: this.fb.control('', [ Validators.required ]),
		  password: this.fb.control('', [ Validators.required ]),
	  })
  }

	performLogin() {
    console.info('> values: ', this.form.value)
    this.authSvc.login(this.form.get('username').value, this.form.get('password').value)
      .then(result => {
        console.info('>>> result: ', result)
        this.router.navigate([ '/main' ])
      })
	}

}
