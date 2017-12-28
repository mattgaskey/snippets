let ship;
let asteroids = [];
let lasers = [];
let gameOver = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < 5; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw() {
	background(51);

	asteroids.reverse().forEach(asteroid => {
		asteroid.show();
		asteroid.update();
		asteroid.edges();
	});

	lasers.reverse().forEach((laser, j) => {
		laser.show();
		laser.update();
		asteroids.forEach((asteroid, i) => {
			if (laser.hits(asteroid)) {
				if (asteroid.r > 15) {
					let newAsteroids = asteroid.breakApart();
					asteroids.splice(i, 1);
					lasers.splice(j, 1);
					asteroids = asteroids.concat(newAsteroids);
				} else {
					asteroids.splice(i, 1);
					lasers.splice(j, 1);
				}
			}
		});
		if (laser.isOffScreen) {
			lasers.splice(j, 1);
		}
	});


	ship.show();
	ship.turn();
	ship.update();
	ship.boost();
	ship.edges();

	if (asteroids.length === 0) {
		gameOver = true;
	}

	if (gameOver) {
		noLoop();
		push();
		textAlign(CENTER);
		textSize(64);
		fill(100, 200, 200);
		text('YOU WIN!!!', width/2, height/2);
		pop();
	}
}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	switch (keyCode) {
		case RIGHT_ARROW:
			ship.setRotation(0.1);
			break;
		case LEFT_ARROW:
			ship.setRotation(-0.1);
			break;
		case UP_ARROW:
			ship.boosting(true);
			break;
		case 32:
			lasers.push(new Laser(ship.pos, ship.heading));
	}
}