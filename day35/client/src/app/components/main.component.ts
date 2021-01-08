import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CHARACTERS} from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	characters = CHARACTERS

  constructor(private router: Router) { }

  ngOnInit(): void { }

	selectCharacter(id) {
		this.router.navigate([ '/play' ], { queryParams: { charId: id } })
	}

}
