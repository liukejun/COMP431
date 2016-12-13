require('./profile.css')
require('../main/main.css')
require('react-bootstrap')
var FileInput = require('react-file-input');
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { changeAvatars } from './profileAction.js'
//decorated background in profile page
class Background extends React.Component {
	render() {
		let newImg
		let fd = new FormData()
		const cover = "http://cdn.playbuzz.com/cdn/b3ba6563-2371-45b5-87b6-aa6db956ddab/2177bb5e-7afe-4e1b-8824-57033320b0f5.jpg"
		const { avatar, username, headline, errorMsg, changeAvatar } = this.props
		const _changeAvatar = () => {
			console.log("catch fd")
			changeAvatar(fd);
		}
		function handleImageChange(e){
			newImg = e.target.files[0]
			fd.append('image', newImg)
		}
		return (
			<div className="container">
				<div className="fb-profile">
				    <img  className="fb-image-lg" src={cover} alt="Profile image example"/>
				    <img  className="fb-image-profile thumbnail" src={avatar} alt="Profile image example"/>
				    <div className="fb-profile-text">
				        <h1 id="displayName">{username}</h1>
				        <p id="state">{headline}</p>
				    </div>
				    <label className="btn btn-update-in-profile btn-file">
					    <span className="glyphicon glyphicon-plus"></span>
	               					 Change Avatar
					    <form>
					        <FileInput name="myImage"
					                   accept=".png,.gif,.jpeg,.jpg"
					                   ref={ (node) => newImg = node }
					                   placeholder="My Image"
					                   onChange={(e) => handleImageChange(e)} />
						</form>
					</label>
					<button className="btn-post" onClick={_changeAvatar}>Submit</button>
				    <p id="profile_msg" className="errorDisplay">{ errorMsg }</p>
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
const Backgrounds = connect(mapStateToProps, dispatch => ({
    changeAvatar: (fd) => {
    	dispatch(changeAvatars(fd))
	}
}))(Background);

export default Backgrounds;