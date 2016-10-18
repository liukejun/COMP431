
const express = require('express')
const bodyParser = require('body-parser')

var nextId = 4;
var curr_article = {
		'articles' :
        [ {id:1, author:'Scott', body:'A post'},
          {id:2, author:'Scott', body:'A post'},
          {id:3, author:'Scott', body:'A post'}
        ]
	}
const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const result = {
     	'articles' :
        [{id:nextId, author:'Scott', body:req.body.body}]
     }
     curr_article = {
     	'articles' :
     	[
     		...curr_article.articles,
     		{id:nextId, author:'Scott', body:req.body.body}
     	]
     } 
     nextId++; 
     res.send(result)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle = (req, res) => {
	console.log('get articles')
	res.send(curr_article)

}
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
