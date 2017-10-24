function Bird() {

	this.size = 32;
  this.y = height/2 - this.size/2;
  this.x = 100;
  

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  

  this.show = function() {
    image(img_bird, this.x, this.y, this.size, this.size);
  }
  

  this.up = function() {
    this.velocity += this.lift;
  }
  

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}