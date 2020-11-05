const fetch = require('node-fetch')
const withQuery = require('with-query').default
const md5 = require('md5')

const PUBLIC = process.env.PUBLIC
const PRIVATE = process.env.PRIVATE

const BASE_URL = 'http://gateway.marvel.com/v1/public'
const marvelCharacter = process.argv[2]

let ts = (new Date()).getTime()
const preHash = `${ts}${PRIVATE}${PUBLIC}`
const hash = md5(preHash)

let url = withQuery(BASE_URL + '/characters', {
        ts, hash,
        apikey: PUBLIC,
        nameStartsWith: marvelCharacter
    })

// characters
fetch(url)
    .then(result => result.json())
    .then(result => {
        if (result.data.count <= 0)
            return Promise.reject('Not found')

        const charId = result.data.results[0].id
        let ts = (new Date()).getTime()
        const preHash = `${ts}${PRIVATE}${PUBLIC}`
        const hash = md5(preHash)

        let url = withQuery(BASE_URL + `/characters/${charId}`, {
            ts, hash,
            apikey: PUBLIC,
        })

        return fetch(url)
    })
    .then(result => result.json())
    .then(result => {
        if (result.data.count <= 0)
            return null;
        console.info('> final result: ', result.data.results[0])
    })
    .catch(e => {
        console.error('Error: ', e)
    })
