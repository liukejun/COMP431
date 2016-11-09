var curr_headline = 'Grace Hopper'
var curr_email = 'grace_hopper@rice.edu'
var curr_zip = '77005'
var curr_avatar= 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg'
var curr_dob = '19940406'

const putHeadline = (req, res) => {
	var newHeadline = req.body.headline
	if (newHeadline != null && newHeadline != "") {
		curr_headline = newHeadline
	}
	res.send({
		username: 'loggedInUser',
		headline: newHeadline || 'you did not supply it'
	})
}

const putEmail = (req, res) => {
	var newEmail = req.body.email
	if (newEmail != null && newEmail != "") {
		curr_email = newEmail
	}
	res.send({ 
		username: 'loggedInUser', 
		email: newEmail || 'you did not supply it' 
	})
}

const putZipCode = (req, res) => {
	var newZipcode = req.body.zipcode
	if (newZipcode != null && newZipcode != "") {
		curr_zip = newZipcode
	}
	res.send({ 
		username: 'loggedInUser', 
		zipcode: newZipcode || 'you did not supply it' 
	})
}
const putAvatar = (req, res) => {
	var newAvatar = req.body.img
	if (newAvatar != null && newAvatar != "") {
		curr_avatar = newAvatar
	}
	res.send({ 
		username: 'loggedInUser', 
		avatar: newAvatar || 'you did not supply it' 
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
const getDOB = (req, res) => {
	var userid = req.params.user
	res.send({ 
		username: userid, 
		dob: curr_dob
	})
}
const changePwd = (req, res) => {
	var newPassword = req.body.password
	res.send({
		username: 'loggedInUser',
		password: newPassword
	})
}
module.exports = app => {

    app.put('/headline', putHeadline)
    app.get('/headlines/:user?', getHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipCode)
    app.put('/zipcode', putZipCode)
    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', putAvatar)
    app.get('/dob/:user?', getDOB)
    app.put('/password', changePwd)
}
