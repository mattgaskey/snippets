function Ammo(x, y) {
	this.size = 4;
	this.speed = 10;
	this.x = x
	this.y = y;
	this.toDelete = false;

	this.show = function() {
		fill(255);
		noStroke();
		ellipse(this.x, this.y, this.size, this.size);
	}

	this.update = function() {
		this.y -= this.speed;
	}

	this.dissolve = function() {
		this.toDelete = true;
	}

	this.hits = function(invader) {
		var d = dist(this.x, this.y, invader.x, invader.y);
		return (d < this.size / 2 + invader.size / 2);
	}
}