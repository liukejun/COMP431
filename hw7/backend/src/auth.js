var User = require('../model.js').User
var Profile = require('../model.js').Profile
var redis = require('redis').createClient('redis://h:p73e2jh5dulp9if1kl4g00neaft@ec2-23-23-247-182.compute-1.amazonaws.com:10839')
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
var cookieKey = 'sid'
function generateCode(user) {
	var code = Math.floor(100000000 + Math.random() * 900000000);
	return code
}
function findUser(name, callback) {
	console.log("find user function.")
	User.find({ username : name }).exec(function(err, items){
		//console.log("find items: "+items[0])
		if (err) {
			console.log("error" + err);
			callback(err, null)
		} else {
			callback(null, items[0])
		}
    	
	});
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
	//payload user information
	var username = req.body.username
	var email = req.body.email
	var phone = req.body.phone
	var birthday = req.body.birthday
	var zipcode = req.body.zipcode
	var password = req.body.password
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	//make sid and hash
	var salt = makeid()
	var hash = md5(password + salt)
	//save user info in db
	new User({
		username: username,
		salt: salt,
		hash: hash
	}).save(function() {
		
	})
	new Profile({
		username: username, 
		email: email,
		phone: phone,
		birthday: birthday,
		zipcode: zipcode,
		headline: 'default headline',
		avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg',
		following: []
	}).save(function() {
		var msg = {username: username, result: 'register success'}
		Profile.find().exec(function(err, items) { 
          console.log("There are " + items.length + " users total in db")
     	})
     	res.send(msg)
	})
	// curr_user = {
	// 	'user' :
	// 	[
	// 		...curr_user.user,
	// 		{username: username, salt: salt, hash: hash}
	// 	]
	// }
	//console.log("username:"+curr_user.user[0].username+", salt:"+curr_user.user[0].salt+", hash:"+curr_user.user[0].hash)
	
}

const login = (req, res) => {
	console.log("backend login function")
	var username = req.body.username
	var password = req.body.password
	let salt, expected_hash, user
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	findUser(username, function(err, user) {
		if (err) {
			console.log(err)
		} else {
			//console.log("return find obj: "+user)
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
			var sid = generateCode(user.username)
			var redisUser = { username : user.username, salt: user.salt, hash: user.hash }
			console.log(redisUser)
			redis.hmset(sid, redisUser)
			res.cookie(cookieKey, sid,
				{maxAge: 3600*1000, httpOnly: true})
			var msg = {username: user.username, result: 'success'}
			res.send(msg)
		}
	})
	
	
	
}
function isLoggedIn(req, res, next) {
	console.log("isLoggedIn")
	console.log(req.cookies)
	const sid = req.cookies[cookieKey]
	console.log(sid)
	redis.hgetall(sid, function(err, userObj) {
		console.log(sid + "mapped to")
		//console.log(userObj)
		if (userObj) {
			req.loggedInUser = userObj
			next()
		} else {
			res.status(401).send('user session does not exist')
		}
	})
}
const logout = (req, res) => {
	console.log(req.loggedInUser.username + " log out")
	res.send('OK')
}

const changePwd = (req, res) => {
	var newPassword = req.body.password
	var username = req.loggedInUser.username
	res.send({
		username: username,
		password: newPassword
	})
	var salt = makeid()
	var hash = md5(newPassword + salt)
	User.update({username: username}, {salt: salt, hash: hash}).exec(function(err, item) {
		if (err) {
			console.log("error change password " + err)
		} else {
			console.log("change password result ")
			//console.log(item)
		}
	});
}

module.exports = app => {
	app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
	app.use(isLoggedIn)
	app.put('/logout', logout)
	app.put('/password', isLoggedIn, changePwd)
	
}
