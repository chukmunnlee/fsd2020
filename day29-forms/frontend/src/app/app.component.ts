import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	form: FormGroup

	constructor(private fb: FormBuilder, private http: HttpClient) { }

	ngOnInit() {
		this.form = this.fb.group({
			title: this.fb.control(''),
			isbn: this.fb.control(''),
		})
	}

	process() {
		console.info('form = ', this.form.value)
		const value = this.form.value

		// fill in the form
		let params = new HttpParams()
		params = params.set('title', value['title'])
		params = params.set('isbn', value['isbn'])

		// set the HTTP header
		let headers = new HttpHeaders()
		headers = headers.set('Content-Type', 
			'application/x-www-form-urlencoded')

		// make the POST request
		this.http.post<any>('http://localhost:3000/book',
				params.toString(), { headers })
			.toPromise()
			.then(resp => {
				console.info('Response: ', resp)
			})
			.catch(err => {
				console.error('ERROR: ', err)
			})
			
	}
}
