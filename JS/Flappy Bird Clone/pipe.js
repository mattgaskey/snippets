function Pipe() {
	this.gap = opening;
	this.middle = floor(random(height/4, 3 * height/4));
  this.top = this.middle - this.gap;
  this.bottom = height - this.middle - this.gap;

  this.x = width;
  this.w = 20;
  this.speed = 4;
  this.highlight = false;
  
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y + bird.size > height - this.bottom) {
      if (bird.x + bird.size > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
  }

  this.show = function() {
  	noStroke();
    fill(240, 255, 255);
    if (this.highlight) {
    	noStroke();
      fill(150, 10, 10);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }
  
  this.offscreen = function() {
    return (this.x < -this.w);
  }
}