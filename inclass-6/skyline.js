'use strict'

var sun_dx = 30;
var sun_dy = 70;
var sun_x = 50;
var sun_y = 50;
var car_x = 0;
var car_dx = 30;
var buildings = [""];
var lightColors = ['yellow', 'black']
// common size for windows
var windowSpacing = 2, floorSpacing = 3
var windowHeight = 5, windowWidth = 3
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	
	//build a building
	var build = function() { 

		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var style = blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillStyle= style
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

		//create building object and push it into a array
		var building = new Object();
		building.x = x0;
		building.y = floor - blgHeight;
		building.width = blgWidth;
		building.height = blgHeight;
		building.style = style
		buildings.push(building);
		
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= lightColors[ Math.floor(Math.random()*lightColors.length)]
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	return {
		build: build
	}
}

//get the mouse coordinate relative to the canvas instead of window
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

// paint a car
var paintCar = function(canvas){
	var c = canvas.getContext("2d");
	c.clearRect(0, 0, canvas.width, canvas.width);//clear the canvas
	//paint a image at (car_x, car_y), width: 50, height:25
	var floor = canvas.height/2
	var img = document.getElementById("car");
    var width = 50;
    var height = 25;
	c.drawImage(img, car_x, floor - height, width, height);
	//check if the car will hit the right bounds of the canvas, change the velocity if hit
	if (car_x + car_dx > canvas.width - 50 || car_x + car_dx < 0){
		car_dx = -car_dx;
	}
	//coordinate for next paint, move increase only x by dx
	car_x += car_dx;
}

//paint a sun
var paintSun = function(canvas){
	var c = canvas.getContext("2d");
	c.clearRect(0, 0, canvas.width, canvas.height);// clear the canvas 
	//paint circle at (sun_x, sun_y), radius: 20, color: yellow
	c.beginPath();
	c.arc(sun_x, sun_y, 20, 0, 2*Math.PI);
	c.fillStyle ='yellow';
	c.fill();
	//check if the new coordinate of sun will hit the bounds, change the velocity if hit
	if (sun_x + sun_dx > canvas.width - 20 || sun_x + sun_dx < 20){
		sun_dx = -sun_dx;
	}
	if (sun_y + sun_dy > canvas.height/2 -20|| sun_y + sun_dy < 20){
		sun_dy = -sun_dy;
	}
	//coordinate for next paint, move increase both x and y by dx, dy
	sun_x += sun_dx;
	sun_y += sun_dy;
}

window.onload = function() {
	var layer1 = document.getElementById("layer1");//the bottom canvas layer
	var layer2 = document.getElementById("layer2");//the middle canvas layer
	var layer3 = document.getElementById("layer3");//the front canvas layer
	
	setInterval('paintSun(layer1)', 1000);//repaint the sun every 1 second
	var app = createApp(layer2);
	document.getElementById("build").onclick = app.build;
	setInterval('paintCar(layer3)', 1000);// repaint the car every 1 second
	layer2.addEventListener("click", buildTaller);
}

// this function makes a building taller by 10px one time
function buildTaller(element){
	var c = document.getElementById("layer2").getContext("2d");
	var height = document.getElementById("layer2").height
	var width = document.getElementById("layer2").width
	var floor = height/2
	// get the mouse coordinate
	var mouse_x = getMousePos(document.getElementById("layer2"), element).x;
	var mouse_y = getMousePos(document.getElementById("layer2"), element).y;
	var i = 0;
	var b;
	// in this loop, find the building where the click happens
	for (i = 1; i < buildings.length; i++){
		b = buildings[i];
		if(mouse_x >= b.x && mouse_x <= (b.x + b.width) && mouse_y <= floor && mouse_y >= b.y){
			c.fillStyle = b.style
			c.fillRect(b.x, b.y - 10, b.width, 10);
			for (var y = floor - b.height - floorSpacing; y > floor - b.height - 10; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < b.width - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle= lightColors[ Math.floor(Math.random()*lightColors.length)]
					c.fillRect(b.x + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
			break;
		}
	}
	//replace the clicked on building with a higher one
	var building = new Object();
	building.x = b.x;
	building.y = b.y - 10;
	building.width = b.width;
	building.height = b.height + 10;
	building.style = b.style;
	buildings[i] = building;
}

