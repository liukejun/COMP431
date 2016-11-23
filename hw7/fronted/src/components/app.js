require('react-bootstrap')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { connect } from 'react-redux'

import Landings from './auth/landing.js';
import Main from './main/main.js';
import Profile from './profile/profile.js';
import Reducer from '../reducer.js'
import thunk from 'redux-thunk'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(thunk))

class App extends React.Component {
	
   	render() {
   		var displayPage;
   		const { nextPage } = this.props
		if (nextPage == "Landing_Page") {
			displayPage = <Landings />;
		} else if (nextPage == "Main_Page"){
			displayPage = <Main />;
		} else if (nextPage == "Profile_Page"){
			displayPage = <Profile />;
		}
      	return (
	     	<div>
	    		{displayPage}
	     	</div>
      	)
   }
}

App.propTypes = {
	nextPage: PropTypes.string.isRequired
}
const mapStateToProps = (state) => {
	return {
		nextPage: state.navigatePages.nextPage
	}
}
const Apps = connect(
	mapStateToProps,
	null
)(App);

export default Apps;