let bird;
//array to store generated pipes until they are off the screen
let pipes = [];
//vars to store image locations
let img_bird;

let score = 0;
//game flag
let isDead = false;
//store framerate
let frames = 80;
//score needed to move to next level
let scoreThreshold = 5;
//size of opening between pipes
let opening = 100;


function preload() {
	//load images to be used on canvas
	img_bird = loadImage('bird.png');
}

function setup() { 
	//make a canvas with w,h
  createCanvas(400, 600);
  //set the frameRate, default=60
  frameRate(60);
  
  //add a pipe to the array
  pipes.push(new Pipe());
  pipes.push(new Pipe());
  //instance of the bird
  bird = new Bird();

  //wait for input to start
  noLoop();
} 

function draw() {
	//if bird crosses pipe without dying, increase score
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

	//set the background color or image
  background(0);

  //add new pipes as the frames progress
  if (frameCount % frames/1.5 === 0) {
    pipes.push(new Pipe());
  }
  //loop over the pipes array
  for (let i = pipes.length - 1; i > 0; i--) {
  	//if the player dies, don't update the next pipe
  	if (!isDead) {
  		pipes[i].update();
  	}
    pipes[i].show();
    
    //if bird hits pipe game over
    if (pipes[i].hits(bird)) {
      isDead = true;
      // noLoop();
    }
    //as pipes leave the screen, remove them from the array
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  
  bird.update();
  bird.show();
  
  //score display
  textSize(60);
  textStyle(BOLD);
  textAlign(CENTER);
  fill(255, 255, 102);
  text(score, floor(width/2), floor(height/8));
  
  
}

function keyPressed() {
	//when player is alive, spacebar starts game and bounces bird
  if (key == ' ' && !isDead) {
  	loop();
    bird.up();
  }
}