let particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
}

function draw() {
	background(0);
	if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight && frameCount % 5 === 0) {
		let p = new Particle();
		particles.push(p);
	}
	particles.forEach((particle, i) => {
		particle.update();
		particle.show();
		if (particle.is_outside_canvas) {
			particles.splice(i, 1);
		}
	});
}

class Particle {

	constructor() {
		//position
		this.x = mouseX;
		this.y = mouseY;
		this.is_outside_canvas = false;
		//speed
		this.vx = random(-1, 1);
		this.vy = random(-1, 1);
		this.accel = random(2, 6);
		//size
		this.c = 60;
		this.shrink = random(-1, -0.01);
		//color
		this.r = random(0, 255);
		this.g = random(0, 255);
		this.b = random(0, 255);
		this.a = random(20, 80);
	}

	show() {
		noStroke();
		fill(this.r, this.g, this.b, this.a);
		ellipse(this.x, this.y, this.c);
	}

	update() {
		this.x += this.vx * this.accel;
		this.y += this.vy * this.accel;
		if (this.c > 0) {
			this.c += this.shrink;
		}
		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			this.is_outside_canvas = true;
		} 
	}


}