class Ship {
	constructor() {
		this.pos = createVector(width/2, height/2);
		this.vel = createVector();
		this.r = 20;
		this.heading = 0;
		this.rotation = 0;
		this.isBoosting = false;
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI/2);
		fill(51);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		pop();
	}

	update() {
		this.pos.add(this.vel);
		this.vel.mult(0.99);
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
 
	boosting(b) {
		this.isBoosting = b;
	}

	boost() {
		let force = p5.Vector.fromAngle(this.heading);
		force.mult(0.2);
		if (this.isBoosting) {
			this.vel.add(force);
		} else {
			return;
		}
		
	}

	setRotation(a) {
		this.rotation = a;
	}

	turn() {
		this.heading += this.rotation;
	}
}