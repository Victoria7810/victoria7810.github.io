let positionX = 590;
let positionY = 590;
let numberOfShapes = 0;
let starColor = false;
let snowMan;
let song;
function preload(){
  snowMan = loadImage("https://victoria7810.github.io/project1/snowman36.png");
  song = createAudio("https://victoria7810.github.io/project1/owls-christmas-1932.mp3");
}

function setup() {
  createCanvas(positionX, positionY);
    background(157, 232, 242);
  //tree
  noStroke();
  //triangle 4
  fill(40, 191, 79);
  triangle(400, 250, 240, 500, 560, 500);
    //triangle 3
   fill(41, 143, 68);
  triangle(400, 200, 260, 400, 550, 400);
    //triangle 2
    fill(40, 191, 79);
  triangle(400, 150, 280, 300, 520, 300);
    fill(41, 143, 68);
  //triangle 1
  triangle(400, 100, 300, 230, 500, 230);

  fill(105, 57, 13);
  rect(360, 500, 85, 100);
    //star
  fill(134, 155, 163);
  star(400, 95, 13, 30, 5);
  //snowman
  image(snowMan,-5,320);
  song.autoplay(true);

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
    fill(247, 247, 25);
    star(400, 95, 13, 30, 5);
    fill(240, 19, 41);
    textSize(50);
    textFont('gabriola')
    text("Merry Christmas",50,100);
    text("and",135,150);
    text("Happy New Year",50,200);
  }
}
