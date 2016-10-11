//This function receive data from main page and display it on current page
function displayInfor(){
	var parameters=location.search.substring(1).split("&");
		if(parameters.length == 2){
			var temp=parameters[0].split("=");
			var dname=unescape(temp[1]);
			temp=parameters[1].split("=");
			var state=unescape(temp[1]);
			if (dname!=""){
				document.getElementById("displayName").innerHTML=dname;
				document.getElementById("current-displayName").innerHTML=dname;
			}
			if (state!=""){
				document.getElementById("state").innerHTML=state;
			}
		}
}
//this is a function that get user's input and update profle contents with the new input
function updateProfile(){
	var name = document.getElementById("update-accountName").value;
	var dname = document.getElementById("update-displayName").value;
	var email = document.getElementById("update-emailAddress").value;
	var phone = document.getElementById("update-phoneNumber").value;
	var zip = document.getElementById("update-ZipCode").value;
	var password = document.getElementById("update-password").value;
	var password_cfm = document.getElementById("update-password-comfirm").value;
	
	//validate account name
	var nmreg=/[a-zA-Z][a-z0-9A-Z]*/;
	if (name=="" || name ==null){
	} else {
		if(!nmreg.test(name)){
			window.alert("Account name is not valid! A valid account name can only be upper or lower case letters and numbers, but may not start with a number.");
			document.getElementById("update-accountName").value="";
			return false;
		} else {
			document.getElementById("current-accountName").innerHTML = name;
		}
	}

	//validate display name
	if (dname==""|| dname ==null){

	} else {
		document.getElementById("current-displayName").innerHTML = dname;
	}

	//validate email address
	var emreg=/\w+@\w+.\w{2,4}/;
	if(email==""|| email ==null){

	} else {
		if(!emreg.test(email)){
			alert("Invalid Email Address! A valid email address should be like XXX@XXX.XXX");
			document.getElementById("update-emailAddress").value="";
			return false;
		} else{
			document.getElementById("current-emailAddress").innerHTML = email;
		}
	}

	//validate phone number
	var pnreg= new RegExp("^[0-9]{10}$");
	if(phone==""|| phone ==null){

	} else {
		if(!pnreg.test(phone)&&phone!=""){
			alert("Invalid Phone Number! A valid phone number contains 10 digits");
			document.getElementById("update-phoneNumber").value="";
			return false;
		} else{
			document.getElementById("current-phoneNumber").innerHTML = phone;
		}
	}
	
	//validate zip code
	var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$");
	if(zip==""|| zip ==null){

	} else {
		if(!zipReg.test(zip)&&zip!=""){
			alert("Invalid Zip Code! A valid zip code contains 5 digits");
			document.getElementById("update-ZipCode").value="";
			return false;
		} else {
			document.getElementById("current-zipCode").innerHTML = zip
		}
	}
	
	//validate the password
	if(password!=password_cfm){
		alert("Password Comfirmation is not equal to password!");
		document.getElementById("update-password").value="";
		document.getElementById("update-password-comfirm").value="";
		return false;
	}

	//clear the input texts
	document.getElementById("update-accountName").value="";
	document.getElementById("update-displayName").value="";
	document.getElementById("update-emailAddress").value="";
	document.getElementById("update-phoneNumber").value="";
	document.getElementById("update-ZipCode").value="";
	document.getElementById("update-password").value="";
	document.getElementById("update-password-comfirm").value="";
	return false;
}
window.onload=function(){
	displayInfor();
}