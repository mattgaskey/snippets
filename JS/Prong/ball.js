function Ball() {
	this.size = 6;
	this.top = height/2 - this.size/2;
	this.left = width/2 + this.size/2;

	this.velocity = 3;
	this.reflectY = false;
	this.reflectX = false;

	this.vx = random(1, this.velocity);
	this.vy = random(1, this.velocity);

	this.show = function() {
		fill(255);
		stroke(255);
		strokeWeight(2);
		ellipse(this.left, this.top, this.size, this.size);
	}

	this.update = function() {
		if (this.top <= 0 || this.top >= height - this.size) {
			this.reflectY = !this.reflectY;
		}
		if ((this.left <= paddleX + 4 && this.top >= paddleLeft.top - this.size && this.top <= paddleLeft.bot + this.size) || 
				(this.left >= width - paddleX - 4 && this.top >= paddleRight.top - this.size && this.top <= paddleRight.bot + this.size)
				) {
			this.reflectX = !this.reflectX;
			console.log(this.top + 3, paddleLeft.top, paddleLeft.bot);
			if ((this.left <= paddleX + 4 && (this.top + 3 <= paddleLeft.top + 10 || this.top + 3 >= paddleLeft.bot - 10)) ||
					(this.left >= width - paddleX - 4 && (this.top + 3 <= paddleRight.top + 10 || this.top + 3 >= paddleRight.bot - 10))
					) {
				this.vx = random(1, this.velocity)*1.5;
				this.vy = random(1, this.velocity)*1.5;
			} else if (this.vx > this.velocity || this.vy > this.velocity) {
				this.vx = random(1, this.velocity);
				this.vy = random(1, this.velocity);
			}
		}

		this.reflectY ? this.top += this.vy : this.top -= this.vy;

		this.reflectX ? this.left += this.vx : this.left -= this.vx;
	}
}