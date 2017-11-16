class Cell {
	constructor(x, y, w, r, g, b, a) {
		this.x = x || random(width);
		this.y = y || random(height);
		this.w = w || random(30, 40);
		this.r = r || 255;
		this.g = g || 224;
		this.b = b || 189;
		this.a = a || floor(255 * 0.8);

		this.is_outside_canvas = false;
		this.should_split = false;
		this.vx = random(-1, 1);
		this.vy = random(-1, 1);
		this.vw = random(0.3);

		this.d = random(1);
	}

	show() {
		noStroke();
		fill(this.r, this.g, this.b, this.a);
		ellipse(this.x, this.y, this.w);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.w += this.vw * this.d;

		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.w < 1) {
			this.is_outside_canvas = true;
		}

		if (this.w > 40) {
			this.should_split = true;
		}
	}

	split(c) {
		let col = c || 0;
		let r = this.r - col;
		let g = this.g - col;
		let b = this.b - col;
		let a = this.a;
		let cell = new Cell(this.x, this.y, this.w/2, r, g, b, a);
		return cell;
	}
}