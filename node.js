class Node{
	constructor(id, x, y){
		this.id = id;
		this.x = x;
		this.y = y;
		this.diameter = 60;
		this.lines = [];
		this.visited = false;
		this.c = this.CheckColor();
		this.distance = null;
		this.prevNode = null;
	}
	
	CheckMouse(){
		if(sqrt(pow((mouseX-this.x), 2) + pow((mouseY-this.y), 2)) <= this.diameter/2){
			return true;
		}
		return false;
	}

	CheckColor(){
		if(this.id == 1){
			return color(0,200,100);
		}else{
		
			if(this.id == 2){
				return color(200,50,0);
			}
			return color(255,255,255);
		}
	}

	Display(){
		
		fill(this.c);
		strokeWeight(1.5);
		stroke(0);
		ellipse(this.x, this.y, this.diameter, this.diameter);
		strokeWeight(0.3);
		if(this.id == 1){
			fill(0);
			textSize(13);
			text("Start", this.x-10, this.y);
		}
		if(this.id == 2){
			fill(0);
			textSize(13);
			text("End", this.x-10, this.y);
		}
	}
}
