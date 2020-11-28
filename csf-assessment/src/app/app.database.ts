import {Injectable} from "@angular/core";
import Dexie from 'dexie';
import {ApiKeys, Article, Country} from './models';

@Injectable()
export class AppDatabase extends Dexie {

	private apiKeys: Dexie.Table<ApiKeys, string>;
	private countries: Dexie.Table<Country, string>;
	private articles: Dexie.Table<Article, string>;

	constructor() {
		super('app-database')
		this.version(1).stores({
			apiKeys: 'id',
			countries: 'code',
			articles: 'publishedAt,code'
		})

		this.apiKeys = this.table('apiKeys')
		this.countries = this.table('countries')
		this.articles = this.table('articles')
	}

	getApiKey(id: string): Promise<string> {
		return this.apiKeys.get(id).then(r => {
			if (!!r)
				return r.secret
			return ''
		})
	}
	saveApiKey(id: string, secret: string): Promise<string> {
		return this.apiKeys.put({ id, secret })
	}
	deleteApiKey(id: string): Promise<void> {
		return this.apiKeys.delete(id)
	}

	getCountries(): Promise<Country[]> {
		return this.countries.toArray()
	}
	saveCountries(list: Country[]): Promise<any> {
		return this.countries.bulkPut(list)
	}
	getCountry(code: string): Promise<Country> {
		return this.countries.where('code').equalsIgnoreCase(code)
				.toArray()
				.then(result => {
					if (result.length > 0)
						return result[0]
					return null
				})
	}

	getArticles(country: string): Promise<Article[]> {
		return this.articles.where('code').equalsIgnoreCase(country).toArray()
	}

	saveArticles(articles: Article[]): Promise<any> {
		return this.articles.bulkPut(articles)
	}

	deleteArticles(articles: Article[]): Promise<any> {
		return this.articles.bulkDelete(articles.map(a => a.publishedAt))
	}
}
