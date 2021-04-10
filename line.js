class Line{
	constructor(x1, y1, x2, y2, fNode, sNode){
		this.initialPos = createVector(x1, y1);
		this.finalPos = createVector(x2, y2);
		this.firstNode = fNode;
		this.secondNode = sNode;
		this.c = color(0, 200, 0);
		this.distance = this.Distance();
	}
	
	Distance(){
		return sqrt(pow((this.finalPos.x-this.initialPos.x), 2) + pow((this.finalPos.y - this.initialPos.y), 2));
	}
	Display(){
		this.distance = this.Distance();
		strokeWeight(0);
		textSize(15);
		text(this.Distance().toFixed(2), this.finalPos.x + (this.initialPos.x - this.finalPos.x)/2 + 10, this.finalPos.y + (this.initialPos.y - this.finalPos.y)/2 + 10)
		strokeWeight(1.5);
		stroke(this.c);
		line(this.initialPos.x, this.initialPos.y, this.finalPos.x, this.finalPos.y);
	}
}
