var User = require('../model.js').User
var Article = require('../model.js').Article
var Comment = require('../model.js').Comment
var Profile = require('../model.js').Profile
const uploadImage = require('./uploadCloudinary').uploadImage
var multer  = require('multer')
const uploadImageAndText = require('./uploadCloudinary').uploadImageAndText

const addArticle = (req, res) => {
    var username = req.loggedInUser.username
    Article.find().exec(function(err, items) { 
        console.log("There are " + items.length + " articles total in db")
        let nextId = items.length + 1
        new Article({
            _id : nextId,
            author: username,
            date: new Date().getTime(),
            img: req.fileurl,
            text: req.body.text,
            comments: []
        }).save(function() {
            Article.find().exec(function(err, items) { 
              res.send({articles:items})
            })
        })
    })
     
}
const getArticlesByAuthors = (usersToQuery, limit, callback) => {
    Article.find({ author: { $in: usersToQuery } }).sort( { date: -1 } )
    .limit(limit).exec(function(err, items) { 
          if (err) {
            console.log("error" + err);
            callback(err, null)
        } else {
            callback(null, items)
        }
    })
}
const getArticle = (req, res) => {
	console.log('get articles')
    if (req.params.id != undefined) {
        Article.find({_id : req.params.id}).exec(function(err, items) { 
          res.send({articles: items})
        })
    } else {
        var usersToQuery = []
        var username = req.loggedInUser.username
        usersToQuery.push(username)
        Profile.find({ username : username }).exec(function(err, items) {
            var curr_following = items[0].following
            usersToQuery.push(curr_following)
            getArticlesByAuthors(usersToQuery, 10, function(err, items) {
                res.send({articles: items})
            })
            
        })
    }
}
const putArticle = (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    var username = req.loggedInUser.username
    var articleId = req.params.id
    var text = req.body.text
    var commentId = req.body.commentId
    if (commentId == undefined) {
        //id with a new text if commentId is not supplied
        Article.update({ _id : articleId }, {text: text }).exec(function(err, item) {
            if (err) {
                console.log("error edit post " + err)
            } else {
                Article.find().exec(function(err, items) {
                    res.send({ articles: items })
                })  
            }
        });
        // curr_article.articles[articleId].text = text
    } else if (commentId == -1) {
        //If commentId is -1, then a new comment is posted with the text message.
        Comment.find().exec(function(err, items) {
            let nextCommentId = items.length + 1
            new Comment({
                commentId : nextCommentId,
                author: username,
                date: new Date().getTime(),
                text: text,
            }).save(function() {
                Comment.find({ commentId : nextCommentId }).exec(function(err, items) {
                    console.log('new comment ' + items)
                    let newComment = items[0]
                    Article.find({ _id : articleId }).exec(function(err, items) {
                        let comments = [
                            ...items[0].comments,
                            newComment
                        ]
                        console.log(comments)
                        Article.update({ _id : articleId }, { comments : comments}).exec(function(err, items) { 
                            Article.find({ _id : articleId }).exec(function(err, items) {
                                res.send({ articles: items })
                            })
                        })
                    })
                    
                })
            })
        })
    } else {
        Comment.update({ commentId : commentId }, { text: text }).exec(function(err, items) {
            Comment.find({ commentId : commentId }).exec(function(err, items) {
                let newComment = items[0]
                console.log('new comment: '+newComment)
                Article.find({ _id: articleId }).exec(function(err, items) {
                    let comments = items[0].comments.filter((e) => e.commentId != commentId)
                    console.log('filter result:'+comments)
                    comments = [
                        ...comments,
                        newComment
                    ]
                    Article.update({ _id: articleId }, {comments: comments}).exec(function(err, items) {
                        Article.find({ _id : articleId }).exec(function(err, items) {
                                res.send({ articles: items })
                        })
                    })
                }) 
            })
        })
    }
}
module.exports = app => {
     app.get('/articles/:id?', getArticle)
     app.post('/article', uploadImageAndText('article'), addArticle)
     app.put('/articles/:id?', putArticle)
}