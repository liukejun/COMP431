require('./profile.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Col, Tooltip} from 'react-bootstrap';
import validateUpdate from './profileLogic.js';
import { connect } from 'react-redux'
import { updateEmail, updateZipCode, updatePwd } from './profileAction.js'
//renders the update info in profile page
class UpdateInfo extends React.Component {
	render() {
		const { registerFeedback, updateEmail, updateZipcode, updatePassword } = this.props
		//vaidate the update information and send feedback to user
		const updateInfo = () => {
			var name = this.refs.update_accountName.value;
			var dname = this.refs.update_displayName.value;
			var email = this.refs.update_emailAddress.value;
			var phone = this.refs.update_phoneNumber.value;
			var zipcode = this.refs.update_ZipCode.value;
			var password = this.refs.update_password.value;
			var confirm_password = this.refs.update_password_comfirm.value;
			console.log('start to deal with update')
			var resText = validateUpdate(name, dname, phone, email, zipcode, password, confirm_password)
			registerFeedback(resText)
			var emailString = "email"
			var zipcodeString = "zipcode"
			var passwordString = "Password"
			if (resText.indexOf(emailString) != -1) {
				updateEmail(email)
			}
			if (resText.indexOf(zipcodeString) != -1) {
				updateZipcode(zipcode)
			}
			if (resText.indexOf(passwordString) != -1) {
				updatePassword(password)
			}
			
		} 
		return(
			<div>
				<p className="BoldFont ">Update Information</p>
				<div className="form-group">
					 <input className="form-control" type="text" name="accountname" ref="update_accountName" placeholder="Account Name"/>
					
				</div>
				<div className="form-group">
					
					<input className="form-control" type="text" name="displayname" ref="update_displayName" placeholder="Display Name"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" type="number" name="phonenumber" ref="update_phoneNumber" placeholder="Phone Number"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" id="update_email" type="text" name="emailaddress" ref="update_emailAddress" placeholder="Email Address"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" id="update_zipcode" type="number" name="zipcode" ref="update_ZipCode" placeholder="Zip Code"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" id="update_pwd" type="text" name="password" ref="update_password" placeholder="Password"/>
					
				</div>
				<div className="form-group">
	        		<input className="form-control" id="update_pwdc" type="text" name="passwordcfm" ref="update_password_comfirm" placeholder="Comfirm Password"/>
	      			
      			</div>
				<center><button className="btn btn-green" id="update_profile_btn" onClick={updateInfo}>Update Information</button></center>
			</div>
			)
	}
}
UpdateInfo.propTypes = {
    registerFeedback: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    updateZipcode: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
}
const UpdateInfos = connect(null, dispatch => ({
    registerFeedback: (msg) => dispatch({type: 'ERROR', text: msg}),
    updateEmail: (email) => dispatch(updateEmail(email)),
    updateZipcode: (zipcode) => dispatch(updateZipCode(zipcode)),
    updatePassword: (pwd) => dispatch(updatePwd(pwd))
	}
))(UpdateInfo);
export default UpdateInfos;