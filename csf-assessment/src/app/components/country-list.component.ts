import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AppDatabase} from '../app.database';
import {Country, NEWS_API} from '../models';
import {NewsService} from '../news.service';
import {BaseComponent} from './base-component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent extends BaseComponent implements OnInit {

	private secret  = ''

	countries: Country[] = []

	constructor(router: Router, private appDB: AppDatabase, private newsSvc: NewsService) { 
		super(router)
	}

	ngOnInit(): void { 
		this.appDB.getApiKey(NEWS_API)
			.then(secret => {
				this.secret = secret
				if (!!secret) {
					return true
				}
				this.navigateToSettings()
				return false
			})
			.then(result => {
				if (!result)
					return
				return this.newsSvc.getCountryList()
			})
			.then(list => this.countries = list)
			.catch(err => {
				console.error('[ERROR] CountryListComponent: ', err)
			})
	}
}
