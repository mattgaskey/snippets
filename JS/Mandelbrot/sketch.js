let minval = -0.5;
let maxval = 0.5;

let minslider;
let maxslider;

function setup() {
	createCanvas(300, 300);
	pixelDensity(1);

	minslider = createSlider(-2.5, 0, -2.5, 0.01);
	maxslider = createSlider(0, 2.5, 2.5, 0.01);

}

function draw() {

	loadPixels();

	let maxIts = 100;

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			
			let a = map(x, 0, width, minslider.value(), maxslider.value());
			let b = map(y, 0, height, minslider.value(), maxslider.value());

			let ca = a;
			let cb = b;

			let n = 0;
			let z = 0;

			while (n < maxIts) {
				let aa = a*a - b*b;
				let bb = 2 * a * b;

				a = aa + ca;
				b = bb + cb;

				if (abs(a + b) > 2) {
					break;
				}

				n++;
			}

			let bright = map(n, 0, maxIts, 0, 255);
			// bright = map(sqrt(bright), 0, 1, 0, 255);

			if (n === maxIts) {
				bright = 0;
			}

			let pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255;
		}
	}

	updatePixels();
}