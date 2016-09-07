var grey_area = document.getElementById("greyArea");
var target_button = document.getElementById("targetButton");
var moveEachStep = 50; //the amount(px) for each movement
target_button.addEventListener("click", pressed);
grey_area.addEventListener("mouseover", avoidmain);
var state = 0;

//this is a function that ensures mouse won't catch button
function avoidmain(e){
	if (!e.shiftKey && state == 0){
		var currPos_top = parseInt(window.getComputedStyle(grey_area).getPropertyValue('top'));
		var currPos_left = parseInt(window.getComputedStyle(grey_area).getPropertyValue('left'));
		var height = parseInt(window.getComputedStyle(grey_area).getPropertyValue('height'));
		var width = parseInt(window.getComputedStyle(grey_area).getPropertyValue('width'));
		var currPos_btnTop = parseInt(window.getComputedStyle(target_button).getPropertyValue('top')) + currPos_top;
		var currPos_btnLeft = parseInt(window.getComputedStyle(target_button).getPropertyValue('left')) + currPos_left;
		var currPos_btnDown = currPos_btnTop + parseInt(window.getComputedStyle(target_button).getPropertyValue('height'));
		var currPos_btnRight = currPos_btnLeft + parseInt(window.getComputedStyle(target_button).getPropertyValue('width'));
		var mouse_x = e.clientX;
		var mouse_y = e.clientY;
	
		var amountToMove_x;
		var amountToMove_y;
		//the mouse is on the right of the button, the button should move to the left
		if (mouse_x >= (currPos_btnLeft + currPos_btnRight)/2){
			amountToMove_x = -moveEachStep;
		}
		//the mouse is on the left of the button, the button should move to the right;
		else if(mouse_x < (currPos_btnLeft + currPos_btnRight)/2){
			amountToMove_x = moveEachStep;
		}
		//the mouse is below the button, button should go up
		if (mouse_y >= (currPos_btnTop + currPos_btnDown)/2){
			amountToMove_y = -moveEachStep;
		}
		else if (mouse_y < (currPos_btnTop + currPos_btnDown)/2){
			amountToMove_y = moveEachStep;
		}
		var expPos_top = currPos_top + amountToMove_y;
		var expPos_left = currPos_left + amountToMove_x;
	
		if (expPos_left < 0 || expPos_left + width > window.innerWidth){
			expPos_left = window.innerWidth/2;
		}
		if (expPos_top < 0 || expPos_top + height> window.innerHeight){
			expPos_top = window.innerHeight/2;
		}
		grey_area.style.top = expPos_top+"px";
		grey_area.style.left = expPos_left+"px";
	}
	
}
/*
*  a function that the button listens
*/
function pressed(){
	if (target_button.value=="Click Me"){
		state = 1;
		document.getElementById("successText").style.display='inline-block';
		target_button.value="Play Again";
	}
	else if(target_button.value=="Play Again"){
		document.getElementById("successText").style.display='none';
		target_button.value="Click Me";
		state = 0;

	}
}