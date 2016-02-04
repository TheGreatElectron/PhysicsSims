//
function Bubble(position,velocity) {

  this.pos = position;
  this.vel = velocity;
  this.acc = createVector(0,0);
  
  topspeed = 10;
  
  //size (diameter)
  this.d = 10;
  
  //update function
  this.update = function(mouseGrav,arrayBubbles){
    var force = createVector(0,0);
    for (var i=0; i<arrayBubbles.length;i++){
      var dir = p5.Vector.sub(arrayBubbles[i].pos,this.pos);
      dir.normalize();
      //dir = dir.mult(5/(arrayBubbles[i].pos.dist(this.pos)))
      force.add(dir);
    }
    force.div(arrayBubbles.length);
    
    if(mouseGrav){
      var mouse = createVector(mouseX,mouseY);
      var dir = p5.Vector.sub(mouse,this.pos);
      dir.normalize();
      //dir = dir.mult(20/(mouse.dist(this.pos)))
      force.add(dir);
    }
    
    force.normalize();
    force.mult(0.5);
    this.acc = force;
    
    this.vel.add(this.acc);
    this.vel.limit(topspeed);
    this.pos.add(this.vel);
  };
  
  //draws the bubbles
  this.create = function(){
    fill(127);
    ellipse(this.pos.x,this.pos.y,this.d,this.d);
  };
  
  //bubble bounce off of the walls
  this.wall_bounce = function(){
    if (this.pos.x < 0 || this.pos.x > width){
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y < 0 || this.pos.y > height){
     this.vel.y = this.vel.y * -1;
    }
  };
  
  //bubbles wrap around the window
  this.wall_wrap = function(){
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
 
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  };
  
  //The go function takes care of everything 
  //parameter controlls edge behavior(0=none 1=bounce 2=wrap)
  this.go = function(behavior,mouseGrav,balls){
    this.update(mouseGrav,balls);
    if(behavior==1){
      this.wall_bounce();
    } else if (behavior==2){
      this.wall_wrap();
    }
    this.create();
  };
  
};