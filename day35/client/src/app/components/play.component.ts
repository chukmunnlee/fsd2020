import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private gameSvc: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameSvc.player = parseInt(this.activatedRoute.snapshot.queryParams['charId'])
    this.gameSvc.registerPlayer()
	  this.gameSvc.createGame()
  }

}
