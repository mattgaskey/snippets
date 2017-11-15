let cnv;
let grid;
let cols;
let rows;
let cellSize = 25;
let mine;
let totalMines = 30;
let options = [];

function preload() {
	mine = loadImage('mine.png');
}

function setup() {
	cnv = createCanvas(401, 501);
	cnv.parent('sketch-container');
	cols = floor(width/cellSize);
	rows = floor(height/cellSize);
	grid = make2DArray(cols, rows);

	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y] = new Cell(x, y, cellSize);
		}
	}

	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			options.push([x, y]);
		}
	}

	for (let n = 0; n < totalMines; n++) {
		let index = floor(random(options.length));
		let x = options[index][0];
		let y = options[index][1];
		options.splice(index, 1);
		grid[x][y].mine = true;
	}

	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].countAdjacent();
		}
	}
}

function draw() {
	background(255);

	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}

function gameOver() {
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].exposed = true;
		}
	}
}

function mousePressed() {
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			if (grid[x][y].contains(mouseX, mouseY)) {
				grid[x][y].reveal();

				if (grid[x][y].mine) {
					gameOver();
				}
			}
		}
	}
}

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows)
	}
	return arr;
}