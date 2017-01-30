var planets = [];
var vectors = [];

var fieldSize = {x:70, y:35};

var canvasSize = {x:1440, y:700};

function setup() {
  var canvas = createCanvas(canvasSize.x, canvasSize.y);
  canvas.parent("canvas");
  
  background(0);
  planets.push(new Body(250,250,50));
  planets.push(new Body(250,350,25));
  planets[1].velocity.x = 2;
  for(var i = 0; i < fieldSize.x; i++){
    vectors.push([]);
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i].push(new Body(i * int(canvasSize.x / fieldSize.x) + 25,j * int(canvasSize.y / fieldSize.y) + int((canvasSize.y / fieldSize.y)/2),5));
    }
  }
}

function draw() {
  background(20, 15, 0);
 
    planets[1].calculateAttraction(planets,1)
    planets[1].update();
    planets[1].display();
    planets[0].display();
  
  for(var i = 0; i < fieldSize.x; i++){
    for(var j = 0; j < fieldSize.y; j++){
      vectors[i][j].displayVector(planets,30);
      //vectors[i][j].display();
    }
  }
}


function keyPressed(){
  if(keyCode === 32){
    console.log(planets[0].calculateAttraction(planets,0));
  }
}