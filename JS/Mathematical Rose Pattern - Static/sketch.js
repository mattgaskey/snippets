let n, d, r, red, green, blue, 
		sliderN, sliderD, sliderR, sliderRed, sliderGreen, sliderBlue;


function setup() {
	createCanvas(800,	800);
	sliderN = createSlider(1, 10, 5);
	sliderD = createSlider(1, 10, 6);
	sliderR = createSlider(100, 300, 300, 5);
	sliderRed = createSlider(0, 255, 0, 5);
	sliderGreen = createSlider(0, 255, 125, 5);
	sliderBlue = createSlider(0, 255, 245, 5);
	sliderN.position(50, 20);
	sliderD.position(50, 60);
	sliderR.position(50, 100);
	sliderRed.position(585, 20);
	sliderGreen.position(585, 60);
	sliderBlue.position(585, 100);
}

function draw() {
	background(51);
	fill(255);

	n = sliderN.value();
	d = sliderD.value();
	r = sliderR.value();
	red = sliderRed.value();
	green = sliderGreen.value();
	blue = sliderBlue.value();
	let k = n / d;

	textSize(24);
	text('n', 20, 35);
	text(n, 200, 37);
	text('d', 20, 75);
	text(d, 200, 77);
	text('r', 20, 115);
	text(r, 200, 117);
	text('Red', 520, 35);
	text(red, 735, 37);
	text('Green', 500, 75);
	text(green, 735, 77);
	text('Blue', 517, 115);
	text(blue, 735, 117);

	push();
	beginShape();
	
	translate(400, 450);
	noFill();
	stroke(red, green, blue);
	for (let a = 0; a < TWO_PI * d; a += 0.02) {
		let rad = r * cos(k * a);
		let x = rad * cos(a);
		let y = rad * sin(a);
		vertex(x, y);
	}

	endShape(CLOSE);
	pop();
}