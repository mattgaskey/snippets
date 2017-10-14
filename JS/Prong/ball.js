function Ball() {
	this.size = 6;
	this.top = height/2 - this.size/2;
	this.left = width/2 + this.size/2;

	this.velocity = 6;
	this.reflectY = false;
	this.reflectX = false;

	this.vx = round(random(1, this.velocity));
	this.vy = round(random(1, this.velocity));

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
		let contactLeftX = this.left <= paddleX + this.vx && this.left >= paddleX;
		let contactRightX = this.left >= width - paddleX - this.vx && this.left <= width - paddleX;
		let contactLeftY = this.top >= paddleLeft.top - this.size && this.top <= paddleLeft.bot + this.size;
		let contactRightY = this.top >= paddleRight.top - this.size && this.top <= paddleRight.bot + this.size;

		if (contactLeftX && contactLeftY) {
			this.reflectX = true;
			} else if (contactRightX && contactRightY) {
			this.reflectX = false;
			}

		let marginOfError = 10;
		let paddleLeftOffset = this.top + 3 <= paddleLeft.top + marginOfError || this.top + 3 >= paddleLeft.bot - marginOfError;
		let paddleRightOffset = this.top + 3 <= paddleRight.top + marginOfError || this.top + 3 >= paddleRight.bot - marginOfError;

		if (contactLeftX && paddleLeftOffset || contactRightX && paddleRightOffset) {
				this.vx = round(random(this.vx, this.vx*1.5));
				this.vy = round(random(this.vy, this.vy*1.5));
			} else if ((contactLeftX && !paddleLeftOffset || contactRightX && !paddleRightOffset) && 
						(this.vx > this.velocity || this.vy > this.velocity)) {
				this.vx = round(this.velocity * random(0.3, 1));
				this.vy = round(this.velocity * random(0.3, 1));
			}

		this.reflectY ? this.top += this.vy : this.top -= this.vy;
		this.reflectX ? this.left += this.vx : this.left -= this.vx;
	}

}