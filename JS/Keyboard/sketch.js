let img_key_layout;
let keyA, keyAs, keyB, keyC, keyCs, keyD, keyDs, keyE, keyF, keyFs, keyG, keyGs;
let keys = [];


function preload() {
	img_key_layout = loadImage('key_layout.png');
}

function setup() {
	createCanvas(1000, 300);
	keyC = new Key('c', 261.63);
	keyCs = new Key('csharp', 277.18);
	keyD = new Key('d', 293.66);
	keyDs = new Key('dsharp', 311.13);
	keyE = new Key('e', 329.63);
	keyF = new Key('f', 349.23);
	keyFs = new Key('fsharp', 369.99);
	keyG = new Key('g', 392);
	keyGs = new Key('gsharp', 415.3);
	keyA = new Key('a', 440);
	keyAs = new Key('asharp', 466.16);
	keyB = new Key('b', 493.88);
}

function draw() {
	background(255);
	image(img_key_layout, 0, 0, 500, 300);
	image(img_key_layout, 500, 0, 500, 300);
}

function keyPressed() {
	switch (keyCode) {
		case 65:
			keyC.play();
			break;
		case 87:
			keyCs.play();
			break;
		case 83:
			keyD.play();
			break;
		case 69:
			keyDs.play();
			break;
		case 68:
			keyE.play();
			break;
		case 70:
			keyF.play();
			break;
		case 84:
			keyFs.play();
			break;
		case 71:
			keyG.play();
			break;
		case 89:
			keyGs.play();
			break;
		case 72:
			keyA.play();
			break;
		case 85:
			keyAs.play();
			break;
		case 74:
			keyB.play();
			break;
	}
}

function keyReleased() {
	switch (keyCode) {
		case 65:
			keyC.stop();
			break;
		case 87:
			keyCs.stop();
			break;
		case 83:
			keyD.stop();
			break;
		case 69:
			keyDs.stop();
			break;
		case 68:
			keyE.stop();
			break;
		case 70:
			keyF.stop();
			break;
		case 84:
			keyFs.stop();
			break;
		case 71:
			keyG.stop();
			break;
		case 89:
			keyGs.stop();
			break;
		case 72:
			keyA.stop();
			break;
		case 85:
			keyAs.stop();
			break;
		case 74:
			keyB.stop();
			break;
	}
}