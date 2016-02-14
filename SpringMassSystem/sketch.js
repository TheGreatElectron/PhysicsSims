//Background image
var bg;
//Sliders
var mSlider, kSlider, aSlider;
//Buttons
var playButton;
//bool to toggle animation
var play;

//User defined variables
var mass, springk, amplitude;
//Calculated variables
var omega, period, velocity, acceleration, position;

//pixel position on X
var xpos;
//Time Variables
var t, tzero;



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
  
  //set time
  tzero = millis()/1000;
  t = 0;
  
  //set play
  play = true;
  
  //Create sliders and buttons
  playButton = createButton('play/pause');
  playButton.position(500,20);
  playButton.mousePressed(togglePlay);
  mSlider = createSlider(1, 21, mass);
  mSlider.position(20, 310);
  kSlider = createSlider(1, 11, springk);
  kSlider.position(20, 360);
  aSlider = createSlider(-4, 4, amplitude);
  aSlider.position(165, 310);

}

function draw() {
  //Draw Basics
  background(bg);
  text("Mass: "+mass+" kg", 20, 305);
  text("Spring Constant: "+springk+" N/m", 20, 355);
  text("Amplitude: "+amplitude+" m", 165, 305);
  
  //Draw number lines
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
  
  //Reset time if Amplitude changes
  if (amplitude != aSlider.value()){
    resetTimer();
  }
  
  //update vars based on sliders
  mass = mSlider.value();
  springk = kSlider.value();
  amplitude = aSlider.value();

  //Toggle animation
  if (play) {
    //update time
    timer();
  }
  else {
    holdTime();
  }
  calculateVar(); 
  
  //Draw Box
  fill(map(mass,1,21,205,100));
  stroke(0);
  xpos = map(position,-5,5,67,590);
  rect(xpos-50,129,100,100); 
  
  //draw spring
  drawSpring(20,xpos-50,179);
}

function togglePlay(){
  play = !play;
}

function timer(){
  t=millis()/1000-tzero;
}
function holdTime() {
  tzero=millis()/1000-t;
}

function resetTimer(){
  tzero=millis()/1000;
  t=0;
}

function calculateVar() {
  //Calculate dependant variables
  omega = sqrt(springk/mass);
  period = TWO_PI/omega;
  position = amplitude*cos(omega*t);
}

function drawSpring(x1,x2,y) {
  strokeWeight(4);
  stroke(0);
  var x = [];
  var xi, xf;
  var flip=false;
  for(var i=0;i<=20;++i){
    x[i] = lerp(x1,x2,i/20);
  }
  //Draw front end
  line(x1,y,(x[0]+x[1])/2,y-20);
  //Draw middle spring
  for(var i=1;i<=20;++i){
    xi = (x[i-1]+x[i])/2;
    xf = (x[i]+x[i+1])/2;
    if(flip){
      line(xi,y+20,xf,y-20);
      flip=!flip;
    }
    else{
      line(xf,y+20,xi,y-20);
      flip=!flip;    
    }
  }
  //Draw back end
  line((x[19]+x[20])/2,y+20,x2,y);
}
