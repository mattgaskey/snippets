function Pipe() {
	//set gap limits
	this.gap = opening;
	//center of pipe render should be between 1/4 and 3/4 of height
	this.middle = floor(random(height/4, 3 * height/4));
	//set pipe limits
  this.top = this.middle - this.gap;
  this.bottom = height - this.middle - this.gap;

  //set pipe location
  this.x = width;
  //pipe width
  this.w = 20;
  //number of piexels to move the pipe per frame update
  this.speed = 4;
  //flag for bird hit
  this.highlight = false;
  
  //check if bird enters pipe areas
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y + bird.size > height - this.bottom) {
      if (bird.x + bird.size > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
  }
  //pipe render method
  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  //update the x location every frame
  this.update = function() {
    this.x -= this.speed;
  }
  //check to see if pipe has levft canvas area
  this.offscreen = function() {
    return (this.x < -this.w);
  }
}