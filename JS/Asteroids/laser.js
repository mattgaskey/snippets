class Laser {
	constructor(spos, heading) {
		this.pos = createVector(spos.x, spos.y);
		this.vel = p5.Vector.fromAngle(heading);
		this.vel.mult(5);
		this.isOffScreen = false;
	}

	show() {
		push();
		strokeWeight(4);
		stroke(255);
		point(this.pos.x, this.pos.y);
		pop();
	}

	update() {
		this.pos.add(this.vel);
		if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
			this.isOffScreen = true;
		}
	}

	hits(target) {
		let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
		return (d < target.r);
	}
}