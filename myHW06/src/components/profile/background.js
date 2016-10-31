require('./profile.css')
require('react-bootstrap')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
//decorated background in profile page
class Background extends React.Component {
	render() {
		const cover = "http://cdn.playbuzz.com/cdn/b3ba6563-2371-45b5-87b6-aa6db956ddab/2177bb5e-7afe-4e1b-8824-57033320b0f5.jpg"
		const { avatar, username, headline, errorMsg } = this.props
		return (
			<div className="container">
				<div className="fb-profile">
				    <img  className="fb-image-lg" src={cover} alt="Profile image example"/>
				    <img  className="fb-image-profile thumbnail" src={avatar} alt="Profile image example"/>
				    <div className="fb-profile-text">
				        <h1 id="displayName">{username}</h1>
				        <p id="state">{headline}</p>
				    </div>
				    <input className="chgphoto" type="file"/>
				    <p className="errorDisplay">{ errorMsg }</p>
				</div>
			</div>  
			);
	}
}
Background.propTypes = {
	avatar:PropTypes.string.isRequired,
	username:PropTypes.string.isRequired,
	headline:PropTypes.string.isRequired,
	errorMsg: React.PropTypes.string
}
const mapStateToProps = (state) => {
	return {
		avatar: state.userInfo.avatar,
		username: state.userInfo.username,
		headline: state.userInfo.headline,
		errorMsg: state.updateError.error
	}
}
const Backgrounds = connect(
	mapStateToProps,
	null
)(Background);

export default Backgrounds;