const uploadImage = require('./uploadCloudinary').uploadImage
var User = require('../model.js').User
var Profile = require('../model.js').Profile
const putHeadline = (req, res) => {
	var newHeadline = req.body.headline
	var username = req.loggedInUser.username
	if (newHeadline != null && newHeadline != "") {
		Profile.update({username: username}, {headline: newHeadline }).exec(function(err, item) {
			if (err) {
				console.log("error change headline " + err)
			} else {
				console.log("change headline result ")
				//console.log(item)
				res.send({
					username: username,
					headline: newHeadline || 'you did not supply it'
				})
			}
		});
	}
	
}

const putEmail = (req, res) => {
	var newEmail = req.body.email
	var username = req.loggedInUser.username
	if (newEmail != null && newEmail != "") {
		Profile.update({username: username}, {email: newEmail }).exec(function(err, item) {
			if (err) {
				console.log("error change email " + err)
			} else {
				console.log("change email result ")
				//console.log(item)
				res.send({ 
					username: username, 
					email: newEmail || 'you did not supply it' 
				})
			}
		});
	}
}

const putZipCode = (req, res) => {
	var newZipcode = req.body.zipcode
	var username = req.loggedInUser.username
	if (newZipcode != null && newZipcode != "") {
		Profile.update({username: username}, {zipcode: newZipcode }).exec(function(err, item) {
			if (err) {
				console.log("error change zipcode " + err)
			} else {
				console.log("change zipcode result ")
				//console.log(item)
				res.send({ 
					username: username, 
					zipcode: newZipcode || 'you did not supply it' 
				})
			}
		});
	}
}
const putAvatar = (req, res) => {
	console.log('put avatar')
	var newAvatar = req.fileurl
	console.log('avatar url:' +newAvatar)
	var username = req.loggedInUser.username
	if (newAvatar != null && newAvatar != "") {
		Profile.update({username: username}, {avatar: newAvatar }).exec(function(err, item) {
			if (err) {
				console.log("error change avatar " + err)
			} else {
				console.log("change avatar result ")
				//console.log(item)
				res.send({ 
					username: username, 
					avatar: newAvatar || 'you did not supply it' 
				})
			}
		});
	}
}
const getHeadline = (req, res) => {
	let username
	if (req.params.user == null) {
		username = req.loggedInUser.username
	} else {
		username = req.params.user
	}
	console.log('profile loggedin user:', username)
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			console.log('profle find result:', items)
			var curr_headline = items[0].headline
			console.log("get headline from db "+curr_headline)
			res.send({ headlines: [ {
				username: username,
				headline: curr_headline
			}]})
		}
	})
	
}
const getEmail = (req, res) => {
	let username
	if (req.params.user == undefined) {
		username = req.loggedInUser.username
	} else {
		username = req.params.user
	}
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			//console.log(items)
			var curr_email = items[0].email
			console.log("get email from db "+curr_email)
			res.send({
				username: username,
				email: curr_email
			})
		}
	})
}
const getZipCode = (req, res) => {
	let username
	if (req.params.user == undefined) {
		username = req.loggedInUser.username
	} else {
		username = req.params.user
	}
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			//console.log(items)
			var curr_zipcode = items[0].zipcode
			console.log("get zipcode from db "+curr_zipcode)
			res.send({
				username: username,
				zipcode: curr_zipcode
			})
		}
	})
}
const getAvatar = (req, res) => {
	let username
	if (req.params.user == undefined) {
		username = req.loggedInUser.username
		console.log('get avatar:', username)
	} else {
		username = req.params.user
	}
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			//console.log(items)
			var curr_avatar = items[0].avatar
			console.log("get avatar from db "+curr_avatar)
			res.send({ avatars: [ {
				username: username,
				avatar: curr_avatar
			}]})
		}
	})
}
const getDOB = (req, res) => {
	let username
	if (req.params.user == undefined) {
		username = req.loggedInUser.username
	} else {
		username = req.params.user
	}
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			//console.log(items)
			var curr_dob = items[0].birthday
			console.log("get dob from db "+curr_dob)
			res.send({ 
				username: username, 
				dob: curr_dob
			})
		}
	})
}
const linkAccounts = (req, res) => {
	let username = req.loggedInUser.username
	let auth
	User.find({ username : username }).exec(function(err, items){
		if (err) {
			console.log("error" + err);
		} else {
			console.log('find user:', items)
			auth = items[0].auth
			if (auth == 'facebook') {
				console.log('backend link: current auth method->', auth)
				res.send({command: 'local'})
			} else if (auth == 'local') {
				console.log('backend link:current auth method->', auth)
				res.send({command: 'facebook'})
				//res.send({command: 'facebook'})
				//res.redirect('http://localhost:3001/loginFB')
			}
		}
	});
}
module.exports = app => {

    app.put('/headline', putHeadline)
    app.get('/headlines/:user?', getHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipCode)
    app.put('/zipcode', putZipCode)
    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', uploadImage('avatar'), putAvatar)
    app.get('/dob/:user?', getDOB)
    app.get('/link', linkAccounts)
}
