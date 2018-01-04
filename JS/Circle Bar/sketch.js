let outerDots = [];
let innerDots = [];
let size = 600;

function setup() {
	createCanvas(size, size);
	angleMode(DEGREES);
	noStroke();
	noFill();

	for (let i = 0; i < 360; i += 12) {
		let x = new Dot(size*-2, i, 1);
		let y = new Dot(size*0.6, i, -1);
		outerDots.push(x);
		innerDots.push(y);
	}
}

function draw() {
	background(33);
	translate(size/2, size/2);

	outerDots.forEach(dot => {
		dot.update();
		dot.show();
	});
	innerDots.forEach(dot => {
		dot.update();
		dot.show();
	});

	for (let i = 0; i < outerDots.length; i++) {
		push();
		blendMode(OVERLAY);
		strokeWeight(size*0.45);
		stroke(100, 200, 200, 40);
		line(outerDots[i].x, outerDots[i].y, innerDots[i].x, innerDots[i].y);
		pop();
	}
}

class Dot {
	constructor(d, a, c) {
		this.d = d;
		this.a = a;
		this.c = c;
		this.r = (width - this.d)/2;
		this.x = this.r * cos(this.a);
		this.y = this.r * sin(this.a);
	}

	show() {
		arc(0, 0, width - this.d, height - this.d, this.a, this.a);
	}

	update() {
		this.a += 1 * this.c;
		this.x = this.r * cos(this.a);
		this.y = this.r * sin(this.a);

	}

}