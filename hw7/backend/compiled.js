'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nextId = 3;
var curr_article = exports.curr_article = {
    'articles': [{ id: 0, author: 'Scott', img: 'image', text: 'A post',
        comments: [{
            id: 0,
            author: "string",
            text: "string"
        }]
    }, { id: 1, author: 'Scott', img: 'image', text: 'A post',
        comments: [{
            id: 0,
            author: "string",
            text: "string"
        }]
    }, { id: 2, author: 'Scott', img: 'image', text: 'A post',
        comments: [{
            id: 0,
            author: "string",
            text: "string"
        }]
    }]
};

var addArticle = function addArticle(req, res) {
    console.log('Payload received', req.body);
    var result = {
        'articles': [{ id: nextId, author: 'Scott', img: 'image', text: req.body.text, comments: [] }]
    };
    exports.curr_article = curr_article = {
        'articles': [].concat(_toConsumableArray(curr_article.articles), [{ id: nextId, author: 'Scott', img: 'image', text: req.body.text, comments: [] }])
    };
    nextId++;
    res.send(result);
};
var getArticle = function getArticle(req, res) {
    console.log('get articles');
    if (req.params.id == undefined) {
        res.send(JSON.stringify(curr_article));
    } else {

        res.send(JSON.stringify({ 'articles': [curr_article.articles[req.params.id]] }));
    }
};
var putArticle = function putArticle(req, res) {
    var articleId = req.params.id;
    var text = req.body.text;
    var commentId = req.body.commentId;
    if (commentId == undefined) {
        //id with a new text if commentId is not supplied
        curr_article.articles[articleId].text = text;
    } else if (commentId == -1) {
        //If commentId is -1, then a new comment is posted with the text message.
        var nextCommentId = curr_article.articles[articleId].comments.length;
        curr_article.articles[articleId].comments = [].concat(_toConsumableArray(curr_article.articles[articleId].comments), [{ id: nextCommentId, author: 'default author', text: text }]);
    } else {
        curr_article.articles[articleId].comments[commentId].text = text;
    }
    var result = {
        'articles': [curr_article.articles[articleId]]
    };
    res.send(result);
};
module.exports = function (app) {
    app.get('/articles/:id?', getArticle);
    app.post('/article', addArticle);
    app.put('/articles/:id?', putArticle);
};
