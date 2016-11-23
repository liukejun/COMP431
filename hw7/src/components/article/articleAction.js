import { resource, getArticle } from '../auth/authActions.js'
import { clearArticles, addComments, editArticle, clearComments } from '../../action.js'
export function putComments(articleId, newComment) {
    return (dispatch) => 
        resource('PUT', `articles/${articleId}`, { text: newComment, commentId: -1})
        .then((response) => {
            var article = response.articles[0]
            dispatch(clearComments(article._id))
            for (var j = 0; j < article.comments.length; j++){
                var ic = article.comments[j]
                dispatch(addComments(article._id, ic.author, ic.commentId, ic.date, ic.text))
              }
        }).catch((err) => {
            console.log(`There was an error add comments`+err)
            
        })
    
}

export function putArticle(articleId, editedArticle) {
    return (dispatch) =>
        resource('PUT', `articles/${articleId}`, { text: editedArticle })
        .then((resource) => {
            dispatch(editArticle(articleId, editedArticle))
        }).catch((err) => {
            console.log(`There was an error edit article`+err)
        })
}
function editComment(articleId, newComment, commentId) {
    return (dispatch) => 
        resource('PUT', `articles/${articleId}`, { text: newComment, commentId: commentId})
        .then((response) => {
            var article = response.articles[0]
            dispatch(clearComments(article._id))
            for (var j = 0; j < article.comments.length; j++){
                var ic = article.comments[j]
                dispatch(addComments(article._id, ic.author, ic.commentId, ic.date, ic.text))
              }
        }).catch((err) => {
            console.log(`There was an error add comments`+err)
            
        })
}
export { editComment }