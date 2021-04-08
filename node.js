class Node{
	constructor(id){
		this.id = id;
		this.x = mouseX;
		this.y = mouseY;
		this.diameter = 60;
		this.neighbours = [];
	}
	
	CheckMouse(){
		if(sqrt(pow((mouseX-this.x), 2) + pow((mouseY-this.y), 2)) <= this.diameter/2){
			return true;
		}
		return false;
	}

	Display(){
		strokeWeight(2);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
