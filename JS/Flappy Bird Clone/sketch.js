let bird;
let pipes = [];
let raindrops = [];
let img_bird;
let score = -2;
let highScore = 0;
let isDead = false;
let frames = 80;
let scoreThreshold = 5;
let opening = 100;
let full = false;



function preload() {
	img_bird = loadImage('bird.png');
}

function setup() {
	let w = full ? displayWidth : 400;
	let h = full ? displayHeight : 600;

  createCanvas(w, h);

  for (var i = 0; i < 1000; i++) {
    raindrops[i] = new Rain();
  }

  bird = new Bird();

  noLoop();
} 

function draw() {
	if (frameCount % frames === 0 && isDead === false) {
		score++;
	}
	//make the game harder as the player crosses each score threshold
	if (score !== 0 && score % scoreThreshold === 0) {
		if (frameCount % frames * scoreThreshold === 0) {
			opening -= 10;
			opening = constrain(opening, 50, 100);
		}
	}

  background(0);

  //draw the rain field with drops(n) where n = score*2
  for (var i = 0; i < (score)*2; i++) {
    raindrops[i].update();
    raindrops[i].show();
  }

  if (frameCount % frames/1.5 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i > 0; i--) {

  	if (!isDead) {
  		pipes[i].update();
  	}
    pipes[i].show();
    

    if (pipes[i].hits(bird)) {
      isDead = true;

      if (bird.y >= height) {
      	die();
      }
    }

    if (pipes.length > 0 && pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  
  bird.update();
  bird.show();
  

  if (score > 0) {
	  textSize(60);
	  textStyle(BOLD);
	  textAlign(CENTER);
	  fill(255, 255, 102);
	  text(score, floor(width/2), floor(height/8));
	 }
  
	textSize(20);
	textStyle(BOLD);
	textAlign(RIGHT);
	fill(255, 255, 102);
	text(`Record: ${score > highScore ? score : highScore}`, floor(width - 10), 30);
  
}

function die() {
	noLoop();
	isDead = false;
	if (score > highScore) {
		highScore = score;
	}
	score = -2;
	opening = 100;
	setup();
	pipes = [];
	bird.y = height/2;
	draw();
}

function keyPressed() {
  if (key == ' ' && !isDead) {
  	loop();
    bird.up();
  }
}


function touchEnded() {
	if (!isDead && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		loop();
		bird.up();
	}
	return false;
}