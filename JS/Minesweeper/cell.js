class Cell {
	constructor(x, y, w) {
		this.mine = false;
		this.exposed = false;
		this.i = x;
		this.j = y;
		this.x = x * w;
		this.y = y * w;
		this.w = w;
		this.adjacentCount = 0;
	}

	show() {
		stroke(0);
		noFill();
		rect(this.x, this.y, this.w, this.w);

		if (this.exposed) {
			if (this.mine) {
				image(mine, this.x, this.y, this.w, this.w);
			} else {
				fill(127);
				rect(this.x, this.y, this.w, this.w);

				if (this.adjacentCount) {
					textAlign(CENTER);
					textFont('Courier New');
					textStyle(BOLD);
					textSize(15);
					switch (this.adjacentCount) {
						case 1:
							fill(0, 0, 255);
							break;
						case 2:
							fill(0, 255, 0);
							break;
						case 3:
							fill(255, 0, 0);
							break;
						case 4:
							fill(255, 0, 255);
							break;
						case 5:
							fill(127, 0, 127);
							break;
						case 6:
							fill(0, 127, 127);
							break;
						case 7:
							fill(80);
							break;
						default:
							fill(0);
							break;
					}
					text(this.adjacentCount, this.x + this.w/2, this.y + this.w/1.5);
				}
			}
		}
	}

	countAdjacent() {
		let total = 0;

		if (this.mine) {
			this.adjacentCount = -1;
			return;
		}

		for (let xoff = -1; xoff <= 1; xoff++) {
			for (let yoff = -1; yoff <= 1; yoff++) {
				let i = this.i + xoff;
				let j = this.j + yoff;
				if (i > -1 && i < cols && j > -1 && j < rows) {
					let adjacent = grid[i][j];
					if (adjacent.mine) {
						total++;
					}
				}
			}
		}

		this.adjacentCount = total;
	}
 
	contains(x, y) {
		return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
	}

	reveal() {
		this.exposed = true;
		if (this.adjacentCount == 0) {
			this.floodFill();
		}
	}

	floodFill() {
		for (let xoff = -1; xoff <= 1; xoff++) {
			for (let yoff = -1; yoff <= 1; yoff++) {
				let i = this.i + xoff;
				let j = this.j + yoff;
				if (i > -1 && i < cols && j > -1 && j < rows) {
					let adjacent = grid[i][j];
					if (!adjacent.mine && !adjacent.exposed) {
						adjacent.reveal();
					}
				}
			}
		}
	}	
}