let bubbles = [];

function setup() {
	createCanvas(600, 400);
	for (let i = 0; i < 100; i++) {
		let d = floor(random(10, 20));
		let x = floor(random(d, width - d));
		let y = floor(random(d, height - d));
		bubbles[i] = new Bubble(x, y, d);
	}
}

function draw() {
	background(21);
	for (let el of bubbles) {
		el.move();
		el.show();
		let overlapping = false;

		for (let other of bubbles) {
			if (el !== other && el.touches(other)) {
				overlapping = true;
			}
		}

		overlapping ? el.changeMyColor(100) : el.changeMyColor(0);
	}
	
}

class Bubble {
	constructor(x, y, r = 50) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.a = 0;

		this.vx = random(-5, 5);
		this.vy = random(-5, 5);
	}

	touches(target) {
		let d = dist(this.x, this.y, target.x, target.y);
		return (d < this.r + target.r);
	}

	changeMyColor(color) {
		this.a = color;
	}

	show() {
		stroke(255);
		strokeWeight(3);
		fill(255, this.a);
		ellipse(this.x, this.y, this.r*2);
	}

	move() {
		let d = this.r;

		if (this.x < d || this.x > width - d) {
			this.vx *= -1;
		}

		if (this.y < d || this.y > height - d) {
			this.vy *= -1;
		}

		this.x += this.vx;
		this.y += this.vy;
	}
}