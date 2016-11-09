const md5 = require('md5')
var curr_user = {
	'user' : []
}
var cookieKey = 'sid'
var code = 0
function generateCode(user) {
	code++
	return code
}
function findUser(user) {
	return curr_user.user.filter((e) => e.username == user)
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const register = (req, res) => {
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
	res.send(msg)
}

const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password
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
	if (actual_hash != expected_hash) {
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey, generateCode(user),
		{maxAge: 3600*1000, httpOnly: true})
	var msg = {username: username, result: 'success'}
	res.send(msg)
}
const logout = (req, res) => {
	res.send('OK')
}
module.exports = app => {
	
	app.post('/register', register)
	app.post('/login', login)
}
