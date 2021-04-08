class Line{
	constructor(x1, y1, x2, y2, fNode, sNode){
		this.initialPos = createVector(x1, y1);
		this.finalPos = createVector(x2, y2);
		this.firstNode = fNode;
		this.secondNode = sNode;
		this.c = color(0);
	}
	
	Distance(){
		return sqrt(pow((finalPos.x-initialPos.x), 2) + pow((finalPos.y - initialPos.y), 2));
	}
	Display(){
		fill(this.c);
		line(this.initialPos.x, this.initialPos.y, this.finalPos.x, this.finalPos.y);
	}
}
