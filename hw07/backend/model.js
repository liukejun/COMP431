// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var profileSchema = new mongoose.Schema({
	username: String, 
	email: String,
	phone: Number,
	birthday: Date,
	zipcode: Number,
	headline: String,
	avatar: String,
	following: [ String ]
})
var userSchema = new mongoose.Schema({
	username: String, 
	salt: String,
	hash: String,
})
var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})
var articleSchema = new mongoose.Schema({
	_id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})

exports.User = mongoose.model('user', userSchema)
exports.Article = mongoose.model('article', articleSchema)
exports.Comment = mongoose.model('comment', commentSchema)
exports.Profile = mongoose.model('profile', profileSchema)
