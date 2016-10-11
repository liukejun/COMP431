require('./login.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image, Tooltip} from 'react-bootstrap';

import {validateRegisterPwd, validateRegisterZip, validateRegisterName, validateRegisterPhone,validateRegisterBirth,validateRegisterEmail} from './landinglogic.js';

class Register extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
      	showNameTip :false,
      	showPhoneTip :false,
      	showEmailTip :false,
      	showZipTip :false,
      	showBirthTip :false,
      	showPwdTip :false,
      }
    }
	updateNav() {
		var allTrue = 0;
		var aname = this.refs.accountname.value;
		var dname = this.refs.displayname.value;
		var email = this.refs.email.value;
		var phone = this.refs.phone.value;
		var birth = this.refs.birth.value;
		var zipcode = this.refs.zipcode.value;
		var password = this.refs.password.value;
		var confirm_password = this.refs.confirm_password.value;
		if (validateRegisterName(aname)){
			this.setState({showNameTip:false});
			allTrue++;
		}
		else
			this.setState({showNameTip:true});
		if (validateRegisterPhone(phone)){
			this.setState({showPhoneTip:false});
			allTrue++;
		}
		else
			this.setState({showPhoneTip:true});
		if (validateRegisterEmail(email)){
			this.setState({showEmailTip:false});
			allTrue++;
		}
		else
			this.setState({showEmailTip:true});
		if (validateRegisterZip(zipcode)){
			this.setState({showZipTip:false});
			allTrue++;
		}
		else
			this.setState({showZipTip:true});
		if (validateRegisterBirth(birth)){
			this.setState({showBirthTip:false});
			allTrue++;
		}
		else
			this.setState({showBirthTip:true});
		if (validateRegisterPwd(password, confirm_password)){
			this.setState({showPwdTip:false});
			allTrue++;
		}
		else
			this.setState({showPwdTip:true});
		if (allTrue == 6) {
			var val = "Main_Page";
			this.props.update(val);
		}
	}
	render() {
		return (
			<div>
				{
                  !this.state.showNameTip ? null :
                  <Tooltip placement="top" className="in" id="tooltip-top">
                    Contain only upper or lower case letters and numbers, don't not start with a number.
                  </Tooltip>
                }
				<h1>Sign Up</h1>

				<div className="form-group">

					<input type="text" placeholder="Account Name" name="aname" ref="accountname" className="form-control" />
					
				</div>
				<div className="form-group">
					<input type="text" placeholder="Display Name" name="dname" ref="displayname" className="form-control" />
				</div>
				<div className="form-group">
					<input type="email" placeholder="Email Address" name="email" ref="email" className="form-control" />
					{
                      !this.state.showEmailTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Invalid email address.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<input type="number" placeholder="Phone Number" name="phone" ref="phone" className="form-control"/>
					{
                      !this.state.showPhoneTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Invalid phone mumber. Check if you input 10 digits.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<input type="date" ref="birth" name="birthday" className="form-control"/>
					{
                      !this.state.showBirthTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Invalid birthday or You are under 18.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<input type="number" placeholder="Zip Code" name="zip" ref="zipcode" className="form-control" />
					{
                      !this.state.showZipTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Invalid zip code. Check if you input 5 digits.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<input type="password" placeholder="Password" name="pwd" ref="password" className="form-control"/>
					{
                      !this.state.showPwdTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Confirm password does not match password.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<input type="password" placeholder="Confirm Password" name="pwdcmf" ref="confirm_password" className="form-control"/>
					{
                      !this.state.showPwdTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        comfirm password does not match password.
                      </Tooltip>
                    }
				</div>
				<div className="form-group">
					<Row>
						<Col className="col-sm-6 col-sm-offset-3">
							<input type="submit" name="register-submit" id="register-submit" className="form-control btn btn-register" value="Sign Up" onClick={this.updateNav.bind(this)}/>
						</Col>
					</Row>
				</div>
			</div>
			);
	}
}
Register.propTypes = {
      update: React.PropTypes.func.isRequired,
  };
export default Register;