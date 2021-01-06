import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CanLeaveRoute } from '../can-leave.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, CanLeaveRoute {

  form: FormGroup

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comments: this.fb.control('')
    })
  }

  postComment() {
    this.router.navigate([ '/' ])
    this.form.reset()
  }

  canILeave() {
    return (!this.form.dirty)
  }

}
