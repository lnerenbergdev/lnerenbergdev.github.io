function Body(_x,_y,_r){
  this.location = {x:_x, y:_y};
  this.velocity = {x:0, y:0};
  this.accelleration = {x:0, y:0};

  this.force = {x:0, y:0};
  this.forces = [];
  
  this.totalForce = {x:0, y:0};

  this.r = _r;

  this.G = 9.8;

  this.mass = _r;
  this.terminalVelocity = 100;

  this.calculateAttraction = function(bodies,n){
    this.totalForce.x = 0;
    this.totalForce.y = 0;
    
    for(var i = 0; i < bodies.length; i++){
      if(i!=n){
        var force = {x:0, y:0};
  
        force.x = bodies[i].location.x - this.location.x;
        force.y = bodies[i].location.y - this.location.y;
  
        var distance = Math.sqrt(Math.pow(force.x,2) + Math.pow(force.y,2));
  
        force.x = force.x/ distance;
        force.y = force.y/ distance;
  
        var strength = (this.G * this.mass * bodies[i].mass) / (Math.pow(distance,2));
        
        force.x *= strength;
        force.y *= strength;
      
        this.totalForce.x += force.x;
        this.totalForce.y += force.y;
      }
    }
    var totalForce = this.totalForce;
    return totalForce;
  }

  this.update = function(){
    this.accelleration.x = this.totalForce.x / this.mass;
    this.accelleration.y = this.totalForce.y / this.mass;

    this.velocity.x += this.accelleration.x;
    this.velocity.y += this.accelleration.y;

    this.location.x += this.velocity.x;
    this.location.y += this.velocity.y;
  };

  this.display = function(){
    ellipse(this.location.x, this.location.y, this.r);
  };
   
  this.displayVector = function(bodies,vectorMag){
    this.calculateAttraction(bodies);
   
    var forceMag = Math.sqrt(Math.pow(this.totalForce.x,2) + Math.pow(this.totalForce.y,2));
  
    var normForce = {x:(this.totalForce.x/this.mass)/forceMag, y:(this.totalForce.y/this.mass)/forceMag};
    
    line(this.location.x,this.location.y,this.location.x + normForce.x * vectorMag,this.location.y + normForce.y * vectorMag);
    stroke(150);
  };
}