function Bird() {
	//set size and position of bird
	this.size = 32;
  this.y = height/2 - this.size/2;
  this.x = 100;
  
  //set physics
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  
  //render method
  this.show = function() {
    image(img_bird, this.x, this.y, this.size, this.size);
  }
  
  //bounces on spacebar
  this.up = function() {
    this.velocity += this.lift;
  }
  
  //updates per frame
  this.update = function() {
  	//accelerate the bird
    this.velocity += this.gravity;
    //mimic air pressure
    this.velocity *= 0.9;
    //drop the bird
    this.y += this.velocity;
    
    //set bounds for bottom
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    //set bounds for top
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}