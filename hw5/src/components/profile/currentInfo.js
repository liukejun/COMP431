require('./profile.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Col} from 'react-bootstrap';
import { connect } from 'react-redux'
//renders user's current information 
class CurrentInfo extends React.Component {
	render() {
		const { username, email, zipcode, dob } = this.props
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
	zipcode: PropTypes.number.isRequired,
	dob: PropTypes.string.isRequired
}
const mapStateToProps = (state) => {
	return {
		username: state.userInfo.username,
		email: state.userInfo.email,
		zipcode: state.userInfo.zipcode,
		dob:state.userInfo.dob
	}
}
const CurrentInfos = connect(
	mapStateToProps,
	null
)(CurrentInfo);

export default CurrentInfos;