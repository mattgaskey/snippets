function Invader(x, y) {
	this.x = x;
	this.y = y;
	this.size = 30;
	this.toDelete = false;

	this.show = function() {
		fill(255);
		stroke(0);
		ellipse(this.x, this.y, this.size, this.size);
		// image(img_invader, this.x, this.y, this.size, this.size);
	}

	this.fall = function() {
		this.y += 0.5;
	}

	this.crawl = function(dir) {
		this.x += dir;
	}

	this.dissolve = function() {
		this.toDelete = true;
	}
}