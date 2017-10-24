function Rain() {
  this.x = random(0, width);
  this.y = random(0, height/4);
  this.speed = 5;  // illusion of wind intensity

  this.update = function() {
    this.y += this.speed;
    this.x -= this.speed*2;
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