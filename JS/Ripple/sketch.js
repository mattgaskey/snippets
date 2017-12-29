let angle = 0;
let w = 25;
let ma;
let maxD;
let offset;
let size = 1000;
let zoom = size * 0.75;
let rotX;
let rotY;

function setup() {
	createCanvas(size, size, WEBGL);
	maxD = dist(0, 0, size/2, size/2);
}

function draw() {
	background(51);
	ortho(-zoom, zoom, zoom, -zoom, 0, size*2);
	rotX = map(mouseY, 0, height, HALF_PI, -HALF_PI);
	rotY = map(mouseX, 0, width, -HALF_PI, HALF_PI);


	rotateX(rotX);
	rotateY(rotY);

	for (let z = 0; z < width; z+=w) {
		for (let x = 0; x < width; x+=w) {
			push();
			let d = dist(x, z, width/2, height/2);
		  offset = map(d, 0, maxD, -PI, PI);
			let a = angle + offset;
			let h = floor(map(sin(a), -1, 1, size/25, size/2.5));
			normalMaterial();
			translate(x - width/2 + w, 0, z - height/2);
			box(w * 0.75, h, w * 0.75);
			pop();
		}
		offset += HALF_PI;
	}
	angle -= QUARTER_PI/12;
}