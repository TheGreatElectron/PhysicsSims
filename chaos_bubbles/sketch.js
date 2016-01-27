var bubbles = [];

function setup() {
  createCanvas(700,500);
  for (var i=0; i<500; i++){
    bubbles[i] = new Bubble(random(width),random(height));
  }
}

function draw() {
  background(0);
  for (var i=0; i<500; i++){
    bubbles[i].wall();
    bubbles[i].update();
    bubbles[i].draw();
  }
}
