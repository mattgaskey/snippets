class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.prev = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.acc = createVector();
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	show() {
		stroke(100, 200, 200, 40);
		strokeWeight(2);
		line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

		this.prev.x = this.pos.x;
		this.prev.y = this.pos.y;
	}

	// f = g / d^2
	attracted(target) {
		let force = p5.Vector.sub(target, this.pos);
		let dsq = force.magSq();
		dsq = constrain(dsq, 100, 500);
		let g = 50;
		let mag = g / dsq;
		force.setMag(mag);
		this.acc.add(force);
	}
}