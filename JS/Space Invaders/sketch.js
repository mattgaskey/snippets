let ship;
let invaders = [];
let ammos = [];
let img_invader;
let leftDown = false;
let rightDown = false;

function preload() {
	img_invader = loadImage('invader.png');
}

function setup() {
	createCanvas(1000, 800);
	ship = new Ship();
	for (let i = 0; i <= 20; i ++) {
		invaders.push(new Invader(i*40+20, 40));
	}
}

function draw() {
	background(0);
	ship.show();

	for (let i = 0; i < ammos.length; i++) {
		ammos[i].show();
		ammos[i].update();
		if (ammos[i].y < 0) {
			ammos[i].dissolve();
		}
		for (let j = 0; j < invaders.length; j++) {
			if (ammos[i].hits(invaders[j])) {
				ammos[i].dissolve();
				invaders[j].dissolve();
			}
		}
	}

	for (let i = 0; i < invaders.length; i++) {
		invaders[i].show();
	}

	for (let i = ammos.length - 1; i >= 0; i--) {
		if (ammos[i].toDelete) {
			ammos.splice(i, 1);
		}
	}

	for (let i = invaders.length - 1; i >= 0; i--) {
		if (invaders[i].toDelete) {
			invaders.splice(i, 1);
		}
	}

	if (leftDown) {
		ship.move(-ship.speed);
	}

	if (rightDown) {
		ship.move(ship.speed);
	}
}

function keyPressed() {
	switch (keyCode) {
		case RIGHT_ARROW:
			return rightDown = true;
		case LEFT_ARROW:
			return leftDown = true;
		case 32:
			let ammo = new Ammo(ship.x, height - ship.size);
			ammos.push(ammo);
	}
}

function keyReleased() {
	switch (keyCode) {
		case RIGHT_ARROW:
			return rightDown = false;
		case LEFT_ARROW:
			return leftDown = false;
	}
}