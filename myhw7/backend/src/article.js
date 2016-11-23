var User = require('../model.js').User
var Article = require('../model.js').Article
var Comment = require('../model.js').Comment
const uploadImage = require('./uploadCloudinary')

const addArticle = (req, res) => {
    var username = req.loggedInUser.username
     console.log('Payload received', req.body)
     Article.find().exec(function(err, items) { 
          console.log("There are " + items.length + " articles total in db")
          let nextId = items.length + 1
          new Article({
            _id : nextId,
            author: username,
            date: new Date().getTime(),
            img: null,
            text: req.body.text,
            comments: []
        }).save(function() {
            Article.find().exec(function(err, items) { 
              console.log("There are " + items.length + " articles total in db")
              console.log(items)
              res.send({articles:items})
            })
        })
    })
     
}
const getArticle = (req, res) => {
	console.log('get articles')
	if (req.params.id == undefined) {
        // get all articles
        console.log('get all articles')
        Article.find().exec(function(err, items) { 
          console.log("There are " + items.length + " articles total in db")
          console.log(items)
          res.send({articles: items})
        })
	} else {
		console.log('get one article')
        Article.find({_id : req.params.id}).exec(function(err, items) { 
          console.log("find one article " +items)
          res.send({articles: items})
        })
		//res.send(JSON.stringify({'articles' : [curr_article.articles[req.params.id]]}))
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
                console.log("edit post result ")
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
     app.post('/article', addArticle)
     app.put('/articles/:id?', putArticle)
}