import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppDatabase} from '../app.database';
import {NEWS_API} from '../models';

import { BaseComponent } from './base-component'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent implements OnInit {

	form: FormGroup

	constructor(router: Router, private fb: FormBuilder, private appDB: AppDatabase) { 
	  super(router)
	}

	ngOnInit(): void { 
		this.form = this.mkForm()
		this.appDB.getApiKey(NEWS_API)
			.then(secret => {
				this.form = this.mkForm(secret)
			})
	}

	async addKey() {
		await this.appDB.saveApiKey(NEWS_API, this.form.get('secret').value)
		this.navigateToCountryList()
	}

	async deleteKey() {
		await this.appDB.deleteApiKey(NEWS_API)
		this.navigateToCountryList()
	}

	private mkForm(secret = ''): FormGroup {
		return this.form = this.fb.group({
			secret: this.fb.control(secret, [ Validators.required, Validators.minLength(1) ])
		})
	}
}
