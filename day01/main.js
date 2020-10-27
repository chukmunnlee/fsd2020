// Load required libraries from node_modules
const express = require('express')

// configure the environment
// from cli, from env variable, default
const PORT = parseInt(process.argv[2]) || 3000

// Create an instance of the express application
const app = express()

// configure express
// Serve HTMLs from the public directory
app.use(
    express.static(__dirname + '/public')
)

// start express
app.listen(
    PORT,  //port number
    function() { // callback, execute after express has started
        console.info(`Application started on port ${PORT} at ${new Date()}`)
    }
)
