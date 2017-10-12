function Rain() {
	//choose random starting position for drops
  this.x = random(0, width);
  //drop should generate in top 1/4 of canvas
  this.y = random(0, height/4);

  this.update = function() {
  	//drops fall by speed coefficient
    this.y += speed;
    //animate the wind intensity (diagonal fall)
    this.x -= speed*2;
    //as drops leave x- or y-axis, reposition them on canvas
    if (this.y > height || this.x < 0) {
      this.y = random(0, height);
      this.x = random(0, width);
    }
  }

  this.show = function() {
    fill(240, 255, 255);
    ellipse(this.x, this.y, 4, 4);
  }
}