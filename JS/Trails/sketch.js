let particle1, particle2;
let d = 20;
let k = 30;
let cs = d * k;

function setup() {
	createCanvas(cs, cs);
	particle1 = new Particle(width/2, height/2, 1);
	particle2 = new Particle(width/2, height/2, -1);
}

function draw() {
	background(21);	

	particle1.update();
	particle2.update();
	particle1.show();
	particle2.show();
}

class Particle {
	constructor(x, y, a) {
		this.pos = createVector(x, y);
		this.vx = 19;
		this.vy = 8;
		this.a = a;

		this.max = floor(Math.sqrt(this.vx * this.vy) * k) + 1;

		this.history = [];
	}

	update() {
		let v = createVector(this.pos.x, this.pos.y);
		this.history.push(v);

		if (this.history.length > this.max + 1) {
			this.history.splice(0, 1);
		}
		
		this.pos.x += (this.vx * this.a);
		this.pos.y += this.vy;

		if (this.pos.x < d || this.pos.x > width - d) {
			this.vx *= -1;
		}
		if (this.pos.y < d || this.pos.y > height - d) {
			this.vy *= -1;
		}

	}

	show() {
		noStroke();
		fill(100, 200, 200, 120);
		// ellipse(this.pos.x, this.pos.y, 30);

		this.history.forEach(pos => ellipse(pos.x, pos.y, d*0.5));
	}
}