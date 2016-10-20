var curr_headline = 'Grace Hopper'
var curr_email = 'grace_hopper@rice.edu'
var curr_zip = '77005'
var curr_avatar= 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg'
const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
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

    app.get('/:user?', index)
    app.put('/headline', putHeadline)
    app.get('/headlines/:user?', getHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipCode)
    app.put('/zipcode', putZipCode)
    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', putAvatar)
}
