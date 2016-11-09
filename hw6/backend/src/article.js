var nextId = 3;
var curr_article = {
          'articles' :
        [{id:0, author:'Scott', img: 'image', text:'A post', 
                comments: 
                [
                    {
                        id: 0,
                        author: "string",
                        text: "string"
                    }
                ]
          },
          {id:1, author:'Scott', img: 'image', text:'A post', 
                comments: 
                [
                    {
                        id: 0,
                        author: "string",
                        text: "string"
                    }
                ]
          },
          {id:2, author:'Scott', img: 'image', text:'A post', 
                comments: 
                [
                    {
                        id: 0,
                        author: "string",
                        text: "string"
                    }
                ]
          }
        ]
     }

const addArticle = (req, res) => {
     const result = {
     	'articles' :
        [{id:nextId, author:'Scott', img: 'image', text:req.body.text, comments:[]}]
     }
     curr_article = {
     	'articles' :
     	[
     		...curr_article.articles,
     		{id:nextId, author:'Scott', img: 'image', text:req.body.text, comments:[]}
     	]
     } 
     nextId++ 
     res.send(result)
}
const getArticle = (req, res) => {
	if (req.params.id == undefined) {
		res.send(JSON.stringify(curr_article))
	} else {
		
		res.send(JSON.stringify({'articles' : [curr_article.articles[req.params.id]]}))
	}
}
const putArticle = (req, res) => {
    var articleId = req.params.id
    var text = req.body.text
    var commentId = req.body.commentId
    if (commentId == undefined) {
        //id with a new text if commentId is not supplied
        curr_article.articles[articleId].text = text
    } else if (commentId == -1) {
        //If commentId is -1, then a new comment is posted with the text message.
        var nextCommentId = curr_article.articles[articleId].comments.length
        curr_article.articles[articleId].comments = [
            ...curr_article.articles[articleId].comments,
            {id: nextCommentId, author: 'default author', text: text}
        ]
    } else {
        curr_article.articles[articleId].comments[commentId].text = text
    }
    var result = {
        'articles':
        [
            curr_article.articles[articleId]
        ]
    }
    res.send(result)
}
module.exports = app => {
     app.get('/articles/:id?', getArticle)
     app.post('/article', addArticle)
     app.put('/articles/:id?', putArticle)
     curr_article
}