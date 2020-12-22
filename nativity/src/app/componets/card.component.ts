import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private gameSvc: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameSvc.message = this.activatedRoute.snapshot.queryParams['message']
    this.gameSvc.createGame()
  }

}
