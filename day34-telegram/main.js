const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

const PLACEHOLER = 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png'
const NEWSAPI_TOKEN = process.env.NEWSAPI_TOKEN

// fetch news function
const fetchNews = (country, ctx) => {
    const url = withQuery('https://newsapi.org/v2/top-headlines', 
        { country, apiKey: NEWSAPI_TOKEN, category: 'general' })

    return fetch(url)
        .then(result => result.json())
        .then(result => result.articles
                .splice(0, 3)
                .map(a => (
                    { 
                        title: a.title, 
                        description: a.description, 
                        url: a.url, 
                        image: (a.urlToImage != null) && a.urlToImage.startsWith('http')? a.urlToImage: PLACEHOLER
                    }
                )
        ))
        .then(result => 
            Promise.all(
                result.map(art => {
                    return ctx.replyWithPhoto(art.image, {
                        parse_mode: 'HTML',
                        caption: `<b>${art.title}</b> ${art.description} <a href="${art.url}">Link</a>` 
                    })
                })
            )
        )
}

// create a menu
const menu = new MenuTemplate(() => 'News for Around the World')
// add buttons to the menu
menu.interact('SG', 'sg', {
    do: ctx => ctx.answerCbQuery('SG').then(() => true),
})
menu.interact('JP', 'jp', {
    do: ctx => ctx.answerCbQuery('JP').then(() => true),
    joinLastRow: true
})
menu.interact('US', 'us', {
    do: ctx => ctx.answerCbQuery('US').then(() => true),
    joinLastRow: true
})

//middleware 
const menuMiddleware = new MenuMiddleware('/', menu)

// create a bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const HELLO_KITTY = 'https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/Paperchase_Hello_Kitty-2017081009312584.png'
// when a user starts a session with your bot
bot.start(ctx => 
    ctx.replyWithPhoto(HELLO_KITTY, { caption: 'Hello from Hello Kitty' })
)

bot.hears('hi', ctx => ctx.reply('Hi yourself!'))

bot.command('news', ctx => {
    const name = ctx.message.from.first_name
    const length = ctx.message.entities[0].length
    const country = ctx.message.text.substring(length).trim()

    // display menu if no country is selected
    if (country.length <= 0) 
        return menuMiddleware.replyToContext(ctx)

    return fetchNews(country, ctx)
})

bot.use((ctx, next) => {
    if (ctx.callbackQuery != null) {
        const country = ctx.callbackQuery.data.substring(1)
        return fetchNews(country, ctx)
    }
    next()
})

//start the bot
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })
console.info(`Starting bot at ${new Date()}`)
bot.launch()