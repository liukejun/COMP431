//validate register and return corresponding feedback message, notify user of wrong input or success
function validateRegister(nm, pn, em, btn, zip,pw, pwc) {
	if (nm == '' || pn == '' || em == '' || btn == '' || zip == '' || pw == '' || pwc == '')
		return 'All fields must be supplied'
	if (!validateName(nm))
		return 'Invalid username. Must start with a letter and can only contains letters and numbers.'
	if (!validateEmail(em))
		return 'Invalid email. Must be like a@b.co'
	if (!validatePhone(pn))
		return 'Invalid phone number. Should and only contain 10 digits'
	if (!validateBirth(btn))
		return 'Invalid birthday or age under 18'
	if (!validateZip(zip))
		return 'Invalid zipcode. Must be 5 digits in length, e.g., 77005'
	if (!validatePwd(pw, pwc))
		return 'Password do not match'
	return 'You have registered successfully!'
}
// validate register info
export function validateName(nm){
	//validate account name
	var nmreg=/[a-zA-Z][a-z0-9A-Z]*/;
	if(!nmreg.test(nm)){
		return false;
	}
	return true;
}
export function validatePhone(pn) {
	//validate phone
	var pnreg= new RegExp("^[0-9]{10}$");
	if(!pnreg.test(pn)){
		return false;
	}
	return true;
}
export function validateEmail(em){
	//validate email address
	var emreg=/\w+@\w+.\w{2,4}/;
	if(!emreg.test(em)){
		return false;
	}
	return true;
}
function validateBirth(btn)	{
	//validate birthday
	if (btn==""||btn==null){
		return false;
	}
	var today=new Date();
	var month=today.getMonth()+1;
	var date=today.getDate();
	var age=today.getFullYear()-btn.substring(0,4)-1;
	if(month>btn.substring(5, 7) || month==btn.substring(5,7) && date >= btn.substring(8, 10)){
		age++;
	}
	if(age < 18){
		return false;
	}
	return true;
}	
export function validateZip(zip) {
	//validate zip code
	var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$");
	if(!zipReg.test(zip)){
		return false;
	}
	return true;
}		
export function validatePwd(pw, pwc){
	//validate password
	if(pw!=pwc){
		return false;
	}

	return true;
}	
export {validateRegister};
