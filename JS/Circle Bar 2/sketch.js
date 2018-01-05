let radiusExt = 200;
let radiusInt;
let size = 500;
let outerDots = [];
let innerDots = [];
let offset;

function setup() {
	createCanvas(size, size);
	angleMode(DEGREES);
	for (let angle = 0; angle < 360; angle += 4) {
		let outerDot = new Dot(radiusExt, angle, -1);
		outerDots.push(outerDot);
		let c = angle % 15;
		radiusInt = map(c, 15, 0, 15, 100);
		let innerDot = new Dot(radiusInt, angle, 1);
		innerDots.push(innerDot);
	}
}

function draw() {
	translate(size/2, size/2);
	background(33);
	outerDots.forEach(dot => {
		dot.update();
	});
	innerDots.forEach(dot => {
		dot.update();
	});
	for (let i = 0; i < innerDots.length; i++) {
		stroke(100, 200, 200, 100);
		strokeWeight(5);
		line(outerDots[i].x, outerDots[i].y, innerDots[i].x, innerDots[i].y);
	}
}

class Dot {
	constructor(rad, ang, c) {
		this.r = rad;
		this.a = ang;
		this.c = c;
		this.x = rad * cos(ang);
		this.y = rad * sin(ang);
	}

	show() {
		noStroke();
		point(this.x, this.y);
	}

	update() {
		this.a += 1.175 * this.c;
		this.x = this.r * cos(this.a);
		this.y = this.r * sin(this.a);
		this.show();
	}
}
