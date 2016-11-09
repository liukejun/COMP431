const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
require('./src/auth')(app)
require('./src/article')(app)
require('./src/profile')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3001
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
