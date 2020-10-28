// comments
const express = require('express')
const handlebars = require('express-handlebars')

const roll_dice = () => Math.floor(Math.random() * 6) + 1
const alt_roll_dice = function() {
    return Math.floor(Math.random() * 6) + 1
}

const DICE_IMGS = [
    "",
    "dado-1.png", "roll2.png", "three_dots.png",
    "four.png", "Five-Image.png", "dice-showing-6.png"
]

const landingPage = (req, resp) => {
        //status 200
        resp.status(200)
        resp.type('text/html')
        resp.render('index')
}

// configure the environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of express
const app = express()

// Configure HBS
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// configure express
app.get(['/', '/index.html'], landingPage)

app.get('/roll',
    (req, resp) => {
        const d1 = DICE_IMGS[roll_dice()]
        const d2 = DICE_IMGS[roll_dice()]
        resp.status(200)
        resp.type('text/html')
        resp.render('roll', { d1, d2 })
    }
)

// load/mount the static resources directory
app.use(express.static(__dirname + '/dice_images'))
app.use(express.static(__dirname + '/static'))

app.use(landingPage)

// start express
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})