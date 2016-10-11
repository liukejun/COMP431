// validate register info
function validateRegisterName(nm){
	//validate account name
	var nmreg=/[a-zA-Z][a-z0-9A-Z]*/;
	if(!nmreg.test(nm)){
		return false;
	}
	return true;
}
function validateRegisterPhone(pn) {
	//validate phone
	var pnreg= new RegExp("^[0-9]{10}$");
	if(!pnreg.test(pn)){
		return false;
	}
	return true;
}
function validateRegisterEmail(em){
	//validate email address
	var emreg=/\w+@\w+.\w{2,4}/;
	if(!emreg.test(em)){
		return false;
	}
	return true;
}
function validateRegisterBirth(btn)	{
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
function validateRegisterZip(zip) {
	//validate zip code
	var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$");
	if(!zipReg.test(zip)){
		return false;
	}
	return true;
}		
function validateRegisterPwd(pw, pwc){
	//validate password
	if(pw!=pwc){
		return false;
	}

	return true;
}	
	
function validateLoginName(nm){
	//simple validate for username and password: not empty
	if (nm==null ||  nm==""){
		return false;
	}
	return true;
}
function validateLoginPassword(pwd){
	if (pwd ==null ||pwd==""){
		return false;
	}
	return true;
}
export {validateLoginName, validateLoginPassword};
export {validateRegisterPwd, validateRegisterZip, validateRegisterName, validateRegisterPhone,validateRegisterBirth,validateRegisterEmail};
