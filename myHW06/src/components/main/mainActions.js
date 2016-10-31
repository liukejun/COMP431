import { clearArticles, clearFriends, clearInfo, addError, addSuccess, postText, navigatePages } from '../../action.js'
import { resource } from '../auth/authActions.js'
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
  return (dispatch) => {
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
        console.log('There was an error when log out')
      })
  }
}
