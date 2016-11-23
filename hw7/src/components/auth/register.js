require('./login.css')
require('react-bootstrap')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image, Tooltip} from 'react-bootstrap';
import { connect } from 'react-redux'
import {validateRegister} from './landinglogic.js';
import { addSuccess, addError } from '../../action.js'
import { register } from './authActions.js'
//Register component which renders the user sign in UI
class Register extends React.Component {	
		
	render() {
		const { registerFeedback, registerToServer } = this.props
		//validate register information and get feedback msg
		const navToMain = () => {
			var aname = this.refs.accountname.value;
			var dname = this.refs.displayname.value;
			var email = this.refs.email.value;
			var phone = this.refs.phone.value;
			var birth = this.refs.birth.value;
			var zipcode = this.refs.zipcode.value;
			var password = this.refs.password.value;
			var confirm_password = this.refs.confirm_password.value;
			var resText = validateRegister(aname, phone, email, birth, zipcode, password, confirm_password)
			if (resText == 'You have registered successfully!') {
				registerToServer(aname, password, email, phone, birth, zipcode)
			} else {
				registerFeedback(resText)
			}
		}
		return (
			<div>
				
				<h1>Sign Up</h1>

				<div className="form-group">

					<input type="text" id="register_an" placeholder="Account Name" ref="accountname" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="text" id="register_dn" placeholder="Display Name" ref="displayname" className="form-control" />
				</div>
				<div className="form-group">
					<input type="email" id="register_em" placeholder="Email Address" ref="email" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="number" id="register_pn" placeholder="Phone Number" ref="phone" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="date" id="register_btn" ref="birth" name="birthday" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="number" id="register_zip" placeholder="Zip Code" ref="zipcode" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="password" id="register_pwd" placeholder="Password" ref="password" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="password" id="register_pwdc" placeholder="Confirm Password" ref="confirm_password" className="form-control"/>
					
				</div>
				<div className="form-group">
					<Row>
						<Col className="col-sm-6 col-sm-offset-3">
							<input type="submit" name="register-submit" id="register-submit" className="form-control btn btn-register" value="Sign Up" onClick={navToMain}/>
						</Col>
					</Row>
				</div>
			</div>
			);
	}
}
Register.propTypes = {
    registerFeedback: PropTypes.func.isRequired,
    registerToServer: PropTypes.func.isRequired
}
const Registers = connect(null, dispatch => ({
    registerFeedback: (msg) => dispatch(addError(msg)),
    registerToServer: (aname, password, email, phone, birth, zipcode) => dispatch(register(aname, password, email, phone, birth, zipcode))
    	
	}
))(Register);
export default Registers;