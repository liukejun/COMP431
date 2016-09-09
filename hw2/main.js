

var t1 = setInterval("changeImg('1')", 1000 * Math.ceil((Math.random() * 5 )));
var t2 = setInterval("changeImg('2')", 1000 * Math.ceil((Math.random() * 5 )));
var t3 = setInterval("changeImg('3')", 1000 * Math.ceil((Math.random() * 5 )));

// an array that stores the candidate image used for changing image
var candid_pic = new Array();
candid_pic[0] = "http://ntdimg.com/pic/2014/3-25/p4571011a355983447.jpg";
candid_pic[1] = "http://pic.qiantucdn.com/58pic/14/18/44/46I58PICQpB_1024.jpg";
candid_pic[2] = "http://img.ltn.com.tw/Upload/liveNews/BigPic/600_phpac0wYs.jpg";
candid_pic[3] = "http://www.snopes.com/wp-content/uploads/2015/09/another-teal-owl.jpg";
candid_pic[4] = "https://pixabay.com/static/uploads/photo/2015/07/14/17/26/owl-845131_960_720.jpg";
candid_pic[5] = "https://i.ytimg.com/vi/_RBNpALibqo/maxresdefault.jpg";

//this is a function that change the origianl image to a random image selected from the image array
function changeImg(pic){
	//generate random integer ranging from 1 to 5
	var integer = Math.floor(Math.random() * 6);
	if(pic == 1){
		document.getElementById("img1").src = candid_pic[integer];
	}
	if(pic == 2){
		document.getElementById("img2").src = candid_pic[integer];
	}
	if(pic == 3){
		document.getElementById("img3").src = candid_pic[integer];
	}
}

//this is a function that give order to stop interval or restart it again
function action(num){
	//if user press on button 1, sense whether to stop changing image in 1st image display area
	if(num==1){
		if(document.getElementById("img1b").value=="STOP"){
			clearInterval(t1);
			document.getElementById("img1b").value="Start";
		}
		else if(document.getElementById("img1b").value=="Start"){
			setInterval("changeImg('1')", 1000 * Math.ceil((Math.random() * 5 )));
			document.getElementById("img1b").value="STOP";
		}
	}
	//if user press on button 2, sense whether to stop changing image in 2nd image display area
	if(num==2){
		if(document.getElementById("img2b").value=="STOP"){
			clearInterval(t2);
			document.getElementById("img2b").value="Start";
		}
		else if(document.getElementById("img2b").value=="Start"){
			setInterval("changeImg('2')", 1000 * Math.ceil((Math.random() * 5 )));
			document.getElementById("img2b").value="STOP";
		}
	}
	//if user press on button 3, sense whether to stop changing image in 3rd image display area
	if(num == 3){
		if(document.getElementById("img3b").value=="STOP"){
			clearInterval(t3);
			document.getElementById("img3b").value="Start";
		}
		else if(document.getElementById("img3b").value=="Start"){
			setInterval("changeImg('3')", 1000 * Math.ceil((Math.random() * 5 )));
			document.getElementById("img3b").value="STOP";
		}
	}
	return false;
}