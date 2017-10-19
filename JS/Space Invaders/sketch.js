let ship;
let invaders = [];
let ammos = [];
let img_invader;
let leftDown = false;
let rightDown = false;
let spaceDown = false;
let score = 0;
let waveCount = 4;
const randNumber = function () {
	return round(random(4, 14));
};

function preload() {
	img_invader = loadImage('invader.png');
}

function setup() {
	createCanvas(1000, 800);
	ship = new Ship();
	attack(randNumber());
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
				score += 10;
			}
		}
	}

	for (let i = 0; i < invaders.length; i++) {
		invaders[i].show();
		invaders[i].fall();
	}

	for (let i = 0; i <= waveCount; i++) {
		if (frameCount % 120 === 0) {
			attack(randNumber());
		}
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

	if (spaceDown && frameCount % 10 === 0) {
		let ammo = new Ammo(ship.x, height - ship.size);
		ammos.push(ammo);
	}
}

function attack(rand) {
	for (let i = 0; i <= rand; i ++) {
		invaders.push(new Invader(i * 60 + 60, 30));
	}
}

function keyPressed() {
	switch (keyCode) {
		case RIGHT_ARROW:
			return rightDown = true;
		case LEFT_ARROW:
			return leftDown = true;
		case 32:
			return spaceDown = true;
	}
}

function keyReleased() {
	switch (keyCode) {
		case RIGHT_ARROW:
			return rightDown = false;
		case LEFT_ARROW:
			return leftDown = false;
		case 32:
			return spaceDown = false;
	}
}