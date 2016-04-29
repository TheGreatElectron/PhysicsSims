//Buttons
var playButton;
//bool to toggle animation
var play;

//Sliders
var mSlider, kSlider, aSlider, muSlider;
//Slider defined variables
var mass, springk, amplitude, mu;
//calculated variable
var vel, acc;

//spring
var spring;
var mouseOver;



function setup() {
  //Create Canvas
  createCanvas(600, 350);
  textSize(15)
  noStroke();
  
  //Set default variables
  mass = 11;
  springk = 6;
  amplitude = 2;
  mu=0;
  
  //set play
  play = true;
  
  //Create sliders and buttons
  playButton = createButton('play/pause');
  playButton.position(20,25);
  playButton.mousePressed(togglePlay);
  mSlider = createSlider(1, 21, mass);
  mSlider.position(20, height-40);
  kSlider = createSlider(1, 11, springk);
  kSlider.position(165, height-40);
  aSlider = createSlider(-10, 10, amplitude);
  aSlider.position(310, height-40);
  muSlider = createSlider(0, 10, mu);
  muSlider.position(455, height-40);
  
  spring = new Spring(createVector(20,height/2),springk,mass,308,amplitude/10);

}

function draw() {
  //Draw Basics
  push();
  //bacground rect
  fill(130,160,50);
  rect(0,0,width,height);
  //blue sky rect
  fill(131,214,342);
  rect(0,0,width,height/2+35);  
  //spring base rect
  fill(150);
  rect(0,height/2-35,40,70);
  pop();
  
  //draw slider labels
  text("Mass: "+mass+" kg", 20, 305);
  text("Spring K: "+springk+" N/m", 165, 305);
  text("Amplitude: "+(amplitude/2)+" m", 310, 305);
  text("Mu: "+ mu +" units",455,305);
  //Draw number lines
  push();
  fill(255);
  stroke(255);
  line(67,height/2+50,590,height/2+50);
  for(var i=0;i<=1;i+=.1){
    var xpos = lerp(67,590,i);
    stroke(255);
    line(xpos,height/2+45,xpos,height/2+55);
    noStroke();
    text(round(i*10-5),xpos-4,height/2+70);
  }
  pop();
  
  
  //Update Variables and reset if changed
  if (updateVars()){
    spring = new Spring(createVector(20,179),springk,mass,308,amplitude/10);
  }

  //Update spring
  spring.setPlay(play);
  spring.update();

  //draw spring
  spring.display();
  
  //calculate vel and acc
  vel = round(amplitude*spring.velocity.x/.02)/100;
  acc = round(amplitude*spring.acceleration.x/.02)/100;
  //type vel and acc
  push();
  fill(0);
  text("Velocity: "+vel+" m/s", 175, 40);
  text("Acceleration: "+acc+" m/(s^2)", 325, 40);
  pop();
}

function updateVars(){
  //updates slider variables and returns true if changed
  var hasChanged = false;
  if (amplitude != aSlider.value() || mass != mSlider.value() || springk != kSlider.value() || mu != muSlider.value()/10){
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
  mu = muSlider.value()/10;
  
  return hasChanged;
}

function togglePlay(){
  play = !play;
}

