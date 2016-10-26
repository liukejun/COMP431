require('./profile.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Col, Tooltip} from 'react-bootstrap';
import validateUpdate from './profileLogic.js';
import { connect } from 'react-redux'
//renders the update info in profile page
class UpdateInfo extends React.Component {
	render() {
		const { registerFeedback } = this.props
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
			var resText = validateUpdate(name, phone, email, zipcode, password, confirm_password)
			registerFeedback(resText)
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
					<input className="form-control" type="text" name="emailaddress" ref="update_emailAddress" placeholder="Email Address"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" type="number" name="zipcode" ref="update_ZipCode" placeholder="Zip Code"/>
					
				</div>
				<div className="form-group">
					<input className="form-control" type="text" name="password" ref="update_password" placeholder="Password"/>
					
				</div>
				<div className="form-group">
	        		<input className="form-control" type="text" name="passwordcfm" ref="update_password_comfirm" placeholder="Comfirm Password"/>
	      			
      			</div>
				<center><button className="btn btn-green" onClick={updateInfo}>Update Information</button></center>
			</div>
			)
	}
}
UpdateInfo.propTypes = {
    registerFeedback: PropTypes.func.isRequired,
}
const UpdateInfos = connect(null, dispatch => ({
    registerFeedback: (msg) => dispatch({type: 'ERROR', text: msg})
	}
))(UpdateInfo);
export default UpdateInfos;