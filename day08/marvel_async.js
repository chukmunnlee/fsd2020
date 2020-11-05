const fetch = require('node-fetch')
const withQuery = require('with-query').default
const md5 = require('md5')

const PUBLIC = process.env.PUBLIC
const PRIVATE = process.env.PRIVATE

const BASE_URL = 'http://gateway.marvel.com/v1/public'
const marvelCharacter = process.argv[2]

const findChararcters = async (name) => {
    let ts = (new Date()).getTime()
    const preHash = `${ts}${PRIVATE}${PUBLIC}`
    const hash = md5(preHash)

    let url = withQuery(BASE_URL + '/characters', {
        ts, hash,
        apikey: PUBLIC,
        nameStartsWith: name
    })

    let result = await fetch(url)
    result = await result.json()

    if (result.data.count <= 0)
        return -1

    return parseInt(result.data.results[0].id)
}

const getCharacterDetails = async (charId) => {
    let ts = (new Date()).getTime()
    const preHash = `${ts}${PRIVATE}${PUBLIC}`
    const hash = md5(preHash)

    let url = withQuery(BASE_URL + `/characters/${charId}`, {
        ts, hash,
        apikey: PUBLIC,
    })

    let result = await fetch(url)
    result = await result.json()

    if (result.data.count <= 0)
        return null;

    return result.data.results[0]
}

const run = async () => {
    const charId = await findChararcters(marvelCharacter);
    const data = await getCharacterDetails(charId)
    if (data)
        return JSON.stringify(data)
    return "{}"
}

run()
    .then(result => {
        console.info(result)
    })