class Line{
	constructor(x1, y1, x2, y2){
		this.initialPos = createVector(x1, y1);
		this.finalPos = createVector(x2, y2);
	}
	
	Distance(){
		return sqrt(pow((finalPos.x-initialPos.x), 2) + pow((finalPos.y - initialPos.y), 2));
	}
	Display(){
		line(this.initialPos.x, this.initialPos.y, this.finalPos.x, this.finalPos.y);
	}
}
