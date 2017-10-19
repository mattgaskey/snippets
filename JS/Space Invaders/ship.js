function Ship() {
	this.x = width/2;
	this.size = 30;
	this.speed = 4;

	this.show = function() {
		fill(255);
		noStroke();
		triangle(
			this.x, height - 30,
			this.x - 30/2, height,
			this.x + 30/2, height
		);
	}

	this.move = function(dir) {
		if (this.x > this.size - 5) {
			this.x += dir;
		} else {
			this.x = this.size - 5;
		}
		if (this.x < width - this.size/2) {
			this.x += dir;
		} else {
			this.x = width - this.size/2;
		}
	}
}