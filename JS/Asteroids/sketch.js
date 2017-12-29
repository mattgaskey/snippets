let ship;
let asteroids = [];
let lasers = [];
let roundOver = false;
let turnRight = false;
let turnLeft = false;
let thrust = false;
let shoot = false;
let score = 0;
let prevScore = 0;
let round = 1;
let shotsFired = 0;
let accuracy;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < 2 + round; i++) {
		asteroids.push(new Asteroid());
	}
	prevScore = score;
	shotsFired = 0;
}

function draw() {
	background(51);

	if (roundOver) {
		noLoop();
		accuracy = floor((score - prevScore) / shotsFired * 100);
		push();
		textAlign(CENTER);
		textSize(36);
		fill(100, 200, 200);
		text('Round ' + round + ' complete\nwith ' + accuracy + '% accuracy\n\nPress N to continue', width/2, height/2 - 72);
		pop();
	}

	push();
	textSize(48);
	fill(100, 200, 200);
	text('SCORE: ' + score, 20, 60);
	text('ROUND ' + round, width - 250, 60);
	pop();

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
				score++;
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
		roundOver = true;
	}

	if (turnRight) {
		ship.setRotation(0.1);
	}
	if (turnLeft) {
		ship.setRotation(-0.1);
	}
	if (thrust) {
		ship.boosting(true);
	}
	if (shoot && frameCount % 8 === 0) {
		shotsFired++;
		lasers.push(new Laser(ship.pos, ship.heading));
	}
}

function keyReleased() {
  setMove(keyCode, false);
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
  setMove(keyCode, true);

  if (roundOver) {
  	if (keyCode === 78) {
  		roundOver = false;
  		round++;
  		lasers.length = 0;
  		setup();
  		loop();
  	}
  }
}

function setMove(k, b) {
  switch (k) {
    case RIGHT_ARROW:
      return (turnRight = b);
      break;
    case LEFT_ARROW:
      return (turnLeft = b);
      break;
    case UP_ARROW:
      return (thrust = b);
      break;
    case 32:
      return (shoot = b);
      break;
    default:
      return b;
      break;
  }
}