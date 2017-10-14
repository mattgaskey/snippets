let paddleLeft;
let paddleRight;
let ball;
let paddleX = 15;
let leftUp = false;
let leftDown = false;
let rightUp = false;
let rightDown = false;
let inPlay = false;
let isOver = false;
let winner;
let score = {
	left: 0,
	right: 0
}



function setup() {
	createCanvas(800, 600);
	
	paddleLeft = new Paddle(paddleX);
	paddleRight = new Paddle(width - paddleX);
	ball = new Ball();

	noLoop();
}

function draw() {

	if (ball.left < 0) {
		score.right++;
		score.right >= 10 ? 
			(isOver = true, winner = 'This guy -->', inPlay = false) :
			ball = new Ball();
		noLoop();
		inPlay = false;
	}

	if (ball.left > width) {
		score.left++;
		score.left >= 10 ? 
			(isOver = true, winner = '<-- This guy', inPlay = false) :
			ball = new Ball();
		noLoop();
		inPlay = false;
	}

	background(0);

	if (!inPlay && !isOver) {
		textSize(180);
	  textAlign(CENTER);
	  fill(255, 255, 102);
	  noStroke();
	  text(score.left + '   ' + score.right, floor(width/2), floor(height/2 + 60));
	  textSize(40);
	  text('Press SPACEBAR to Start', floor(width/2), floor(height - 100));
	} else if (!inPlay && isOver) {
		textSize(60);
		textAlign(CENTER);
		fill(255, 255, 102);
		noStroke();
		text('GAME OVER\n' + winner + '\nwins!\nPress "c" to Continue', floor(width/2), floor(height/2 - 100));
	}
	
	if (leftUp) {paddleLeft.up();}
	if (leftDown) {paddleLeft.down();}
	if (rightUp) {paddleRight.up();}
	if (rightDown) {paddleRight.down();}

	paddleLeft.show();
	paddleRight.show();

	ball.update();
	ball.show();

	
}

function keyPressed() {
  setMove(keyCode, true);
  if (key == ' ' && !inPlay) {
  	ball.update();
  	loop();
  	inPlay = true;
  }
  if (keyCode == 67 && isOver) {
  	score.left = 0;
  	score.right = 0;
  	isOver = false;
  	inPlay = false;
  	setup();
  	draw();
  }
}

function keyReleased() {
  setMove(keyCode, false);
}

function setMove(k, b) {
	switch (k) {
		case 87:
			return leftUp = b;
		case 83:
			return leftDown = b;
		case 38:
			return rightUp = b;
		case 40: 
			return rightDown = b;
		default:
			return b;
	}
}