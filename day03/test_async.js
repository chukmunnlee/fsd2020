
// load the fetch and with-query
const fetch = require('node-fetch')
const withQuery = require('with-query').default

const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'abc'

// construct the URL
const url = withQuery(
    ENDPOINT,
    {
        q: 'singapore',
        appid: API_KEY
    }
)

const getWeather = async (city, apiKey) => {
    const url = withQuery(
        ENDPOINT,
        {
            q: city,
            appid: apiKey
        }
    )

    // then(result => { })
    let result = await fetch(url)

    // then(result => { })
    try {
        const weather = await result.json()
    } catch(e) {
        console.error(`ERROR:`, e)
        return Promise.reject(e)
    }


    return Promise.resolve(weather)
    //return weather
}

// returns a promise
try {
    getWeather('singapore', API_KEY)
        .then(weather => {
            console.info('the weather: ', weather)
        })
} catch(e) {

}