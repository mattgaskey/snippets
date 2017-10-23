let paddleLeft;
let paddleRight;
let ball;
let gameFont;
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
};
let gameInit = true;

function preload() {
	gameFont = loadFont('PressStart2p-Regular.ttf');
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
    paddleLeft.reset();
    paddleRight.reset();
    score.right >= 10
      ? ((isOver = true), (winner = "This guy -->"), (inPlay = false))
      : (ball = new Ball());
    noLoop();
    inPlay = false;
  }

  if (ball.left > width) {
    score.left++;
    paddleLeft.reset();
    paddleRight.reset();
    score.left >= 10
      ? ((isOver = true), (winner = "<-- This guy"), (inPlay = false))
      : (ball = new Ball());
    noLoop();
    inPlay = false;
  }

  background(0);

  if (gameInit) {
    textSize(60);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text("PRONG!", floor(width/2), floor(height/4));
    
    textSize(20);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text("Left Paddle:\nUP: <w>\nDOWN: <s>", floor(width/5), floor(height/1.8));
    
    textSize(20);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text("Right Paddle:\nUP: <UP>\nDOWN: <DOWN> ", floor(width/1.3), floor(height/1.8));
    
    textSize(36);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text("Press ENTER to Begin", floor(width/2), floor(height - 72));
  }
  else if (!inPlay && !isOver) {
    textSize(90);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text(
      score.left + "   " + score.right,
      floor(width / 2),
      floor(height / 2 + 30)
    );
    textSize(30);
    text("Press SPACEBAR\n to Start", floor(width / 2), floor(height - 100));
  } else if (!inPlay && isOver) {
    textSize(30);
    textAlign(CENTER);
    textFont(gameFont);
    fill(255, 255, 102);
    noStroke();
    text(
      "GAME OVER\n" + winner + '\nwins!\nPress "c" to Continue',
      floor(width / 2),
      floor(height / 2 - 100)
    );
  }

  if (leftUp) {
    paddleLeft.up();
  }
  if (leftDown) {
    paddleLeft.down();
  }
  if (rightUp) {
    paddleRight.up();
  }
  if (rightDown) {
    paddleRight.down();
  }

  paddleLeft.show();
  paddleRight.show();

  ball.update();
  ball.show();
}

function keyPressed() {
  setMove(keyCode, true);
  if (key == " " && !inPlay) {
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
  if (keyCode == 13 && gameInit) {
    gameInit = false;
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
      return (leftUp = b);
    case 83:
      return (leftDown = b);
    case 38:
      return (rightUp = b);
    case 40:
      return (rightDown = b);
    default:
      return b;
  }
}