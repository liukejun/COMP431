import { clearArticles, clearInfo, addError, addSuccess, postText, navigatePages, addFriends } from '../../action.js'
import { addArticles, addComments, deleteFriend, clearFriends } from '../../action.js'
import { resource, getAvatarInArticle, url, getFriends, getHeadline, getAvatar } from '../auth/authActions.js'
//update server's headline with default logged in user
export function updateHeadline(headline) {
    return (dispatch) => 
        resource('PUT', 'headline', { headline })
        .then((response) => {
            console.log(`New headline ${response.headline}`)
            dispatch({type: 'UPDATE_HEADLINE', text: response.headline})
        })
        .catch((err) => {
            console.log('There was an error when updating headline')
        })
    
}
// logout from server, navigate to landing page and clear all states in redux
export function logout() {
  return (dispatch) => 
      resource('PUT', 'logout')
      .then((response) => {
        dispatch(navigatePages('Landing_Page'))
        dispatch(addError(''))
        dispatch(addSuccess(''))
        dispatch(clearInfo())
        dispatch(clearFriends())
        dispatch(clearArticles())
      })
      .catch((err) => {
        console.log('There was an error when log out'+err)
      })
  
}
export const _resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
  }
  if (payload) options.body = payload

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        if (r.headers.get('Content-Type').indexOf('json') > 0) {
          return r.json()
        } else {
          return r.text()
        }
      } else {
        throw new Error(r.statusText)
      }
    })
}

export function postArticle(fd) {
  return (dispatch) => 
    _resource('POST', 'article', fd)
      .then((response) => {
        var item = response.articles[0]
        dispatch(addArticles(item._id, item.author, item.img, item.date, item.text, [], true, undefined))
        dispatch(getAvatarInArticle(item.author))
        for (var j = 0; j < item.comments.length; j++){
          var ic = item.comments[j]
          dispatch(addComments(item._id, ic.author, ic.commentId, ic.date, ic.text))
        }
      })
      .catch((err) => {
        console.log('There was an error when post article'+err)
      })
}
export function postTexts(txt) {
  return (dispatch) => 
    resource('POST', 'article', {text: txt})
      .then((response) => {
        var item = response.articles[0]
        dispatch(addArticles(item._id, item.author, item.img, item.date, item.text, [], true, undefined))
        dispatch(getAvatarInArticle(item.author))
        for (var j = 0; j < item.comments.length; j++){
          var ic = item.comments[j]
          dispatch(addComments(item._id, ic.author, ic.commentId, ic.date, ic.text))
        }
      })
      .catch((err) => {
        console.log('There was an error when post article'+err)
      })
}
export function addFriend(friendId, num) {
  return (dispatch) => 
    resource('PUT', `following/${friendId}`)
      .then((response) => {
        if (num == response.following.length) {
          dispatch(addError(`This user does not exist`))
        } else {
          dispatch(addFriends(friendId, undefined, undefined))
          dispatch(getHeadline(friendId))
          dispatch(getAvatar(friendId))
        }
      })
      .catch((err) => {
        dispatch(addError(`There was an error adding this friend`))
      })
}

export function deleteFriends(friendId) {
  return (dispatch) => 
    resource('DELETE', `following/${friendId}`)
      .then((response) => {
        console.log("delete friend")
        console.log(response)
        console.log(friendId)
      })
      .catch((err) => {
        dispatch(addError(`There was an error deleting this friend`))
      })
}