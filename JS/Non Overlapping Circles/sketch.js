let circles = [];
let protection = 0;

function setup() {
	createCanvas(600, 600);
	background(51);

	while(circles.length < 250) {
		let circle = {
			x: random(width),
			y: random(height),
			r: random(6, 48)
		};

		let overlap = false;


		for (let j = 0; j < circles.length; j++) {
			let prev = circles[j];
			let d = dist(circle.x, circle.y, prev.x, prev.y);
			if (d < circle.r + prev.r) {
				overlap = true;
				break;
			}
		}
		if (!overlap) {
			circles.push(circle);
		}
		protection++;
		if (protection > 10000) {
			console.log('ouch!');
			break;
		}
	}

	for (let i = 0; i < circles.length; i++) {
		fill(100, 200, 200, 100);
		noStroke();
		ellipse(circles[i].x, circles[i].y, circles[i].r*2);
	}
}

function draw() {	


}