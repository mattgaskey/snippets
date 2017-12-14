let n, d, r, red, green, blue, 
		sliderN, sliderD, sliderR, sliderRed, sliderGreen, sliderBlue;
let points = [];

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
	k = n / d;

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
	
	translate(400, 450);
	
	// find a way to sequentially add a new point at the next
	// position along the arc, then update it to fade out
	// and eventually remove it


	// for (let a = 0; a < TWO_PI * d; a += 0.5) {
	// 	fill(red, green, blue);
	// 	let rad = r * cos(k * a);
	// 	let x = rad * cos(a);
	// 	let y = rad * sin(a);
	// 	points.push(new Point(x, y));
	// }

	
	pop();


}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 4;
		this.a = 255;
		this.to_delete = false;
	}

	show() {
		ellipse(this.x, this.y, this.w, this.w);
	}

	update() {
		// fade out
		// set threshold
		// set to be deleted
	}
}