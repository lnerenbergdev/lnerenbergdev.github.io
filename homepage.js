var planets = [];
var vectors = [];

var fieldSize = {x:20, y:20};

var canvasSize = {x:200, y:200};

function setup() {
  frameRate(30);
  var x_ = 0
  if(windowWidth < 2000){
    x_ = displayWidth;
  } else{
    x_ = displayWidth/3;
  }
  canvasSize = {x:displayWidth/3, y:windowHeight};
  var canvas = createCanvas(canvasSize.x, canvasSize.y);
  canvas.parent("canvas");
  
  background(0);
  planets.push(new Body(int(displayWidth/3-(displayWidth/3/2)),int(windowHeight-175),50));
  planets.push(new Body(int(displayWidth/3-(displayWidth/3/2)),int(windowHeight-175)+100,20));
  planets[1].velocity.x = 2;
  for(var i = 0; i < fieldSize.x; i++){
    vectors.push([]);
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i].push(new Body(i * int(canvasSize.x / fieldSize.x) + 10,j * int(canvasSize.y / fieldSize.y) + int((canvasSize.y / fieldSize.y)/2),5));
    }
  }
}

function draw() {
  background(250, 250, 250); 
  for(var i = 0; i < fieldSize.x; i++){
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i][j].displayVector(planets,30);
      //vectors[i][j].display();
    }
  }
  planets[1].calculateAttraction(planets,1)
  planets[1].update();
  planets[1].display();
  planets[0].display();
}


function keyPressed(){
  if(keyCode === 32){
    console.log(planets[0].calculateAttraction(planets,0));
  }
}
