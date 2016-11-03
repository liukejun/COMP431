const md5 = require('md5')
var curr_user = {
	'user' : []
}
var curr_headline = 'Grace Hopper'
var curr_email = 'grace_hopper@rice.edu'
var curr_zip = '77005'
var curr_avatar= 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg'
var nextId = 4;
var curr_article = {
		'articles' :
        [ {id:1, author:'Scott', text:'A post'},
          {id:2, author:'Scott', text:'A post'},
          {id:3, author:'Scott', text:'A post'}
        ]
	}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
}
const register = (req, res) => {
	console.log('Payload received', req.body)
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var salt = makeid()
	var hash = md5(password + salt)
	curr_user = {
		'user' :
		[
			...curr_user.user,
			{username: username, salt: salt, hash: hash}
		]
	}
	var msg = {username: username, result: 'register success'}
	console.log("username:"+curr_user.user[0].username+", salt:"+curr_user.user[0].salt+", hash:"+curr_user.user[0].hash)
	res.send(msg)
}
var cookieKey = 'sid'
function generateCode(user) {
	return 1
}
function findUser(user) {
	return curr_user.user.filter((e) => e.username == user)
}
const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	console.log(password)
	let salt, expected_hash, user
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	user = findUser(username)[0]
	if(!user || !user.username) {
		res.sendStatus(401)
		return
	}
	salt = user.salt
	expected_hash = user.hash
	var actual_hash = md5(password + salt)
	console.log(actual_hash)
	if (actual_hash != expected_hash) {
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey, generateCode(user),
		{maxAge: 3600*1000, httpOnly: true})
	var msg = {username: username, result: 'success'}
	res.send(msg)
}
const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const result = {
     	'articles' :
        [{id:nextId, author:'Scott', text:req.body.text}]
     }
     curr_article = {
     	'articles' :
     	[
     		...curr_article.articles,
     		{id:nextId, author:'Scott', text:req.body.text}
     	]
     } 
     nextId++; 
     res.send(result)
}
const getArticle = (req, res) => {
	console.log('get articles')
	if (req.params.id == undefined) {
		res.send(JSON.stringify(curr_article))
	} else {
		
		res.send(JSON.stringify({'articles' : [curr_article.articles[req.params.id-1]]}))
	}
	

}
const putHeadline = (req, res) => {
	res.send({ headlines: [ {
		username: 'sep1',
		headline: req.body.headline || 'you did not supply it'
	}]})
}

const putEmail = (req, res) => {
	res.send({ 
		username: 'sep1', 
		email: req.body.email || 'you did not supply it' 
	})
}

const putZipCode = (req, res) => {
	res.send({ 
		username: 'sep1', 
		email: req.body.zipcode || 'you did not supply it' 
	})
}
const putAvatar = (req, res) => {
	res.send({ 
		username: 'sep1', 
		avatar: req.body.avatar || 'you did not supply it' 
	})
}
const getHeadline = (req, res) => {
	var userid = req.params.user
	res.send({ headlines: [ {
		username: userid,
		headline: curr_headline
	}]})
}
const getEmail = (req, res) => {
	var userid = req.params.user
	res.send({ 
		username: userid, 
		email: curr_email
	})
}
const getZipCode = (req, res) => {
	var userid = req.params.user
	res.send({ 
		username: userid, 
		zipcode: curr_zip
	})
}
const getAvatar = (req, res) => {
	var userid = req.params.user
	res.send({ avatars: [ {
		username: userid,
		avatar: curr_avatar
	}]})
}
module.exports = app => {

    app.get('/', index)
    app.put('/headline', putHeadline)
    app.get('/headlines/:user?', getHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipCode)
    app.put('/zipcode', putZipCode)
    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', putAvatar)
	app.get('/articles/:id?', getArticle)
	app.post('/article', addArticle)
	app.post('/register', register)
	app.post('/login', login)
}
