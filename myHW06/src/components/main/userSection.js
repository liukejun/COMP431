require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import UpdateHeadlines from './updateHeadline.js'
//current user section
class UserSection extends React.Component {
	render() {
	const { username, headline, avatar }  = this.props
		return (
			<Col className="col-sm-12 col-xs-offset-3 well-white">
				<Image src={avatar}  alt="Avatar" responsive/>
        		<p className="name-in-profile" id="user-info-displayName">{ username }</p>
        		<p className="status-in-profile" id="userinfo-current-state">{ headline }</p>
				<UpdateHeadlines/>			
			</Col>
			)
	}
}

UserSection.propTypes = {
	username: React.PropTypes.string,
	headline: React.PropTypes.string,
	avatar: React.PropTypes.string
}
const mapStateToProps = (state) => {
	return {
		username: state.userInfo.username,
		headline: state.userInfo.headline,
		avatar: state.userInfo.avatar
	}
}
const UserSections = connect(
	mapStateToProps,
	null
)(UserSection);
export default UserSections;