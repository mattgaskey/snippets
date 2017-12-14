let grid = [];
let next = [];
let dA = 1; // default 1
let dB = 0.5; // default 0.5
let feed = 0.055; // default 0.055
let k = 0.062; // default 0.062

function setup() {
	createCanvas(400, 400);

	for (let x = 0; x < width; x++) {
		grid[x] = [];
		next[x] = [];
		for (let y = 0; y < height; y++) {
			grid[x][y] = {a: 1, b: 0};
			next[x][y] = {a: 1, b: 0};
		}
	}

	let low = floor(width * 0.25);
	let high = floor(width * 0.75);

	for (i = low; i < high; i+=1) {
		for (j = low; j < high; j+=1) {
			grid[i][j].b = 1;
		}
	}
}

function draw() {
	background(51);


	for (let x = 1; x < width - 1; x++) {
		for (let y = 1; y < height - 1; y++) {
			let a = grid[x][y].a;
			let b = grid[x][y].b;
			next[x][y].a = a + 
										 (dA * laplaceA(x, y)) - 
										 (a * b * b) +
										 (feed * (1 - a));
			next[x][y].b = b + 
										 (dB * laplaceB(x, y)) + 
										 (a * b * b) -
										 ((k + feed) * b);
			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);
		}
	}
	

	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let pix = (x + y * width)*4;
			let a = next[x][y].a;
			let b = next[x][y].b;
			let c = floor((a-b)*255);
			c = constrain(c, 0, 255);
			pixels[pix + 0] = c;
			pixels[pix + 1] = c;
			pixels[pix + 2] = c;
			pixels[pix + 3] = 255;
		}
	
	}
	updatePixels();

	swap();
}

function laplaceA(x, y) {
	let sumA = 0;

	sumA += grid[x][y].a * -1;
	sumA += grid[x-1][y].a * 0.2;
	sumA += grid[x+1][y].a * 0.2;
	sumA += grid[x][y+1].a * 0.2;
	sumA += grid[x][y-1].a * 0.2;
	sumA += grid[x-1][y-1].a * 0.05;
	sumA += grid[x-1][y+1].a * 0.05;
	sumA += grid[x+1][y+1].a * 0.05;
	sumA += grid[x+1][y-1].a * 0.05;

	return sumA;
}

function laplaceB(x, y) {
	let sumA = 0;

	sumA += grid[x][y].b * -1;
	sumA += grid[x-1][y].b * 0.2;
	sumA += grid[x+1][y].b * 0.2;
	sumA += grid[x][y+1].b * 0.2;
	sumA += grid[x][y-1].b * 0.2;
	sumA += grid[x-1][y-1].b * 0.05;
	sumA += grid[x-1][y+1].b * 0.05;
	sumA += grid[x+1][y+1].b * 0.05;
	sumA += grid[x+1][y-1].b * 0.05;

	return sumA;
}

function swap() {
	let temp = grid;
	grid = next;
	next = temp;
}