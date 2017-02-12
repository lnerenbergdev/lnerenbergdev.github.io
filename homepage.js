var planets = [];
var vectors = [];

var fieldSize = {x:20, y:20};

var canvasSize = {x:200, y:200};

var prevWindowSize = {x:0,y:0};

function setup() {
  frameRate(30);
  canvasSize = {x:displayWidth, y:windowHeight};
  prevWindowSize = {x:displayWidth, y:windowHeight};
  var canvas = createCanvas(canvasSize.x, canvasSize.y);
  canvas.parent("canvas");
  
  background(0);
  planets.push(new Body(int(windowWidth/2),int(windowHeight-175),50));
  planets.push(new Body(int(windowWidth/2),int(windowHeight-175)+100,20));
  planets[1].velocity.x = 2;
  for(var i = 0; i < fieldSize.x; i++){
    vectors.push([]);
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i].push(new Body(i * int(canvasSize.x / fieldSize.x) + int(canvasSize.x / fieldSize.x / 2),j * int(canvasSize.y / fieldSize.y) + int((canvasSize.y / fieldSize.y)/2),5));
    }
  }
}

function draw() {
  background(10, 10, 10); 

  if(prevWindowSize.x != windowWidth){
    canvasSize = {x:windowWidth, y:windowHeight};
    planets[0] = new Body(int(windowWidth/2),int(windowHeight-175),50);
    planets[1] = new Body(int(windowWidth/2),int(windowHeight-175)+100,20);
    planets[1].velocity.x = 2;
    vectors = [];
    for(var i = 0; i < fieldSize.x; i++){
      vectors.push([]);
      for(var j = 0; j < fieldSize.y; j++){
        vectors[i].push(new Body(i * int(canvasSize.x / fieldSize.x) + int(canvasSize.x / fieldSize.x / 2),j * int(canvasSize.y / fieldSize.y) + int((canvasSize.y / fieldSize.y)/2),5));
      }
    }
  }

  for(var i = 0; i < fieldSize.x; i++){
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i][j].displayVector(planets,30);
    }
  }
  
  planets[1].calculateAttraction(planets,1)
  planets[1].update();
  planets[1].display();
  planets[0].display();

  prevWindowSize.x = windowWidth;
  prevWindowSize.y = windowHeight;
}


function keyPressed(){
  if(keyCode === 32){
    console.log(planets[0].calculateAttraction(planets,0));
  }
}