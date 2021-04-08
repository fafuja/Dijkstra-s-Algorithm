let objs = [];
let lines = [];
let overObj = false;
let lol = false;
let currentObj;
let linking = false;

function setup(){
    	createCanvas(displayWidth, displayHeight);
	strokeWeight(1.5);
}

function draw(){
 	background(220); 
	for(let i = 0; i < lines.length; i++){
		lines[i].Display();
	}

	for(let i = objs.length - 1; i > -1; i--){
		objs[i].Display();
	}
	for(let i = 0; i < objs.length; i++){
		if(objs[i].CheckMouse()){
			overObj = true;
			currentObj = objs[i];
			break;		
		}else{
			currentObj = null;
			overObj = false;
		}
	}
}

function mouseReleased(){
	if(!overObj){
		objs.push(new Node("A"));
		//objs.push(new Node("B"));
		//lines.push(new Line(mouseX, mouseY, 0, 0));
		//lol = true;
	}
}

function mouseDragged(){
	if(overObj){
		currentObj.x = mouseX;
		currentObj.y = mouseY;
	}
}

function keyTyped(){
	if(keyCode === 'q'){
		if(overObj){
			linking = true;
		}else{
			linking = false;
		}
	}
}
