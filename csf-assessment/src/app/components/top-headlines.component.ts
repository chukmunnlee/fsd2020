import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppDatabase} from '../app.database';
import {Article, Country} from '../models';
import {NewsService} from '../news.service';

import { BaseComponent } from './base-component'

@Component({
  selector: 'app-top-headlines',
  templateUrl: './top-headlines.component.html',
  styleUrls: ['./top-headlines.component.css']
})
export class TopHeadlinesComponent extends BaseComponent implements OnInit {

	articles: Article[] = []
	country: Country;

	constructor(router: Router, private activatedRoute: ActivatedRoute,
			private appDB: AppDatabase, private newsSvc: NewsService) { 
		super(router) 
	}
	
	ngOnInit(): void { 
		const code = this.activatedRoute.snapshot.params['country']
		Promise
			.all([ this.appDB.getCountry(code), this.newsSvc.getNews(code) ])
			.then(results => {
				this.country = results[0]
				this.articles = results[1]
				console.info('articles: ', this.articles)
			})
	}

}
