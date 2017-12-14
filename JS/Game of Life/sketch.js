let grid;
let w, h, s;

function setup() {
	createCanvas(600, 400);
	s = 2;
	w = width / s;
	h = height / s;
	grid = make2DArray(w, h);

	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			grid[i][j] = floor(random(2));
		}
	}
}

function draw() {
	background(0);

	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			let x = i * s;
			let y = j * s;
			if (grid[i][j] === 1) {
				fill(255);
				noStroke();
				rect(x, y, s, s);
			}
		}
	}

	let next = make2DArray(w, h);

	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			let state = grid[i][j];
			
			let neighbors = countNeighbors(grid, i, j);
			if (state === 0 && neighbors === 3) {
				next[i][j] = 1;
			} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
				next[i][j] = 0;
			} else {
				next[i][j] = state;
			}
		}
	}
	
	grid = next;

}

function countNeighbors(arr, x, y) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let col = (x + i + w) % w;
			let row = (y + j + h) % h;
			sum += arr[col][row];
		}
	}
	sum -= arr[x][y];
	return sum;
}

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}