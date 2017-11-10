let particles = [];
let gravity;
let emitting = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	gravity = random(-0.8, -0.2);
	noCursor();
}

function draw() {
	background(21);

	if (emitting && mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight && frameCount % 5 === 0) {
		particles.push(new Charge());
	}

	particles.reverse().forEach((charge, i) => {
		charge.update();
		charge.show();
		if (charge.particle.is_outside_canvas) {
			particles.splice(i, 1);
		}
	});
}

function mouseClicked() {
	if (emitting) {
		emitting = false;
		particles.forEach((charge, i) => {
			charge.to_explode = true;
			charge.explode();
		});
	} else {
		particles.length = 0;
		emitting = true;
	}
}

function Charge() {
	this.particle = new Particle(mouseX, mouseY, 60);
	this.to_explode = false;
	this.charges = [];

	this.update = function(x, y) {
		if (!this.to_explode) {
			this.particle.applyForce(gravity);
			this.particle.update(x, y);
		}
		this.charges.reverse().forEach((charge, i) => {
			charge.applyForce(gravity);
			charge.update();
			if (charge.is_outside_canvas) {
				this.charges.splice(i, 1);
			}
		});
	}

	this.show = function() {
		if (!this.to_explode) {
			this.particle.show();
		}
		this.charges.reverse().forEach((charge, i) => {
			charge.show();
		});
	}

	this.explode = function() {
		for (let i = 0; i < 50; i++) {
			let p = new Particle(this.particle.x, this.particle.y, this.particle.c);
			this.charges.push(p);
		}
	}
}

function Particle(x, y, c) {
	//postion
	this.x = x;
	this.y = y;
	this.is_outside_canvas = false;
	//speed
	this.vx = random(-1, 1);
	this.vy = random(-1, 1);
	this.acc = 0;
	//size
	this.c = c;
	this.shrink = random (-1, -0.01);
	//color
	this.r = random(0, 255);
	this.g = random(0, 255);
	this.b = random(0, 255);
	this.a = random(20, 80);

	this.applyForce = function(force) {
		this.acc += force;
	}

	this.update = function() {
		this.x += this.vx * this.acc;
		this.y += this.vy * this.acc;
		if (this.c > 0) {
			this.c += this.shrink;
		} else if (this.c < 0) {
			this.is_outside_canvas = true;
		}
	}

	this.show = function() {
		stroke(this.r, this.b, this.g, this.a);
		strokeWeight(this.c);
		point(this.x, this.y);
	}

}
