let positionX = 600;
let positionY = 600;
let numberOfShapes = 0;
let starColor = false;

function setup() {
  createCanvas(positionX, positionY);
  background("lightblue");
  //tree
  noStroke();
  fill("green");
  //triangle 1
  triangle(400, 100, 280, 300, 520, 300);
  //triangle 2
  triangle(400, 200, 260, 400, 550, 400);
  //triangle 3
  triangle(400, 250, 240, 500, 560, 500);
  fill("brown");
  rect(360, 500, 85, 100);
    //star
  fill("gray");
  star(400, 95, 13, 30, 5);
}

function draw() {

  for (i = 0; i < 3; i++) {
    //snowbackground
    let randomD = random(8);
    let randomX = random(positionX);
    let randomY = random(positionY);
    let randomH = random(50);
    let fillColor = color(255, 255, 255);
    fillColor.setAlpha(128 + 32 * sin(millis() / 1000));
    fill(fillColor);
    noStroke();
    circle(randomX, randomY, randomD);
    frameRate(2);
  }
}
//star
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0.95; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
//decorations
function mousePressed() {
  numberOfShapes = numberOfShapes + 1;
  noStroke();
  if (numberOfShapes <= 20) {
    circleR = random(10, 30);
    colorR = random(255);
    colorG = random(255);
    colorB = random(255);
    fill(colorR, colorG, colorB);
    circle(mouseX, mouseY, circleR);
  }
}

//starColor
function keyPressed(){
  if(keyCode===UP_ARROW){
    fill("yellow");
    star(400, 95, 13, 30, 5);
    fill("red");
    textSize(30);
    textFont('itcedscr')
    text("Merry Christmas",70,100);
    text("and",150,150);
    text("Happy New Year",70,200);
  }
}

