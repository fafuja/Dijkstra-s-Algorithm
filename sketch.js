let objs = [];
let lines = [];
let overObj = false;
let currentObj = null;
let currentLine = null;
let linking = false;

function setup(){
    	createCanvas(displayWidth, displayHeight);
	strokeWeight(1.5);
	objs.push(new Node(1, displayWidth/2, displayHeight/6));
	objs.push(new Node(2, displayWidth/2, displayHeight/6 + displayHeight/2))
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
	fill(0);
	textSize(25);
	text("< Dijkstra's Algorithm > \n'd' - Delete node\n'Left Mouse Button' - Create node\n'q' - Link nodes", 50, 50);
}

function mouseReleased(){
	if(!overObj && !linking){
		objs.push(new Node(0, mouseX, mouseY));
	}else{
		if(linking){	
			if(currentLine.firstNode != currentObj){
				if(currentObj != null){
					currentLine.finalPos.x = currentObj.x;
					currentLine.finalPos.y = currentObj.y;
					currentLine.secondNode = currentObj;
					//currentObj.neighbours.push(currentLine.firstNode);
					//currentLine.firstNode.neighbours.push(currentObj);
					currentObj.lines.push(currentLine);
					currentLine = null;	
					linking = false;
				}else{
					lines.pop();
					currentLine.firstNode.lines.pop();
					currentLine = null;
					linking = false;	
				}
			}
		}	
	}
}

function mouseDragged(){
	if(overObj && !linking){
		currentObj.x = mouseX;
		currentObj.y = mouseY;
		for(let i = 0; i < currentObj.lines.length; i++){
			if(currentObj.lines[i].firstNode == currentObj){
				currentObj.lines[i].initialPos.x = currentObj.x;
				currentObj.lines[i].initialPos.y = currentObj.y;
			}
			if(currentObj.lines[i].secondNode == currentObj){
				currentObj.lines[i].finalPos.x = currentObj.x;
				currentObj.lines[i].finalPos.y = currentObj.y;
			}
		}
	}
}

function keyTyped(){
	if(key === 'q'){
		if(overObj){
			linking = true;
			let line = new Line(currentObj.x, currentObj.y, mouseX, mouseY, currentObj, null);
			lines.push(line);
			currentObj.lines.push(line);
			currentLine = line;
		}else{
			linking = false;
			
		}
	}
	if(key === 'd'){
		if(overObj){
			if(currentObj.id != 1 && currentObj.id != 2){
				for(let i = 0; i < currentObj.lines.length; i++){
					for(let j = 0; j < lines.length; j++){
						if(lines[j] == currentObj.lines[i]){
							lines.splice(j, 1);
						}
					}
					if(currentObj.lines[i].firstNode == currentObj){
						for(let j = 0; j < currentObj.lines[i].secondNode.lines.length; j++){
							if(currentObj.lines[i] == currentObj.lines[i].secondNode.lines[j]){
								currentObj.lines[i].secondNode.lines.splice(j, 1);
							}
						}
					}
					if(currentObj.lines[i].secondNode == currentObj){
						for(let j = 0; j < currentObj.lines[i].firstNode.lines.length; j++){
							if(currentObj.lines[i] == currentObj.lines[i].firstNode.lines[j]){
								currentObj.lines[i].firstNode.lines.splice(j, 1);
							}
						}
					}
				}
				for(let i = 0; i < objs.length; i++){
					if(objs[i] == currentObj){
						objs.splice(i, 1);
					}
				}
			}
		}	
	}
	
	if(key === 't'){
		for(let i = objs.length - 1; i > -1; i--){
			console.log(objs[i].id + objs[i].lines);
		}
	}
}
