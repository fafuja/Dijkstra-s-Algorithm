let objs = [];
let lines = [];
let overObj = false;
let currentObj = null;
let currentLine = null;
let linking = false;
let running = false;
let unvisitedNodes = [];
let paths = [];

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
	stroke(0, 0);
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

	// Info
	strokeWeight(0);
	fill(0);
	textSize(25);
	text("< Dijkstra's Algorithm > \n'd' - Delete node\n'Left Mouse Button' - Create node\n'q' - Link nodes", 50, 50);
}

function mouseReleased(){
	if(!overObj && !linking && !running){
		objs.push(new Node(0, mouseX, mouseY));
	}else{
		if(linking){	
			if(currentLine.firstNode != currentObj){
				if(currentObj != null){
					currentLine.finalPos.x = currentObj.x;
					currentLine.finalPos.y = currentObj.y;
					currentLine.secondNode = currentObj;
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
	if(!running)
	{
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
}

function keyTyped(){
	if(key === 'q' && !running){
		if(overObj){
			if(currentObj.id != 1 && currentObj.id != 2 && currentLine == null)
			{
				linking = true;
				let line = new Line(currentObj.x, currentObj.y, mouseX, mouseY, currentObj, null);
				lines.push(line);
				currentObj.lines.push(line);
				currentLine = line;
			}
		}else{
			linking = false;
			
		}
	}
	if(key === 'd' && !running){
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
	
	if(key === 'r'){
		if(objs[0].lines.length == 0){
			console.log("Start problem");
			running = false;
			return;
		}
		if(objs[1].lines.length == 0){
			console.log("End problem");
			running = false;
			return;
		}
		
		running = true;
		for(let i = 0; i < objs.length; i++){
			if(objs[i].id == 1){
				objs[i].distance = 0;
			}else{
				objs[i].distance = Infinity;
			}
			objs[i].prevNode = null;
			objs[i].visited = false;
			unvisitedNodes[i] = objs[i];
		}
		ComputePath(objs[0]);
		unvisitedNodes = [];
		for(let i = 0; i < paths.length - 1; i++){
			GetLine(paths[i], paths[i+1]).c = color(0, 200, 50);
		}
		paths = [];
		running = false;
	}

	if(key === 't'){
		for(let i = objs.length - 1; i > -1; i--){
			console.log(objs[i].lines.length);
		}
	}
}

function ComputePath(node){
	
	for(let i = 0; i < unvisitedNodes.length; i++){
		if(node == unvisitedNodes[i]){
			unvisitedNodes.splice(i, 1);
			node.visited = true;
		}
	}
		
	if(node.id == 2){
		let u = node;
		if(u.prevNode != null || u == objs[0]){
			while(u != null){
				paths.push(u);
				u = u.prevNode;
			}
		}
		return;
	}

	let neighbours = [];

	for(let i = 0; i < node.lines.length; i++){
		if(node.lines[i].firstNode == node && node.lines[i].secondNode.visited == false){
			neighbours.push(node.lines[i].secondNode);
		}
		if(node.lines[i].secondNode == node && node.lines[i].firstNode.visited == false){ 
			neighbours.push(node.lines[i].firstNode);
		}
	}
	for(let i = 0; i < unvisitedNodes.length; i++){
		for(let j = 0; j < neighbours.length; j++){
			if(unvisitedNodes[i] == neighbours[j]){
				let temp = node.distance + LineDistance(node, neighbours[j]);
				if(temp < neighbours[j].distance){
					neighbours[j].distance = temp;
					neighbours[j].prevNode = node;
				}
			}
		}
	}
	
	let closestNode = [null, Infinity];
	for(let i = 0; i < unvisitedNodes.length; i++){
		if(unvisitedNodes[i].distance < closestNode[1]){
			closestNode[0] = unvisitedNodes[i];
		}
	}

	ComputePath(closestNode[0]);

}

function LineDistance(n1, n2){
	for(let i = 0; i < lines.length; i++){
		if(lines[i].firstNode == n1 && lines[i].secondNode == n2){
			return lines[i].distance;
		}
		if(lines[i].secondNode == n1 && lines[i].firstNode == n2){
			return lines[i].distance;
		}
	}
}

function GetLine(n1, n2){
	for(let i = 0; i < lines.length; i++){
		if(lines[i].firstNode == n1 && lines[i].secondNode == n2)
		{
			return lines[i];
		}
		if(lines[i].secondNode == n1 && lines[i].firstNode == n2)
		{
			return lines[i];
		}
	}

}
