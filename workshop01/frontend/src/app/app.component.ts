import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      cookieCount: this.fb.control(1)
    })
  }

  getCookie() {
    const cookieCount = parseInt(this.form.value['cookieCount'])
    console.info('cookieCount: ', cookieCount)
  }
}
