import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeDatabase } from '../anime.database';
import { Genre, SearchOption } from '../models';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  searches: SearchOption[] = []

  constructor(private router: Router, private animeDB: AnimeDatabase) { }

  ngOnInit(): void {
    this.animeDB.getSearchOptions()
      .then(result => {
        this.searches = result.map(s => {
          // @ts-ignore
          s.genre = s.genre == 0? 'anime': 'manga'
          return s
        })
      })
  }

}
