
function Bubble(x,y) {
  //position
  this.x = x;
  this.y = y;
  //size (radius)
  this.r = 10;
  // speed
  this.vx = random(-10,10);
  this.vy = random(-10,10);
  
  this.update = function(){
    this.x += this.vx;
    this.y += this.vy;
  }
  
  this.draw = function(){
    fill(127);
    ellipse(this.x,this.y,this.r,this.r);
  }
  
  this.wall = function(){
    if (this.x < this.r || this.x > (width-this.r)){
      this.vx = this.vx*(-1);
    }
    if (this.y < this.r || this.y > (height-this.r)){
     this.vy = this.vy*(-1);
    }
  }
  
}