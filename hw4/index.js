document.getElementById("btn_start").addEventListener("click", startGame);
document.getElementById('btn_pause').addEventListener('click', pauseGame);
document.getElementById("btn_quit").addEventListener("click",quitGame);
//globale variants
//activeBlock denotes the currently moving block
var activeBlock = new Array(4);
var table = document.getElementById("area");
var area = new Array(18);
var state = 0;
var score = 0;
var currentLevelScore = 0;
var maxScoreInLevel = 80;
var downTimer;
var color;
var bottomColor = new Array(10);
var level = 1;
var speed = 1000;
//each 10 blocks, there is one block with sudden movement (speed)
var suddenInterval = 10;
var suddenSpeed = 300;
//Block data structure. isTaken - if the block has been taken up, color - current color of block
function Block(){
	this.isTaken = 0;
	this.color= "black";
}
//init the global variants and display content
function init(){
	//initiate background blocks, area - canvas,0 represents block not painted yet
	for(var i=0;i<18;i++){ 
		area[i] = new Array(10); 
	} 
	for(var i=0;i<18;i++){ 
		for(var j=0; j<10; j++){ 
			area[i][j] = new Block();
			area[i][j].isTaken = 0; 
		} 
	}
	//state - current game state. 0:new round haven't started 1:working 2:stop
	state = 0;
	score = 0;
	currentLevelScore = 0;
	maxScoreInLevel = 80;
	level = 1;
	speed = 1000;
	suddenInterval = 10;
	suddenSpeed = 300;
	cleararea();
	document.getElementById("p_score").innerText=" 0";
	document.getElementById("p_level").innerText=" 1";
	document.getElementById("btn_start").innerText = "START GAME";
	document.getElementById("btn_start").style.background="＃4CAF50";
	document.getElementById("btn_pause").innerText = "PAUSE";
	document.getElementById('btn_pause').disabled = true;
	document.getElementById('btn_quit').disabled = true;
}
//Main function of Tetris, entrance of a new game
//start/restart a new game consists of: 
//1. generate a new block
//2. check the validality of the new block
//3. repaint the whole area
//4. set Interval for blocks going down automatically
function startGame(){
	if(document.getElementById('btn_start').innerText=='START GAME'){
		init();
		state = 1;
		document.getElementById("btn_start").innerText = "RESTART GAME";
		if(!generateNewBlock())
		{
			alert("GAME OVER");
			state = 2;
			return;
		}
		paintActiveBlock();
		suddenEvent();
		document.getElementById('btn_pause').disabled = false;
		document.getElementById('btn_quit').disabled = false;
	} else if (document.getElementById('btn_start').innerText=='RESTART GAME'){
		clearInterval(downTimer);
		var choice = confirm("Are you sure to start a new game?"+
			"(Press <Cancel> to continue your game Or <OK> to start a new game.)");
		if (choice == true){
			init();
			state = 1;
			document.getElementById("btn_start").innerText = "RESTART GAME";
			document.getElementById('btn_pause').disabled = false;
			document.getElementById('btn_quit').disabled = false;
			if(!generateNewBlock())
			{
				alert("GAME OVER");
				state = 2;
				return;
			}
			suddenEvent();
			paintActiveBlock();
		} else {
			state = 1
		}
	}
}
//set Interval for blocks going down automatically.
//Under specific condition, the interval time is 300, which means the block will drop very fast, 
//we called sudden block here.
function suddenEvent(){
	if (suddenInterval == 0){
		var ifSudden = ((Math.floor(Math.random()*20)+1)%7)%2 == 0 ? true : false;
		downTimer = setInterval(goDown, ifSudden == true? suddenSpeed : speed);
	} else {
		downTimer = setInterval(goDown, speed);
	}
}
//Pause or continue current game. Stop the interval if pause. Reset the interval if continue.
function pauseGame(){
	if(document.getElementById('btn_pause').innerText=="PAUSE"){
		state = 2;
		clearInterval(downTimer);
		document.getElementById('btn_pause').innerText="CONTINUE";
	} else if (document.getElementById('btn_pause').innerText=="CONTINUE"){
		state = 1
		suddenEvent();
		document.getElementById('btn_pause').innerText="PAUSE";
	}
}
//Quit or continue current game. Repaint areas and init all settings if quit.
function quitGame(){
	clearInterval(downTimer);
	var choice = confirm("Are you sure to quit curret game?"+
		"(Press <Cancel> to continue your game Or <OK> to quit.)");
		if (choice == true){
			init();
			state = 2;
			cleararea();
		} else if (choice == false){
			suddenEvent();
		}
}
//Generate color or new block. The color is randomly chosen from 7 color candicates.
function generateColor(){
	var colorType = (Math.floor(Math.random()*20)+1)%7;
	switch(colorType){
		case(0):{
			color = "#ff4500";
			break;
		}
		case(1):{
			color = "#ffa500";
			break;
		}
		case(2):{
			color = "#40e0d0";
			break;
		}
		case(3):{
			color = "#ffff00";
			break;
		}
		case(4):{
			color = "#87cefa";
			break;
		}
		case(5):{
			color = "#ffb6c1";
			break;
		}
		case(6):{
			color = "#00ff00";
			break;
		}
	}
}
//generate a new block who has a random shape from 7 basic shapes and assign color to it.
//7 basic shapes: square, rectangle, 'Z', opposite 'Z', 'L',"┻" , transformed '┻'
function generateNewBlock(){
	generateColor();
	var figureType = (Math.floor(Math.random()*20)+1)%7;
	switch(figureType){
		case(0):{
			// square block
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:0, y:5}; 
			activeBlock[3] = {x:1, y:5}; 
			break;
		}
		case(1):{
			//rectangle block
			activeBlock[0] = {x:0, y:3}; 
			activeBlock[1] = {x:0, y:4}; 
			activeBlock[2] = {x:0, y:5}; 
			activeBlock[3] = {x:0, y:6}; 
			break; 
		}
		case(2):{
			//"Z" block
			activeBlock[0] = {x:0, y:5}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:2, y:4}; 
			break; 
		}
		case(3):{
			//opposite "Z" block
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:2, y:5}; 
			break; 
		}
		case(4):{
			//"L" block
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:1, y:6}; 
			break; 
		}
		case(5):{
			//"┻" block
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:2, y:4}; 
			activeBlock[3] = {x:2, y:5}; 
			break; 
		}
		case(6):{
			//"┻" block
			activeBlock[0] = {x:0, y:5}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:1, y:6}; 
			break; 
		}
	}
	for (var i = 0; i < 4; i++) {
		if (!isBlockValid(activeBlock[i].x, activeBlock[i].y))
			return false;
	}
	return true;
}
//Paint function. Paint the canvas block with corresponding color.
function repaintarea(){
	
	
	for(var i=0; i<18; i++){ 
		for(var j=0; j<10; j++){ 
			if(area[i][j].isTaken==1){ 
				table.rows[i].cells[j].style.backgroundColor = area[i][j].color; 
			}
		} 
	}
}
//Clear the canvas by setting color to black
function cleararea(){
	for(var i=0; i<18; i++){ 
		for(var j=0; j<10; j++){ 
			table.rows[i].cells[j].style.backgroundColor = "black"; 
		} 
	}
}
//paint the active block
function paintActiveBlock(){
	for(var i = 0; i < 4; i++){ 
		table.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor=color;
	}
}
//clear the active block by setting its color to black
function clearActiveBlock(){
	for(var i = 0; i < 4; i++){ 
		table.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor="black"; 
	}
}
//Go down function. Detect if the new block reaches the bottom. Continue going down if haven't reached.
//If reaches bottom, decide if can delete a line. Score and level are updated here.
function goDown(){
	if(isBottomValid()){
		clearActiveBlock();
		for(var i = 0; i < 4; i++){
			activeBlock[i].x++;
		}
		paintActiveBlock();
	} else {
		//stop going down automatically
		clearInterval(downTimer);
		suddenInterval--;
		if (suddenInterval < 0)
			suddenInterval = 10;
		//update the area array
		for(var i=0; i<4; i++){ 
			area[activeBlock[i].x][activeBlock[i].y].isTaken=1;
			area[activeBlock[i].x][activeBlock[i].y].color=color;
		}
		//check if can delete a line
		var line = deleteLines();
		var continu;
		if(line!=0){
			//update score
			currentLevelScore = currentLevelScore + line * generateLevelIncrement();
			score = score + line * generateLevelIncrement();
			document.getElementById("p_score").innerText=" " + score;
			//update level
			continu = generateLevel();
			document.getElementById("p_level").innerText=" " + level;
			cleararea(); 
			repaintarea(); 
		}
		//generate a new block
		if(!generateNewBlock()){ 
			alert("Game over!"); 
			status = 2; 
			return; 
		} else if (continu == -1){
			alert("SUCCESS!!");
			clearInterval(downTimer);
			init();
			return;
		}
		paintActiveBlock(); 
		suddenEvent();
	} 
}
//Go left function. Detect if will collide with objects on the left.
function goLeft(){
	if(isLeftValid()){
		clearActiveBlock();
		for(var i = 0; i < 4; i++){
			activeBlock[i].y--;
		}
		paintActiveBlock();
	}
}
//Go right function. Detect if will collide with objects on the right.
function goRight(){
	if(isRightValid()){
		clearActiveBlock();
		for(var i = 0; i < 4; i++){
			activeBlock[i].y++;
		}
		paintActiveBlock();
	}
}
//Transform the shape by rotating. Calulate the middle point and then rotate the shape around it 
function transform(){
	var tmpBlock = new Array(4); 
	for(var i=0; i<4; i++){ 
		tmpBlock[i] = {x:0, y:0}; 
	} 
	for(var i=0; i<4; i++){ 
		tmpBlock[i].x = activeBlock[i].x; 
		tmpBlock[i].y = activeBlock[i].y; 
	}
	var cx = Math.round((tmpBlock[0].x + tmpBlock[1].x + tmpBlock[2].x + tmpBlock[3].x)/4); 
	var cy = Math.round((tmpBlock[0].y + tmpBlock[1].y + tmpBlock[2].y + tmpBlock[3].y)/4); 
	for(var i=0; i<4; i++){ 
		tmpBlock[i].x = cx+cy-activeBlock[i].y; 
		tmpBlock[i].y = cy-cx+activeBlock[i].x; 
	} 
	for(var i=0; i<4; i++){ 
		if(!isBlockValid(tmpBlock[i].x,tmpBlock[i].y)){ 
			return; 
		} 
	} 
	clearActiveBlock(); 
	for(var i=0; i<4; i++){ 
		activeBlock[i].x = tmpBlock[i].x; 
		activeBlock[i].y = tmpBlock[i].y; 
	}  
	paintActiveBlock(); 
}
//Delete a line function. 
//Decide whether to delete a line by going through area arrays.
//If can delete a line, update the color and produce a new line 
function deleteLines(){ 
	var lines = 0; 
	for(var i=0; i<18; i++){  
		for(var j=0; j<10; j++){ 
			if(area[i][j].isTaken==0){ 
				break; 
			} 
		} 
		if(j==10){ 
			lines++;
			if(i!=0){ 
				for(var k=i-1; k>=0; k--){ 
					for (var c=0; c<10; c++){
						area[k+1][c].isTaken = area[k][c].isTaken; 
						area[k+1][c].color = area[k][c].color;
					}
				} 
			} 
			area[0].isTaken = produceBlankLine(); 
		} 
	} 
	return lines; 
}
//Produce a new line function.
function produceBlankLine(){ 
	var line = new Array(10); 
	for(var i=0; i<10; i++){ 
		line[i] = 0; 
	} 
	return line; 
}
//check the validality of a block
function isBlockValid(x, y){ 
	if(x < 0 || x > 17 || y < 0 || y > 9){
		return false; 
	}
	if(area[x][y].isTaken==1){ 
		return false; 
	} 
	return true;
}
//check if can move left
function isLeftValid(){
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].y==0){ 
			return false; 
		} 
		if(!isBlockValid(activeBlock[i].x, activeBlock[i].y-1)){ 
			return false; 
		} 
	} 
	return true; 
}
//check if can move to right
function isRightValid(){
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].y==9){ 
			return false; 
		} 
		if(!isBlockValid(activeBlock[i].x, activeBlock[i].y+1)){ 
			return false; 
		} 
	} 
	return true; 
}
//check if can go down
function isBottomValid(){
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].x==17){ 
			return false; 
		} 
		if(!isBlockValid(activeBlock[i].x+1, activeBlock[i].y)){ 
			return false; 
		} 
	} 
	return true; 
}
//return score increment for current level
function generateLevelIncrement(){
	return level * 10;
}
//update level and values in page
function generateLevel(){
	if (currentLevelScore >= maxScoreInLevel)
	{
		level++;
		//Level reaches 11, success and end of game.
		if (level == 11){
			return -1;
		} else {
			document.getElementById("p_level").innerText = level;
			document.getElementById("hint_score").innerText = generateLevelIncrement();
			var temp = maxScoreInLevel;
			maxScoreInLevel += level*30;
			document.getElementById("hint_goal").innerText = maxScoreInLevel + temp;
			speed -=100;
			currentLevelScore = 0;
			return 1;
		}
	}
	return 1;
}
//detect the action on keyboard and assign correct functions.
document.onkeydown= function(e){
	if(state!=1){ 
		return; 
	}
	var code = e.which || e.keyCode;
	switch(code){ 
		case 37:{
			goLeft(); 
			break; 
		} 
		case 38:{ 
			transform();
			break; 
		} 
		case 39:{ 
			goRight(); 
			break; 
		} 
		case 40:{ 
			goDown(); 
			break; 
		} 
	} 
} 