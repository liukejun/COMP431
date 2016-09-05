//this is a function that get user's input and update profle contents with the new input
function updateProfile(){
	var name = document.getElementById("nm_txt").value;
	var email = document.getElementById("em_txt").value;
	var phone = document.getElementById("pn_txt").value;
	var zip = document.getElementById("zip_txt").value;
	var password = document.getElementById("pw_txt").value;
	var password_cfm = document.getElementById("pwc_txt").value;
	if(name==null||email==null||phone==null||password==null||password_cfm==null
		||name==""||email==""||phone==""||password==""||password_cfm==""){
		alert("Please input complete information!");
		return false;
	}

	//validate email address
	var emreg=/\w+@\w+.\w{2,4}/;
	if(!emreg.test(email)){
		alert("Invalid Email Address! A valid email address should be like XXX@XXX.XXX");
		return false;
	}
	//validate phone number
	var pnreg = /\d\d\d\d\d\d\d\d\d/;
	if(!pnreg.test(phone)){
		alert("Invalid Phone Number! A valid phone number contains 10 digits");
		return false;
	}
	//validate zip code
	var zipreg = /\d\d\d\d\d/;
	if(!zipreg.test(zip)){
		alert("Invalid Zip Code! A valid zip code contains 5 digits");
		return false;
	}
	//validate the password
	if(password!=password_cfm){
		alert("Password Comfirmation is not equal to password!");
		return false;
	}
	//generate alert information according to the change
	if(document.getElementById("nm_current").innerHTML != name){
		var output="Information updates successfully! \nDisplay Name changes from "+document.getElementById('nm_current').innerHTML+" to "+
		name;
	}
	if(document.getElementById("em_current").innerHTML != email){
		output +="\nEmail Address changes from "+document.getElementById('em_current').innerHTML+" to "+email;
	}
	if(document.getElementById("pn_current").innerHTML != phone){
		output += "\nPhone number changes from "+document.getElementById('pn_current').innerHTML+" to "+phone;
	}
	if(document.getElementById("zip_current").innerHTML != zip){
		output += "\nZip code changes from "+document.getElementById('zip_current').innerHTML+" to "
		+zip;
	}
	alert(output);
	
	//change the current display imformation
	document.getElementById("nm_current").innerHTML = name;
	document.getElementById("em_current").innerHTML = email;
	document.getElementById("pn_current").innerHTML = phone;
	document.getElementById("zip_current").innerHTML = zip;
	document.getElementById("pw_current").innerHTML = "Password Changed";
	document.getElementById("pwc_current").innerHTML = "Password Changed";
	//clear the input texts
	document.getElementById("nm_txt").value="";
	document.getElementById("em_txt").value="";
	document.getElementById("pn_txt").value="";
	document.getElementById("zip_txt").value="";
	document.getElementById("pw_txt").value="";
	document.getElementById("pwc_txt").value="";
	return false;
}
//this is a funtion to return to previous page
function returnPrevious(){
	window.history.back();
	return false;
}