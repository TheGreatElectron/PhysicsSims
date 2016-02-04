var bubbles = [];
var num_bubbles = 20;

var mouseGrav = false;

function setup() {
  createCanvas(800, 500);
  for (var i=0; i<num_bubbles; i++){
    var position = createVector(random(0,width),random(0,height));
    var velocity = createVector(random(-5,5),random(-5,5));
    bubbles[i] = new Bubble(position,velocity);
  }
  
  
  var slider = createSlider(0,10,5);
  slider.position(20,470);
}

function draw() {
  background(0);
  for (var i=0; i<bubbles.length; i++){
    bubbles[i].go(2,mouseGrav,bubbles);
  }
}

function mouseClicked() {
  mouseGrav = !mouseGrav;
  //Code for creating new bubble on click
  //var position = createVector(mouseX,mouseY);
  //var velocity = createVector(random(-5,5),random(-5,5));
  //bubbles[num_bubbles++] = new Bubble(position,velocity);
}
