const fetch = require('node-fetch')
const withQuery = require('with-query').default

const API_KEY = process.env.API_KEY
const URL = 'https://newsapi.org/v2/top-headlines'

const withQuery = 

const url = withQuery(URL, {
	country: 'us',
	//apiKey: API_KEY,
	category: 'sports'
})

const headers = {
	'X-Api-Key': API_KEY
}

fetch(url, { headers })
	.then(result => result.json())
	.then(result => {
		console.info('>> reesult: ', result)
	})
	.catch(err => {
		console.error('err: ', err)
	})
