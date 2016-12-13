import React, { Component, PropTypes } from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import Apps from './components/app.js'
import reducer from './reducer'
import { connect } from 'react-redux'
import {navigatePages, addName, addError, clearArticles, clearInfo, clearFriends, addSuccess} from './action.js'
import {resource, url, navToMain, navToLanding} from './components/auth/authActions.js'
import {initailVisit, getZipCode, getUserAvatar, getDOB, getEmail} from './components/auth/authActions.js'

const logger = createLogger()
export const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))
let _validateLoggedIn
function validateLoggedIn() {
	return (dispatch) => {
		resource('GET', 'headlines')
		  	.then((response) => {
		  		console.log('refresh get headline', response.headlines)
		  		dispatch(addError(''))
		        dispatch(addSuccess(''))
		        dispatch(clearInfo())
		        dispatch(clearFriends())
		        dispatch(clearArticles())
		      	var username = response.headlines[0].username
	            dispatch(addName(username))
	            dispatch(addError(''))
	            dispatch(initailVisit())
	            dispatch(getZipCode())
	            dispatch(getUserAvatar())
	            dispatch(getDOB())
	            dispatch(getEmail())
		  	})
		  	.catch((err) => {
		  		console.log('refresh cannot get headline')
		      	dispatch(navToLanding())
		  	})
	}
	
}

class Index extends React.Component{
    render() {
      
      const {validate} = this.props
      _validateLoggedIn = () => {
        validate()
      } 
      
      return (
		    <Apps />
      	)
  	}
}
Index.propTypes = {
    validate: PropTypes.func.isRequired
}
//get the information from redux store
const Indexs = connect(null, dispatch => ({
    validate: () => {
      dispatch(validateLoggedIn())
    }
}))(Index);
render(
	<Provider store={store}>
	    <Indexs />
	</Provider>,
	document.getElementById('app')
	)
_validateLoggedIn()
