require('./login.css')
require('react-bootstrap')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image, Tooltip} from 'react-bootstrap';
import { connect } from 'react-redux'
import {validateRegister} from './landinglogic.js';
import { addSuccess, addError } from '../action.js'
//Register component which renders the user sign in UI
class Register extends React.Component {	
		
	render() {
		const { registerFeedback } = this.props
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
			registerFeedback(resText)
		}
		return (
			<div>
				
				<h1>Sign Up</h1>

				<div className="form-group">

					<input type="text" placeholder="Account Name" ref="accountname" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="text" placeholder="Display Name" ref="displayname" className="form-control" />
				</div>
				<div className="form-group">
					<input type="email" placeholder="Email Address" ref="email" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="number" placeholder="Phone Number" ref="phone" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="date" ref="birth" name="birthday" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="number" placeholder="Zip Code" ref="zipcode" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="password" placeholder="Password" ref="password" className="form-control"/>
					
				</div>
				<div className="form-group">
					<input type="password" placeholder="Confirm Password" ref="confirm_password" className="form-control"/>
					
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
}
const Registers = connect(null, dispatch => ({
    registerFeedback: (msg) => {
    	if (msg == 'You have registered successfully!')
    		dispatch(addSuccess(msg))
    	else
    		dispatch(addError(msg))
    	}
	}
))(Register);
export default Registers;