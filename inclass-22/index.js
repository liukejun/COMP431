const express = require('express')
const bodyParser = require('body-parser')

const middlewareCORS = (req, res, next) => {
	const origin = req.headers.origin
	res.set('Access-Control-Allow-Credentials', true)
	res.set('Access-Control-Allow-Origin', origin)
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.set('Access-Control-Allow-Headers', 'Authorization, Content-type')
	next()
}

const app = express()
app.use(bodyParser.json())
app.use(middlewareCORS)
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
