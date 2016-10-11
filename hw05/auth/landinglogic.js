// validate register info
function validateRegister(){
		//get information
		var nm=document.forms["formRegister"]["aname"].value;
		var em=document.forms["formRegister"]["email"].value;
		var pn=document.forms["formRegister"]["phone"].value;
		
		var btn = document.getElementById('birth').value;
		var pw=document.forms["formRegister"]["pwd"].value;
		var pwc=document.forms["formRegister"]["pwdcmf"].value;
		var zip=document.forms["formRegister"]["zip"].value;

		//validate account name
		var nmreg=/[a-zA-Z][a-z0-9A-Z]*/;
		if(!nmreg.test(nm)){
			window.alert("Account name is not valid! A valid account name can only be upper or lower case letters and numbers, but may not start with a number.");
			document.forms["formRegister"]["aname"].value="";
			return false;
		}
		//validate email address
		var emreg=/\w+@\w+.\w{2,4}/;
		if(!emreg.test(em)){
			alert("Invalid Email Address! A valid email address should be like XXX@XXX.XXX");
			document.forms["formRegister"]["email"].value="";
			return false;
		}
		//validate phone
		var pnreg= new RegExp("^[0-9]{10}$");
		if(!pnreg.test(pn)){
			alert("Invalid Phone Number! A valid phone number contains 10 digits");
			document.forms["formRegister"]["phone"].value="";
			return false;
		}
		
		//validate birthday
		if (btn==""||btn==null){
			alert("Invalid birthday!A valid one should be like 01/01/1990");
			document.forms["formRegister"]["birthday"].value="";
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
			alert("You are under 18. Registration is open to 18+.");
			document.forms["formRegister"]["birthday"].value="";
			return false;
		}
		//validate zip code
		var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$");
		if(!zipReg.test(zip)){
			alert("Invalid zip code! Zip code should contain 5 digits.");
			document.forms["formRegister"]["zip"].value="";
			return false;
		}
		//validate password
		if(pw!=pwc){
			alert("Password Comfirmation is not equal to password!");
			document.forms["formRegister"]["pwd"].value="";
			document.forms["formRegister"]["pwdcmf"].value="";
			return false;
		}
	
		return true;
	}

function validateLogin(){
	//simple validate for username and password: not empty
	var nm=document.forms["formLogin"]["username"].value;
	var pwd=document.forms["formLogin"]["password"].value;
	if (nm==null || pwd ==null || nm=="" ||pwd==""){
		alert("Please input complete information!")
		return false;
	}
	//set url to transform username and password
	window.location.href = '../main.html?username='+nm+'&password='+pwd+'login-submit=Log+In'
	return true;
}
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
