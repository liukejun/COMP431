var redis = require('redis').createClient('redis://h:pbmp2us6ffvofh6n23f6vei2vtv@ec2-54-221-228-237.compute-1.amazonaws.com:9729')

var request=require('request')
var qs=require('querystring')
var express=require('express')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var passport=require('passport')
var FacebookStrategy=require('passport-facebook').Strategy
const md5 = require('md5')
var curr_user = {
	'user' : []
}
var users = []
var cookieKey = 'sid'
var code = 1000000000
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
	var sid = generateCode(user)
	redis.hmset(sid, user)
	res.cookie(cookieKey, sid,
		{maxAge: 3600*1000, httpOnly: true})
	var msg = {username: username, result: 'success'}
	res.send(msg)
}
const logout = (req, res) => {
	res.send('OK')
}
//const clientSecret = process.env.FACEBOOK_SECRET
const config = { 
	clientSecret: '1451231531572354', 
	clientID: 'c20a819c20ca09984df1beef3aa6644f', 
	callbackURL: 'http:localhost:3001/callback' }

// function logout(req, res) {
// 	req.logout()
// 	res.redirect('/')
// }
function isLoggedIn(req, res, next) {
	console.log("isLoggedIn")
	console.log("cookie " + req.cookies)
	const sid = req.cookies[cookieKey]
	redis.hgetall(sid, function(err, userObj) {//??????
		console.log(sid + "mapped to" + userObj)
		if (userObj) {
			next()
		} else {
			res.status(401).send('user session does not exist')
		}
	})
}
function isLoggedInFacebook(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}
function profile(req, res) {
	res.send('ok now what?', req.user)
}
function fail(req, res) {
	res.send('fail')
}
function hello(req, res) {
	res.send('hello')
}
passport.serializeUser(function(user, done) {
	user[user.id] = user
	done(null, user.id)
})
passport.deserializeUser(function(id, done) {
	var user = user[id]
	done(null, user)
})
passport.use(new FacebookStrategy(config,
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
			return done(null,profile)
		})
	}))
module.exports = app => {
	app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', isLoggedIn, logout)
}
