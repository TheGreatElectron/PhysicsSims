//Background image
var bg;
//Buttons
var playButton;
//bool to toggle animation
var play;

//Sliders
var mSlider, kSlider, aSlider;
//Slider defined variables
var mass, springk, amplitude;
//calculated variable
var vel, acc;

//spring
var spring;
var mouseOver;



function setup() {
  //Create Canvas
  createCanvas(600, 400);
  bg = loadImage("img/simBG.jpg");
  textSize(15)
  noStroke();
  
  //Set default variables
  mass = 11;
  springk = 6;
  amplitude = 2;
  
  //set play
  play = true;
  
  //Create sliders and buttons
  playButton = createButton('play/pause');
  playButton.position(500,20);
  playButton.mousePressed(togglePlay);
  mSlider = createSlider(1, 21, mass);
  mSlider.position(20, 310);
  kSlider = createSlider(1, 11, springk);
  kSlider.position(165, 310);
  aSlider = createSlider(-10, 10, amplitude);
  aSlider.position(310, 310);
  
  spring = new Spring(createVector(20,179),springk,mass,308,amplitude/10);

}

function draw() {
  //Draw Basics
  background(bg);
  text("Mass: "+mass+" kg", 20, 305);
  text("Spring K: "+springk+" N/m", 165, 305);
  text("Amplitude: "+(amplitude/2)+" m", 310, 305);
  
  //Draw number lines
  push();
  fill(255);
  stroke(255);
  line(67,240,590,240);
  for(var i=0;i<=1;i+=.1){
    var xpos = lerp(67,590,i);
    stroke(255);
    line(xpos,235,xpos,245);
    noStroke();
    text(round(i*10-5),xpos-4,260);
  }
  pop();
  
  
  //Update Variables and reset if changed
  if (updateVars()){
    spring = new Spring(createVector(20,179),springk,mass,308,amplitude/10);
  }

  //Toggle animation
  if (play) {
    spring.update();
  }
  //draw spring
  spring.display();
  
  //calculate vel and acc
  vel = round(amplitude*spring.velocity.x/.02)/100;
  acc = round(amplitude*spring.acceleration.x/.02)/100;
  //type vel and acc
  text("Velocity: "+vel+" ", 77, 20);
  text("Acceleration: "+acc+" ", 237, 20);
}

function updateVars(){
  //updates slider variables and returns true if changed
  var hasChanged = false;
  if (amplitude != aSlider.value() || mass != mSlider.value() || springk != kSlider.value()){
    hasChanged = true;
  }
  if (mouseX > (spring.displacement.x)) {
    mouseOver = true;
    text("mouseover",100,100);
  } 
  else {
    mouseOver = false;
  }
  
  mass = mSlider.value();
  springk = kSlider.value();
  amplitude = aSlider.value();
  
  return hasChanged;
}

function togglePlay(){
  play = !play;
}

