import { navigatePages, addArticles, addComments, addFriends, addFriendHeadline, addFriendAvatar } from '../../action.js'
import { addName, addHeadline, addAvatar, addZipcode, addDOB, addEmail, addError, addAvatarInArticle } from '../../action.js'
import { addSuccess } from '../../action.js'
import fetch from 'isomorphic-fetch'
// export const url = 'http://localhost:3001'
export const url = 'https://reading-community.herokuapp.com'
//fetch corresponding resource from server using fetch from isomorphic-fetch
export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

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
// window.onbeforeunload = (e) => {
//   resource('GET', 'headline')
//   .then((response) => {
//       var email = response.email
//       console.log('refresh event',email)
//       dispatch(navToMain())
//   })
//   .catch((err) => {
//       console.log('refresh event',err)
//       dispatch(navToLanding())
//   })
// };
export function facebookLogin() {
  return (dispatch) =>
    resource('GET', 'loginFB')
    .then((response) => {

    }).catch((err) => {
      dispatch(addError(`There was an error logging in with your facebook account`))
    })
}
//called when user click sign in at landing page
//decide whether the user is authorized 
//get needed information and navigate to main page if authorized
export function localLogin(username, password) {
    return (dispatch) => 
        resource('POST', 'login', { username, password })
        .then((response) => {
            console.log('frontend local login request')
            var username = response.username
            dispatch(addName(username))
            dispatch(addError(''))
            dispatch(initailVisit())
            dispatch(getZipCode())
            dispatch(getUserAvatar())
            dispatch(getDOB())
            dispatch(getEmail())
        }).catch((err) => {
            console.log('frontend local login request')
            dispatch(addError(`There was an error logging in as ${username}, wrong username or wrong password`))
            
        })
    
}
//get user headline from server and get all friends information
export function initailVisit() {
    return (dispatch) => {
        resource('GET', 'headlines')
        .then((response) => {
            var user = response.headlines[0]
            dispatch(addHeadline(user.headline))
            dispatch(getFriends())
            dispatch(getArticle())
        })
        .catch((err) => {
            console.log('There was an error get headline')
        })
    }
}
//get user avatar from server
export function getUserAvatar() {
  return (dispatch) => 
    resource('GET', 'avatars')
        .then((r) => {
          var ava = r.avatars[0].avatar
          dispatch(addAvatar(ava))
        })
        .catch((err) => {
          console.log('There was an error when getting ave')
        })
  
}
//get user zipcode from server, used for profile page
function getZipCode() {
  return (dispatch) => 
        resource('GET', 'zipcode')
        .then((response) => {
            var zipcode = response.zipcode
            dispatch(addZipcode(zipcode))
        })
        .catch((err) => {
           console.log(`There was an error get zipcode`)
        })
}
//get user birthday from server, used for profile page
export function getDOB() {
  return (dispatch) =>
        resource('GET', 'dob')
        .then((response) => {
            var dob = response.dob
            dob = formatDate(dob)
            dispatch(addDOB(dob))
        })
        .catch((err) => {
            console.log(`There was an error get dob`)
        })
}
//cart the string millionseconds date into YYYY-MM-DD format
export function formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day ].join('-');
}
//get user email from server, used for profile page
function getEmail() {
  return (dispatch) =>
        resource('GET', 'email')
        .then((response) => {
            var email = response.email 
            dispatch(addEmail(email))
        })
        .catch((err) => {
            console.log(`There was an error get email`)
        })
}
//get article, author's avatar and comments from server
function getArticle() {
    return (dispatch) => 
        resource('GET', 'articles')
        .then((response) => {
          console.log(response)
          console.log(response.articles)
          for (var i = 0; i < response.articles.length; i++) {
            var item = response.articles[i]

            dispatch(addArticles(item._id, item.author, item.img, item.date, item.text, [], true, undefined))
            dispatch(getAvatarInArticle(item.author))
            for (var j = 0; j < item.comments.length; j++){
              var ic = item.comments[j]
              dispatch(addComments(item._id, ic.author, ic.commentId, ic.date, ic.text))
            }
            
          }
            
        })
        .then((response) => {
          dispatch(navToMain())
        })
        .catch((err) => {
            console.log('There was an error when getting articles'+err)
        })
}
//get author avatar
function getAvatarInArticle(val) {
  return (dispatch) => {
    resource('GET', `avatars/${val}`)
        .then((r) => {
          var articleAva = r.avatars[0].avatar
          dispatch(addAvatarInArticle(val, articleAva))
        })
        .catch((err) => {
          console.log('There was an error when getting article ave'+err)
        })
  }
}
//get all friends information: username, headline, avatar
function getFriends() {
  return (dispatch) => {
    resource('GET', 'following')
    .then((response) => {
      var followings = response.following
      for (var i = 0; i < followings.length; i++) {
        var followingId  = followings[i];
        dispatch(addFriends(followingId, undefined, undefined))
        dispatch(getHeadline(followingId))
        dispatch(getAvatar(followingId))
      } 
    })
    .catch((err) => {
      console.log('There was an error when getting followings')
    })
  }
}
//get avatar
function getAvatar(val) {
  return (dispatch) => {
    resource('GET', `avatars/${val}`)
        .then((r) => {
          var followingAva = r.avatars[0].avatar
          dispatch(addFriendAvatar(val, followingAva))
        })
        .catch((err) => {
          console.log('There was an error when getting following ave'+err)
        })
  }
}
//get headline
function getHeadline(val) {
  return (dispatch) => {
    resource('GET', `headlines/${val}`)
        .then((r) => {
          var followingheadline = r.headlines[0].headline
          dispatch(addFriendHeadline(val, followingheadline))
        })
        .catch((err) => {
          console.log('There was an error when getting following headline')
        })
  }
}
//navigate the page to main page
export function navToMain() {
  return (dispatch) => {
    dispatch(navigatePages('Main_Page'))
  }
}
export function navToLanding() {
  return (dispatch) => {
    dispatch(navigatePages('Landing_Page'))
  }
}
// register new account to server and display feedback in gui
export function register(aname, password, email, phone, birth, zipcode) {
  return (dispatch) => {
    resource('POST', 'register', {username: aname, password: password, email: email, phone: phone, birthday: birth, zipcode: zipcode})
        .then((r) => {
          var result = r.result
          var name = r.username
          dispatch(addError(result+" registered as: "+name))
        })
        .catch((err) => {
          console.log('There was an error when register'+err)
        })
  }
}

export { getAvatarInArticle, getArticle, getFriends, getZipCode, getEmail, getHeadline, getAvatar }