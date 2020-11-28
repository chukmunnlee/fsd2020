import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/road-trip.json'
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

  gotoList() {
    this.router.navigate([ '/search-list' ])
  }

}
