import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class WineService {
	constructor(private http: HttpClient) { }

	async getCountries() {
		return await this.http.get<string[]>('/countries').toPromise()
	}
}
