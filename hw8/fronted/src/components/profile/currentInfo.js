require('./profile.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import {linkAccounts} from './profileAction.js'
import {localLogin } from '../auth/authActions.js'
import {addError, addSuccess, clearInfo, clearFriends, clearArticles} from '../../action.js'
//renders user's current information 
class CurrentInfo extends React.Component {
	render() {
		const { username, email, zipcode, dob, link, show, login } = this.props
		let name, pwd
		const _link = () => {
			link()
		}
		const _login = () => {
			login(name.value, pwd.value)
		}
		return (

			<div>
				<p className="BoldFont text-center">Current Information</p>

				<p className="info text-center" >
					<span className="glyphicon glyphicon-user"> Account Name: 
        				<span id="current-accountName">{username}</span>
        			</span> 
        		</p>
				<p className="info text-center" >
					<span className="glyphicon glyphicon-eye-open"> Display Name: 
        				<span id="current-displayName">{username}</span>
        			</span>
        		</p>
				<p className="info text-center" >
					<span className="glyphicon glyphicon-phone"> Phone Number: 
        				<span id="current-phoneNumber">1231231234</span>
        			</span>
        		</p>
				<p className="info text-center" >
					<span className="glyphicon glyphicon-send"> Email Address: 
        				<span id="current-emailAddress">{email}</span>
        			</span> 
        		</p>
				<p className="info text-center" >
					<span className="glyphicon glyphicon-home"> Zip Code: 
        				<span id="current-zipCode">{zipcode}</span>
        			</span> 
        		</p>
				<p className="info text-center" >
					<span className="glyphicon glyphicon-calendar"> Birthday: 
        				<span id="current-birthday">{dob}</span>
        			</span>
        		</p>
			</div>
			)
	}
}
CurrentInfo.propTypes = {
	username:PropTypes.string.isRequired,
	email:PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired,
	link: PropTypes.func,
	//show: PropTypes.bool,
	login: PropTypes.func
}
const mapStateToProps = (state) => {
	return {
		username: state.userInfo.username,
		email: state.userInfo.email,
		zipcode: state.userInfo.zipcode,
		dob:state.userInfo.dob,
		show: state.userInfo.show
	}
}
const CurrentInfos = connect(
	mapStateToProps,
	dispatch => ({
		link: () => {
			dispatch(linkAccounts())
		},
		login: (username, password) => {
			dispatch(addError(''))
        	dispatch(addSuccess(''))
        	dispatch(clearInfo())
        	dispatch(clearFriends())
        	dispatch(clearArticles())
        	dispatch(updateShow(false))
      		dispatch(localLogin(username, password))
    	}
	})
)(CurrentInfo);

export default CurrentInfos;