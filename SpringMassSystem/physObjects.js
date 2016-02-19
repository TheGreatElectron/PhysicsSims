//>> objLib.js
//>> Version: 3.5
//>> Date: 6/01/2015


////////////////////////////////////
//************************************
//         VECTOR OBJECT
//*************************************
/////////////////////////////////////

function Vector(x, y){
  this.x = x;
  this.y = y;
}
////////////////
//basic methods
////////////////
Vector.prototype.add = function(v){
  this.x = this.x + v.x;
  this.y = this.y +v.y;
};
Vector.prototype.sub = function(v){
  this.x = this.x - v.x;
  this.y = this.y - v.y;
};
Vector.prototype.mult = function(n){
  this.x = this.x*n;
  this.y = this.y*n;
};
Vector.prototype.div = function(n){
  this.x = this.x/n;
  this.y = this.y/n;
};
/////////////////
//Special methods
/////////////////
Vector.prototype.createFrom = function(v1,v2){
  this.x = v1.x + v2.x;
  this.y = v1.y +v2.y;
};
Vector.prototype.getMag = function(){
  return sqrt(sq(this.x)+sq(this.y));
};
Vector.prototype.getAngle = function(){
  return Math.atan(this.y/this.x);
};
Vector.prototype.setMag = function(n){
  this.normalize();
  this.mult(n);
};
Vector.prototype.normalize = function(){
  var m = this.getMag();
  if(m>0){
    this.div(m);
  }
};
Vector.prototype.limit = function(lim){
  if(Math.abs(this.x) > lim && this.x < 0){
    this.x = -lim;
  }
  else if(Math.abs(this.x) > lim && this.x > 0){
    this.x = lim;
  }

  if(Math.abs(this.y) > lim && this.y < 0){
    this.y = -lim;
  }
  else if(Math.abs(this.y) > lim && this.y > 0){
    this.y = lim;
  }
};
Vector.prototype.random2D = function(){
  this.x = random(-100,100);
  this.y = random(-100,100);
  this.normalize();
};
Vector.prototype.get = function(){
  var sam = new Vector(this.x,this.y);
  return sam;
};
Vector.prototype.rotate = function(v,a){
  var ca = cos(a);
  var sa = sin(a);
  return new Vector(ca*v.x - sa*v.y, sa*v.x + ca*v.y)
};

//////////////////
//Static Functions
///////////////////
Vector.add = function(v,u){
  var vect = new Vector(v.x+u.x,v.y+u.y);
  return vect;
};
Vector.sub = function(v,u){
  var vect = new Vector(v.x-u.x,v.y-u.y);
  return vect;
};
Vector.mult = function(v,u){
  var vect = new Vector(v.x*u,v.y*u);
  return vect;
};
Vector.div = function(v,u){
  var vect = new Vector(v.x/u,v.y/u);
  return vect;
};
Vector.getVal = function(v){
  var sam = new Vector(v.x,v.y);
  return sam;

};


////////////////////////////////////
//************************************
//           Mover Object
//*************************************
/////////////////////////////////////
function Mover(position, velocity, acceleration, m, color){
  this.position = new Vector(position.x, position.y);
  this.velocity = new Vector(velocity.x, velocity.y);
  this.acceleration = new Vector(acceleration.x, acceleration.y);
  this.limit = 20;
  this.mass = m;
  this.color = color;
  this.size = this.mass;

  this.tail = false;
  this.tailA = [];
  //sets up angular variables for rotations
  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0;
}
Mover.prototype.get = function(){
  var bob = new Mover(this.position,this.velocity,this.acceleration);
  return bob;
};
Mover.get = function(m){
  var bob = new Mover(m.position, m.velocity, m.acceleration);
  return bob;
};
Mover.prototype.update = function(){
  if(this.tail === true){
    this.tailA.push(Vector.getVal(this.position));
  }


  this.velocity.add(this.acceleration);
  this.velocity.limit(this.limit);
  this.position.add(this.velocity);
  this.acceleration.mult(0);


  var hCut = 70;
  if(this.tailA.length > hCut){
    this.tailA = this.tailA.slice(-1 * hCut);
  }

  //handles angular momentum
  this.aVelocity += this.aAcceleration;
  this.angle += this.aVelocity;
};
Mover.prototype.display = function(){

  stroke(0);


  ellipse(this.position.x,this.position.y,this.size,this.size);

  if(this.tail === true){
   fill(0,0,0,0);
    for(var i = 0; i < this.tailA.length; i++){
      ellipse(this.tailA[i].x,this.tailA[i].y,4,4);
    }
  }
};
Mover.prototype.applyForce = function(force){
  var f = force.get();
  f.div(this.mass);
  this.acceleration.add(f);
};
//Behaviors
Mover.prototype.wrapEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};
Mover.prototype.bounceEdges = function(){
  if(this.position.x < 0){
    this.velocity.x *= -1;
    this.position.x = 0;

  }
  if(this.position.x > width){
    this.velocity.x *= -1;
    this.position.x = width;
  }

  if(this.position.y < 0){
    this.velocity.y *= -1;
    this.position.y = 0;

  }
  if(this.position.y > height){
    this.velocity.y *= -1;
    this.position.y = height;
  }
};
Mover.prototype.towardMouse = function(a){
  var mouse = new Vector(mouseX,mouseY);
  var dir = Vector.sub(mouse,this.position);
  dir.normalize();
  dir.mult(a);
  this.acceleration = dir;
};

////////////////////////////////////
//************************************
//           Liquid Object
//************************************
/////////////////////////////////////
var Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};
Liquid.prototype.display = function() {
  noStroke();
  fill(0,150,200);
  rect(this.x, this.y, this.w, this.h);
};
Liquid.prototype.contains = function(m) {
    var p = m.position;
    return p.x > this.x && p.x < this.x + this.w &&
         p.y > this.y && p.y < this.y + this.h;
};
Liquid.prototype.calculateDrag = function(m) {
  // Magnitude is coefficient * speed squared
  var speed = m.velocity.getMag();
  var dragMagnitude = this.c * speed * speed;

  // Direction is inverse of velocity
  var dragForce = m.velocity.get();
  dragForce.mult(-1);

  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};

////////////////////////////////////
//************************************
//           Arrow Object
//************************************
/////////////////////////////////////

function Arrow(origin, vEndPoint){

  this.origin = origin.get();
  this.target = vEndPoint.get();

  //control handles
  this.grab = true;
  this.drag = true;
  this.showComponents = true;
  this.showAngle = true;


  this.selected = false;
  this.dragSelected = false;

  //mouse old coordinates for transalation
  this.oldX = 0;
  this.oldY = 0;

}


Arrow.prototype.display = function(s){

  push();//new drawing state
  noStroke();
  //draw arrow
  var d = dist(this.origin.x,this.origin.y,this.target.x,this.target.y);
  var w = 18;
  translate(this.origin.x,this.origin.y);
  var angle = angCalc(this);

  rotate(angle);

  //draw arrow
  drawArrow(w,d,this);

  pop();//reset drawing state

  //draw axis
  if(this.showComponents === true){
    push();
    stroke(255,0,0);
    fill(255,0,0);
    textSize(18);
    //strokeWeight(4);
    line(this.origin.x, this.origin.y, this.target.x, this.origin.y);
    //text("X: " + (Math.round(this.target.x-this.origin.x)).toString(), this.target.x,this.origin.y);
    stroke(0,0,255);
    fill(0,0,255);
    line(this.origin.x, this.origin.y, this.origin.x, this.target.y);
      pop();
    //text("Y: " + (Math.round(-1*(this.target.y-this.origin.y))).toString(), this.origin.x, this.target.y);
  }

  //push();
};
Arrow.prototype.update = function(){
  if(this.selected){
    this.target.x = mouseX;
    this.target.y = mouseY;
  }
  else if(this.dragSelected){
    if(this.oldX !== mouseX && this.oldX !== 0){
      this.target.x += mouseX - this.oldX;
      this.origin.x += mouseX - this.oldX;
    }
    if(this.oldY !== mouseY && this.oldY !== 0){
      this.target.y += mouseY - this.oldY;
      this.origin.y += mouseY - this.oldY;
    }
    this.oldX = mouseX;
    this.oldY = mouseY;
  }


};
Arrow.prototype.boundChk = function(){

  //using circles to approximate
  var res = 100;
  var slope = (this.origin.y - this.target.y)/(this.origin.x - this.target.x);
  var t;
  for(var i = 0; i < res; i++){
    t = i*slope;
    var v = new Vector(i,t);
    v.add(this.origin);
    if(dist(mouseX,mouseY,v.x,v.y) < 7){
      return true;
    }
  }
  return false;

  //Line method
  //check if points are inline

  //if(arrow.origin.y == arrow.target.y){

  //}
  //else{

  //}

};
function drawArrow(thickness,length,arrow){
  //draw the arrow itself
  translate(0,-thickness/2);
  rect(0, thickness/4, length, thickness/2);
  triangle(length, 0, length, thickness, length+15, thickness/2);

  //draw handle
  if(arrow.grab === true){
    var d = dist(arrow.target.x,arrow.target.y,mouseX,mouseY);
    if(d < 6){

      if(mouseIsPressed){
        arrow.selected = true;
        fill(255, 255, 0, 150);
      }
      else{
        arrow.selected = false;
        fill(255,255,255,200);
      }

    }
    else{
      noFill();
    }

    strokeWeight(2);
    stroke(0);
    ellipse(length,thickness/2, 12,12);

    //drag handle
    if(arrow.drag === true){

      if(arrow.boundChk()){

        if(mouseIsPressed){
          arrow.dragSelected = true;
          arrow.oldX = mouseX;
          arrow.oldY = mouseY;
          fill(255,255,0,100);
        }
        else{
          arrow.dragSelected = false;
          fill(255,255,255,100);
          this.oldX = 0;
          this.oldY = 0;
        }

      }
      else{
        noFill();
      }




    if(arrow.selected && arrow.dragSelected){
      arrow.dragSelected = false;
    }

    }
  }
}


function angCalc(arrow){
  //angleMode(DEGREES);
  return atan2(arrow.target.y-arrow.origin.y,arrow.target.x-arrow.origin.x);
}
