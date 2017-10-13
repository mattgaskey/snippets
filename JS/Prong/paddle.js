function Paddle(side) {
	this.length = 40;
	this.top = height/2 - this.length/2;
	this.bot = height/2 + this.length/2;
	this.speed = 8;

	this.show = function() {
		stroke(255, 0, 0);
		fill(255, 0, 0);
		strokeWeight(4);
		line(side, this.top, side, this.bot);
	}

	this.up = function() {
		if (this.top > 1) {
			this.top -= this.speed;
			this.bot -= this.speed;
		}	
	}

	this.down = function() {
		if (this.bot !== height) {
			this.top += this.speed;
			this.bot += this.speed;
		}
	}
}