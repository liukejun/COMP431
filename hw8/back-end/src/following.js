var User = require('../model.js').User
var Profile = require('../model.js').Profile
var curr_following = {username:'Defaults to loggedInUser', following: ['kl50', 'sep1']}

function removeById(user, box) {
	box = box.filter((e) => e != user)
}
const getFollowing = (req, res) => {
	var username = req.loggedInUser.username
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			var curr_following = items[0].following
			console.log("get following from db "+curr_following)
			res.send({ 
				username: username, 
				following: curr_following
			})
		}
	})
}

const putFollowing = (req, res) => {
	var username = req.loggedInUser.username
	var userid = req.params.user
	console.log('add user '+userid)
	// find the loggedin user
	Profile.find({ username : username }).exec(function(err, items) {
		if (err) {
			console.log("error " + err)
		} else {
			var curr_following = items[0].following
			// find the searched user
			Profile.find({username: userid}).exec(function(err, items) {
				if (err) {
					console.log(err)
				} else {
					if (items.length == 0) {
						// searched user does not exist, just return the original friend
						console.log('user does not exist')
						res.send({
								username: username,
								following: curr_following
						})
					} else {
						console.log('add new friend')
						Profile.findOneAndUpdate(
                         {
                              username:username
                         },
                         {
                              $push:{following:userid}
                         },
                         {new:true},
                         function(err,doc){
                              if(err){
                                  res.status(404).send('Error')
                              }else{
                                   var msg={username:username,following:doc.following}
                                   res.send(msg)
                              }
                         })
					}
				}
			})
		}
	})
}
const deleteFollowing = (req, res) => {
	var username = req.loggedInUser.username
	var userid = req.params.user
	Profile.find({username: username}).exec(function(err, items) {
		if (err) {
			console.log(err)
		} else {
			var curr_following = items[0].following
			var new_following = curr_following.filter((e) => e != userid)
			Profile.update({username: username}, {following: new_following}).exec(function(err, items) {
				if (err) {
					console.log(err)
				} else {
					res.send({ 
						username: username, 
						following: new_following 
					})
				}
			})
		}
	})
	// res.send({
	// 	username: 'Defaults to loggedInUser',
	// 	following: curr_following.following
	// })
}
module.exports = app => {
	app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following', getFollowing)
    
}