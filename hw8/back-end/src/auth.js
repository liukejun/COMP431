var User = require('../model.js').User
var Profile = require('../model.js').Profile
var redis = require('redis').createClient('redis://h:pab7k43p4p96aadpdatrs24crtp@ec2-54-243-251-214.compute-1.amazonaws.com:11869')
var request=require('request')
var qs=require('querystring')
var express=require('express')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var passport=require('passport')
var FacebookStrategy=require('passport-facebook').Strategy
const md5 = require('md5')
// var fetch = require('isomorphic-fetch')
// import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
require('isomorphic-fetch');

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
			console.log('find user:', items)
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
	findUser(username, function(err, items) {
		if (items != undefined) {
			console.log('duplicate register')
			var msg = {username: username, result: 'Duplicate '}
			res.send(msg)
		} else {
			console.log('valid register')
			new User({
				username: username,
				salt: salt,
				hash: hash,
				auth: 'local'
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
				var msg = {username: username, result: 'success '}
		     	res.send(msg)
			})
		}
	})
}
const login = (req, res) => {
	console.log("backend login function")
	localLogin(req, res)
}

const localLogin = (req, res) => {
	console.log('local login')
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
	if (req.isAuthenticated() && req.cookies[cookieKey]) {
		console.log('isLoggedIn: log in both account')
		let localUser, facebookUser
		const sid = req.cookies[cookieKey]
		redis.hgetall(sid, function(err, userObj) {
			if (userObj) {
				localUser = userObj.username
				next()
			} else {
				res.status(401).send('user session does not exist')
			}
		})
		facebookUser = req.user.displayName+'@facebook'
		Profile.find({username: facebookUser}).exec(function(err, item) {
			let followings = item[0].following
			console.log('add new friend')
			//update the following
			for (var i = 0; i < followings.length; i++) {
				var following = followings[i]
				Profile.findOneAndUpdate({username:localUser},{$push:{following:following}},
	             {new:true},
	             function(err,doc){
	                  if(err){
	                      res.status(404).send('Error')
	                  }else{
	                       console.log('update following ',doc.following)
	                  }
	             })
			}
			
		})
		User.remove({username: facebookUser}).exec(function(err, item) {
			if (err) {
				res.status(404).send('Error')
			} else {
				console.log('remove facebook user, now: ', item)
			}
		})
		Profile.remove({username: facebookUser}).exec(function(err, item) {
			if (err) {
				res.status(404).send('Error')
			} else {
				console.log('remove facebook profile, now: ', item)
			}
		})
		//delete facebook user and profile
		User.findOneAndUpdate({username: localUser}, { $set: {auth: 'facebook@'+facebookUser}})
		//update local user's auth field
		///////need to modify redirect function.if already exist or in local user's auth.do not create
	} else if (req.isAuthenticated()) {
		console.log('isLoggedIn: facebook', req.user.displayName)
		let userObj = {username: req.user.displayName+'@facebook'}
		req.loggedInUser = userObj
		console.log('isLoggedIn: facebook login-> ',req.loggedInUser.username)
		next()
	} else if (req.cookies[cookieKey]) {

		const sid = req.cookies[cookieKey]
		redis.hgetall(sid, function(err, userObj) {
			console.log(sid + "mapped to")
			//console.log(userOb j)
			if (userObj) {
				req.loggedInUser = userObj
				console.log('isLoggedIn: local', userObj.username)
				next()
			} else {
				res.status(401).send('user session does not exist')
			}
		})
	} else {
		res.redirect('/login')
	}
	
}
const logout = (req, res) => {
	console.log(req.loggedInUser.username + " log out")
	if (req.cookies[cookieKey]) {
		const sid = req.cookies[cookieKey]
		res.clearCookie(cookieKey)
		redis.del(sid)
		res.send('OK')
	} else {
		req.logout()
		res.send('OK')
	}
	
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
		}
	});
}

module.exports = app => {

	app.use(session({secret:'thisIsMySecretMessageHowWillYouGuessIt'}))
	app.use(passport.initialize());
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/loginFB', passport.authenticate('facebook',{scope:'email'}))
	app.use('/callback',passport.authenticate('facebook',{
		 	successRedirect:'/redirectToFrontend',failureRedirect:'/failFB', 
		 }))
	app.use('/redirectToFrontend', redirectToFrontend)
	app.use('/failFB',fail)
	app.post('/login', login)
	app.post('/register', register)
	app.use(isLoggedIn)
	app.put('/logout', logout)
	app.put('/password', isLoggedIn, changePwd)
	
}

var users=[]
passport.serializeUser(function(user, done) {
	console.log('serializeUser->user:', user)
	console.log('serializeUser->id:', user.id)
	users[user.id] = user
	console.log('serializeUser->now users:', users)
	done(null, user.id)
})
passport.deserializeUser(function(id, done) {
	console.log('deserializeUser->user:', users)
	console.log('deserializeUser->id:', id)
	var user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy({
    clientID: '604597853062006',
    clientSecret: '9b5528befdf87748f425e626c44934ba',
    callbackURL: 'https://reading-community.herokuapp.com/callback'
    // callbackURL: 'http://localhost:3001/callback'
  },
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
			return done(null,profile)
		})
	}))

function redirectToFrontend(req, res) {
	console.log('redirectToFrontend', req.user.displayName)
	// req.loginMethod = 'facebook'
	let username = req.user.displayName+'@facebook'
	findUser(username, function(err, item) {
		if (item == undefined) {
			User.find({auth: 'facebook@req.user.displayName'}).exec(function(err, item){
				if (item == undefined) {
					console.log('no such linked facebook user, so we create one')
					//save user info in db
					new User({
						username: username,
						salt: '',
						hash: '',
						auth: 'facebook'
					}).save(function() {
						
					})
					new Profile({
						username: username, 
						email: 'not provided@ricebook.com',
						phone: 1231231234,
						birthday: new Date(),
						zipcode: 77001,
						headline: 'default headline',
						avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg',
						following: []
					}).save(function(err, items) {
						if (err) {
							console.log('create profile for facebook user: error', err)
						} else {
							console.log('create profile for facebook user: success', items)
						}
					})
				} else {
					console.log('have such one:', item)
				}
			})
		} else {
			console.log('have standalone facebook user:', item)
		}
	})
	// req.logout()
	res.redirect('http://localhost:3000')
	// res.redirect('/')
	//resource('POST', 'login', {username: req.user.displayName, method: 'facebook'})
	
}

const fail=(req,res)=>{
	res.send('Something Wrong')
}