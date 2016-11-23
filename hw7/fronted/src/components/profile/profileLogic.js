import {validateName, validatePhone, validateEmail, validateZip, validatePwd} from '../auth/landingLogic.js'
// validate the input in update profile
//user don't have to change everthing in the profile\
//return a feedback which tells user which part they have updated
function validateUpdate(nm, dm, pn, em, zip,pw, pwc) {
	console.log("phone:"+pn)
	console.log("email:" +em)
	console.log("zip:"+zip)
	var resText = 'You have changed ...'
	if ( nm != '' && !validateName(nm))
		return 'Invalid username. Must start with a letter and can only contains letters and numbers.'
	else if (nm != '')
		resText+='username; '
	if (dm != '')
		resText+='displayName; '
	if (em != '' && !validateEmail(em))
		return 'Invalid email. Must be like a@b.co'
	else if (em != '')
		resText+='email; '
	if (pn != '' && !validatePhone(pn))
		return 'Invalid phone number. Should and only contain 10 digits'
	else if (pn != '')
		resText+='phoneNumber; '
	if (zip != ''&& !validateZip(zip))
		return 'Invalid zipcode. Must be 5 digits in length, e.g., 77005'
	else if (zip != '')
		resText+='zipcode; '
	if (pw != '' & pwc != '' && !validatePwd(pw, pwc))
		return 'Password do not match'
	else if (pw != '' && pwc != '')
		resText+='Password'

	return resText
}
export default validateUpdate