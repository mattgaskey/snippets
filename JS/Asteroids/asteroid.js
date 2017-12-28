class Asteroid {
	constructor(loc, r) {
		if (loc) {
			this.pos = loc.copy();
		} else {
			this.pos = createVector(random(width), random(height));
		}
		this.vel = p5.Vector.random2D();

		if (r) {
			this.r = r * 0.5;
		} else {
			this.r = floor(random(15, 50));
		}
		this.total = floor(random(5, 15));
		this.offset = [];
		for (let i = 0; i < this.total; i++) {
			this.offset[i] = random(-4, 4);
		}
	}

	show() {
		push();
		noFill();
		stroke(255);
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (let i = 0; i < this.total; i++) {
			let angle = map(i, 0, this.total, 0, TWO_PI);
			let x = (this.r + this.offset[i]) * cos(angle);
			let y = (this.r + this.offset[i]) * sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE);
		pop();
	}

	update() {
		this.pos.add(this.vel);
	}

	breakApart() {
		let a = [];
		a[0] = new Asteroid(this.pos, this.r);
		a[1] = new Asteroid(this.pos, this.r);
		return a;
	}

	edges() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}
}