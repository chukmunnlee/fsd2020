import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from "@angular/core";

import {AppDatabase} from './app.database';
import {Article, COUNTRIES, Country, NEWS_API} from './models';

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/alpha'
const NEWS_URL = 'https://newsapi.org/v2/top-headlines'
const ARTICLE_EXPIRY_DURATION = 1000 * 60 * 5
const NUM_ARTICLES = 30
const NEWS_CATEGORY = 'general'

@Injectable()
export class NewsService {

	constructor(private http: HttpClient, private appDB: AppDatabase) { }

	async getCountryList(): Promise<Country[]> {

		let list = await this.appDB.getCountries()

		if (list.length <= 0) {
			const params = (new HttpParams()).set('codes', COUNTRIES)
			// @ts-ignore
			const result: any[] = await this.http.get(COUNTRY_URL, { params }).toPromise()
			list = result.map(c => {
				return {
					code: c['alpha2Code'].toLowerCase(),
					name: c['name'],
					flag: c['flag']
				} as Country
			})
			list.sort((a: Country, b: Country) => a.name.localeCompare(b.name))
			await this.appDB.saveCountries(list)
		}

		return list;
	}

	async getNews(country: string): Promise<any> {
		let articles = await this.appDB.getArticles(country)

		// should refresh if there are no articles
		let shouldRefresh = articles.length <= 0

		if (articles.length > 0) {
			// find the first not saved article
			const a = articles.find(a => !a.saved)
			// check if it has exceeded expiry duration
			// Delete all not saved articles
			if ((Date.now() - a.timestamp) >= ARTICLE_EXPIRY_DURATION) {
				await this.appDB.deleteArticles(articles.filter(a => !a.saved))
				// we have just deleted a bunch of old articles, set shouldRefresh to true
				shouldRefresh = true
			}
		}

		if (shouldRefresh) {
			const secret = await this.appDB.getApiKey(NEWS_API)
			const params = (new HttpParams())
					.set('pageSize', `${NUM_ARTICLES}`)
					.set('country', `${country}`)
					.set('category', `${NEWS_CATEGORY}`)
			const headers = (new HttpHeaders()).set('X-Api-Key', secret)

			const result = await this.http.get(NEWS_URL, { params, headers }).toPromise()
			const saveSet = new Set()
			articles.forEach(a => {
				saveSet.add(a.publishedAt)
			})

			const timestamp = Date.now()
			const newArticles = (result['articles'] as any[])
					// Filter all articles that are in the saveSet
					.filter(a => !saveSet.has(a['publishedAt']))
					.map(a => {
						return {
							publishedAt:a['publishedAt'],
							code: country,
							saved: false,
							source: a['source']['name'],
							author: a['author'],
							description: a['description'],
							url: a['url'],
							urlToImage: a['urlToImage']? a['urlToImage']: 'assets/placeholder.jpg',
							content: a['content'],
							timestamp
						} as Article
					})
			// save all new articles
			await this.appDB.saveArticles(newArticles)
			// combine the saved articles and the new articles
			articles = [ ...articles, ...newArticles ]
		}

		return articles
	}
}
