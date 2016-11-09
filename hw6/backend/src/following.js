var curr_following = {username:'Defaults to loggedInUser', following: ['kl50', 'sep1']}

function removeById(user) {
	curr_following.following = curr_following.following.filter((e) => e != user)
}
const getFollowing = (req, res) => {
	var userid = req.params.user
	res.send({ 
		username: userid, 
		following: curr_following.following
	})
}

const putFollowing = (req, res) => {
	var userid = req.params.user
	if (!curr_following.following.includes(userid)) {
		curr_following.following = [
			...curr_following.following,
			userid
		]
	}
	res.send({ 
	username: 'Defaults to loggedInUser', 
	following: curr_following.following
	})
}
const deleteFollowing = (req, res) => {
	var userid = req.params.user
	removeById(userid)
	res.send({
		username: 'Defaults to loggedInUser',
		following: curr_following.following
	})
}
module.exports = app => {
	app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?', getFollowing)
    
}