import { resource, getEmail, getZipCode } from '../auth/authActions.js'
import { addAvatar } from '../../action.js'
import { _resource } from '../main/mainActions.js'

function updateEmail(email) {
	return (dispatch) => 
        resource('PUT', 'email', { email: email })
        .then((response) => {
            console.log(`New email ${response.email}`)
            dispatch(getEmail())
        })
        .catch((err) => {
            console.log('There was an error when updating email')
        })
}

function updateZipCode(zipcode) {
	return (dispatch) => 
        resource('PUT', 'zipcode', { zipcode: zipcode })
        .then((response) => {
            console.log(`New zipcode ${response.zipcode}`)
            dispatch(getZipCode())
        })
        .catch((err) => {
            console.log('There was an error when updating zipcode')
        })
}

function updatePwd(pwd) {
	return (dispatch) => 
        resource('PUT', 'password', { password: pwd })
        .then((response) => {
            console.log(`New password ${response.password}`)
        })
        .catch((err) => {
            console.log('There was an error when updating password')
        })
}
function changeAvatars(fd) {
  return (dispatch) => 
    _resource('PUT', 'avatar', fd)
      .then((response) => {
        var ava = response.avatar
        dispatch(addAvatar(ava))
      })
      .catch((err) => {
        console.log('There was an error when change avatar'+err)
      })
}
export { updateEmail, updateZipCode, updatePwd, changeAvatars }