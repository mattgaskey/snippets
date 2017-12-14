let cols, rows;
let grid = [];
let current;
let startIndex;
let w = 20;
let weight = 8;
let canvasWidth;
let canvasHeight;
let stack = [];
let start;
let button;
let timer, mins, secs;
let running = false;
let end = false;

function setup() {
	canvasWidth = floor(windowWidth - 200);
	canvasHeight = floor(windowHeight - 200);
	createCanvas(canvasWidth, canvasHeight);
	cols = floor(canvasWidth / w);
	rows = floor(canvasHeight / w);

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	startIndex = grid.length - 1;
	current = grid[startIndex];
	grid[0].walls[0] = false;
	grid[startIndex].walls[2] = false;

	secs = 0;
	mins = 0;

	drawStart();
	drawButton();
	drawTimer();
	noLoop();
}

function draw() {

	if (frameCount % 60 === 0) {
		incrementTime();
	}
	translate(weight, weight);
	background(51);
	grid.forEach(cell => cell.show());

	current.visited = true;
	current.highlight();
	let next = current.checkNeighbors();
	if (next) {
		next.visited = true;
		stack.push(current);
		removeWalls(current, next);
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	}
	if (end) {
		noLoop();
	}
	if (stack.length === 0) {
		end = true;
	}
}

function drawStart() {
	let cx = canvas.offsetLeft;
	let cy = canvas.offsetTop;
	start = createDiv("");
	start.position(cx + weight/2, cy - w);
	start.style('background', 'rgb(0,255,0');
	start.style('border-style', 'solid solid none solid')
  start.style('border-width', `${weight}px`);
  start.style('border-color', 'rgb(100, 200, 200)');
	start.size(w - weight, w);
}

function drawButton() {
	let cx = canvas.offsetLeft;
	let cy = canvas.offsetTop;
	button = createButton('START');
	button.position(cx/2 + canvasWidth/2 + button.width/2, cy - weight*4);
	button.mousePressed(handleStart);
}

function drawTimer() {
	let cx = canvas.offsetLeft;
	let cy = canvas.offsetTop + canvas.offsetHeight;
	timer = createDiv(`${getTimeUnits(mins)} : ${getTimeUnits(secs)}`);
	timer.position(cx/2 + canvasWidth/2 + timer/2, cy + weight*4);
	timer.style('font-size', '36px');
	timer.style('color', 'white');
}

function getTimeUnits(unit) {
	return unit < 10 ? `0${unit}` : unit;
}

function incrementTime() {
	if (secs < 60) {
		secs++;
	} else if (secs >= 60) {
		secs = 0;
		mins++;
	}
	timer.hide();
	drawTimer();
}

function handleStart() {
	if (!running) {
		loop();
	}
	running = true;
}
 
function removeWalls(a, b) {
	let x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	let y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function windowResized() {
	start.hide();
	drawStart();
}

class Cell {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.walls = [true, true, true, true];
		this.visited = false;
	}

	show() {
		let x = this.i * w;
		let y = this.j * w;
		stroke(100, 200, 200, 255);
		noFill();
		strokeWeight(weight);
		if (this.walls[0]) {
			line(x, y, x+w, y);
		}
		if (this.walls[1]) {
			line(x+w, y, x+w, y+w);
		}
		if (this.walls[2]) {
			line(x+w, y+w, x, y+w);
		}
		if (this.walls[3]) {
			line(x, y+w, x, y);
		}

		if (this.visited) {
			fill(51);
			noStroke();
			rect(x+weight/2, y+weight/2, w-weight, w-weight);
		}
	}

	highlight() {
		let x = this.i * w;
		let y = this.j * w;
		noStroke();
		fill(0, 255, 0, 255);
		ellipse(x + w/2, y + w/2, w - weight);
	}

	index(i, j) {
		if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
			return -1;
		}

		return i + j * cols;
	}

	checkNeighbors() {
		let neighbors = [
			grid[this.index(this.i, this.j-1)],
			grid[this.index(this.i+1, this.j)],
			grid[this.index(this.i, this.j+1)],
			grid[this.index(this.i-1, this.j)]
		];

		let possibles = neighbors.filter(index => index !== undefined && index.visited !== true);

		if (possibles.length > 0) {
			return random(possibles);
		} else {
			return undefined;
		}
	}
}