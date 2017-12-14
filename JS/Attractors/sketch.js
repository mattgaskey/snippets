let attractor;
let particle;
let particles = [];

function setup() {
	createCanvas(600, 600);
	for (let i = 0; i < 5; i++) {
		particles.push(new Particle(floor(random(100, width-100)), floor(random(100, height-100))));
	}
	attractor = createVector(300, 300);
	background(51);
}

function draw() {
	particles.forEach(particle => {
		particle.attracted(attractor);
		particle.update();
		particle.show();
	});
}
