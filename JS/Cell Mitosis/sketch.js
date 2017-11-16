let cells = [];
let counter = 0;
let w;
let h;

function setup() {
	w = windowWidth;
	h = windowHeight;
	createCanvas(w, h);
	for (let i = 0; i < 10; i++) {
		cells.push(new Cell());
	}
}

function draw() {
	background(0);

	cells.reverse().forEach(cell => {
		cell.show();
		cell.update();
	});

	cells.reverse().forEach((cell, i) => {
		if (cell.is_outside_canvas) {
			cells.splice(i, 1);
		}
		if (cell.should_split) {
			counter++;
			let cellA, cellB;
			if (counter % 5 === 0) {
				let randColor = 17;
				cellA = cell.split(randColor);
			} else {
				cellA = cell.split();
			}
			cellB = cell.split();
			if (cells.length < 500) {
				cells.push(cellA, cellB);
			}
			cells.splice(i, 1);
		}
	});
}

function windowResized() {
	w = windowWidth;
	h = windowHeight;
  resizeCanvas(w, h);
}