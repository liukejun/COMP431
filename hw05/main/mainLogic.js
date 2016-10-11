function formprocessor(){
		var parameters=location.search.substring(1).split("&");
		// if the url has 9 parameters->receive data from registerForm
		if(parameters.length == 9){
			var temp=parameters[0].split("=");
			var an=unescape(temp[1]);
			temp=parameters[1].split("=");
			var dn=unescape(temp[1]);
			temp=parameters[2].split("=");
			var em=unescape(temp[1]);
			temp=parameters[3].split("=");
			var phone=unescape(temp[1]);
			temp=parameters[4].split("=");
			var birth=unescape(temp[1]);
			temp=parameters[5].split("=");
			var zip=unescape(temp[1]);
			// if the display is not empty, update the display name in main page using the received display name
			if (dn!=""){
				document.getElementById("user-info-displayName").innerHTML=dn;
			}
			
		}
		// if the url has 3 parameters->receive data from login
		else if (parameters.length == 3){
			var temp = parameters[0].split("=");
			var username = unescape(temp[1]);
			document.getElementById("user-info-displayName").innerHTML=username;
		}

	}
// This function is to update the displayed state from user input state
function updateState(){
	var newState=document.getElementById("mystatus").value;
	document.getElementById("current-state").innerHTML=newState;
	document.getElementById("mystatus").value="";
}
//This function is to clear texts in the textArea
function clearPost(){
	document.getElementById("postContent").value="";
}
//This function is to transform displayname and state from main page to profile page
function toProfilePage(){
	var displayName = document.getElementById("user-info-displayName").innerHTML;
	var state = document.getElementById("current-state").innerHTML;
	//set customed url
	window.location.replace('./profile.html?displayname='+displayName+'&state='+state);
}
window.onload = function(){
	formprocessor();
}