function Invader(x, y) {
	this.x = x;
	this.y = y;
	this.size = 40;
	this.toDelete = false;

	this.show = function() {
		image(img_invader, this.x, this.y, this.size, this.size);
	}

	this.dissolve = function() {
		this.toDelete = true;
	}
}