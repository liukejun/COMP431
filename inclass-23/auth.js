var request=require('request')
var qs=require('querystring')
var express=require('express')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var passport=require('passport')
const bodyParser = require('body-parser')
var FacebookStrategy=require('passport-facebook').Strategy
const md5=require('md5')

module.exports = app=>{
	app.use(session({secret:'thisIsMySecretMessageHowWillYouGuessIt'}))
	app.use(passport.initialize());
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login', passport.authenticate('facebook',{scope:'email'}))
	app.use('/callback',passport.authenticate('facebook',{
		 	successRedirect:'/profile',failureRedirect:'/fail'
		 }))
	app.use('/profile',isLoggedIn,profile)
	app.use('/fail',fail)
	app.use('/logout',logout)
}

var users=[]
passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})
passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy({
    clientID: '1451231531572354',
    clientSecret: 'c20a819c20ca09984df1beef3aa6644f',
    callbackURL: 'http://localhost:8080/callback'
  },
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
			return done(null,profile)
		})
	}))

function logout(req, res) {
	req.logout()
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req, res) {
	res.send({'ok now what?': req.user})
}

const fail=(req,res)=>{
	res.send('Something Wrong')
}
