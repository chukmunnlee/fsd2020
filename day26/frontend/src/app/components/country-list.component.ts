import { Component, OnInit } from '@angular/core';
import {WineService} from '../wine.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

	countries: string[] = []

	constructor(private wineSvc: WineService) { }

	ngOnInit(): void {
		this.wineSvc.getCountries()
			.then(result => this.countries = result)
			.catch(e => console.error('error: ', e))
	}

}
