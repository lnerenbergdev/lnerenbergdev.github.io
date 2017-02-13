function Fish(x,y){
	this.brain = new Network(2,2);

	// Motion Vectors
	this.location = {x:x,y:y};
	this.velocity = {x:0,y:0};
	this.acceleration = {x:0,y:0};

	this.velocityMag = 0;

	this.heading = 90;
	this.maxSpeed = 9;
	this.size = 20;

	this.contents = 10;
	this.isAlive = true;

	angleMode(DEGREES);
	colorMode(RGB, 255);

	this.time = 0;
	this.reactionTime = 2;

	this.c = color(random(255),random(255),random(255));
	

	this.init = function(WIDTH,HEIGHT){
		// Randomize location
		this.location.x = Math.floor(Math.random()*WIDTH);
		this.location.y = Math.floor(Math.random()*HEIGHT);

		this.heading = Math.floor(Math.random()*360);

		// Randomize velocity 
		this.velocity.x = cos(this.heading) * this.maxSpeed;
		this.velocity.y = sin(this.heading) * this.maxSpeed;
		
		// Set fish to be alive
		this.isAlive = true;

		// Set contents
		this.contents = 10;
		
		// Initialize brain
		this.brain.init();

	}

	this.update = function(food){
		this.react(food);

		this.velocity.x = cos(this.heading) * this.maxSpeed;
		this.velocity.y = sin(this.heading) * this.maxSpeed;

		if(this.velocity.x > this.maxSpeed){
			this.velocity.x = this.maxSpeed;
		}

		if(this.velocity.y > this.maxSpeed){
			this.velocity.y = this.maxSpeed;
		}

		this.location.x += this.velocity.x;
		this.location.y += this.velocity.y;

		this.eat(food);
		this.contents-=0.2;

		if(this.contents < 0){
			this.isAlive = false;
		}
	}

	this.display = function(){
		noStroke(0);
		fill(this.c);

		triangle(	this.location.x - cos(this.heading + 180) * 10, 
					this.location.y - sin(this.heading - 180) * 10, 
					this.location.x + cos(this.heading + 150) * this.size, 
					this.location.y + sin(this.heading + 150) * this.size, 
					this.location.x + cos(this.heading - 150) * this.size, 
					this.location.y + sin(this.heading - 150) * this.size);

		triangle(	this.location.x + cos(this.heading + 180) * 35, 
					this.location.y + sin(this.heading - 180) * 35, 
					this.location.x + cos(this.heading + 150) * this.size, 
					this.location.y + sin(this.heading + 150) * this.size, 
					this.location.x + cos(this.heading - 150) * this.size, 
					this.location.y + sin(this.heading - 150) * this.size);

		triangle(	this.location.x + cos(this.heading + 180) * 35 + cos(this.heading + 150) * this.size,
					this.location.y + sin(this.heading - 180) * 35 + sin(this.heading + 150) * this.size,
					this.location.x + cos(this.heading + 180) * 35 + cos(this.heading - 150) * this.size, 
					this.location.y + sin(this.heading - 180) * 35 + sin(this.heading - 150) * this.size, 
					this.location.x + cos(this.heading + 180) * 35, 
					this.location.y + sin(this.heading - 180) * 35);


		
	}

	this.reset = function(WIDTH, HEIGHT){
		this.location.x = Math.floor(Math.random()*WIDTH);
		this.location.y = Math.floor(Math.random()*HEIGHT);

		this.velocity.x = Math.floor(Math.random()*2*this.maxSpeed - this.maxSpeed);
		this.velocity.y = Math.floor(Math.random()*2*this.maxSpeed - this.maxSpeed);

		this.brain.init();

		this.contents = 10;
		this.isAlive = true;
	}

	this.eye = function(food,lineOfSight){
		var visability = 0;
		var maxVisability = 0;
		var distance = {
			x:0,
			y:0
		};
		stroke(255);

		for(var i = 0; i < food.length; i++){
			distance.x = this.location.x - food[i].location.x;
			distance.y = this.location.y - food[i].location.y;


			var d = atan2(distance.x, distance.y);
			var h = 0;		

			if((360 + this.heading + lineOfSight)%360 > 270){
				h = ((360 + this.heading + lineOfSight)%360 - 270)*-1;
			} else if ((360 + this.heading + lineOfSight)%360 < 90){
				h = ((360 + this.heading + lineOfSight)%360)*-1 - 90;
			} else if ((360 + this.heading + lineOfSight)%360 > 90){
				h = 180 - (((360 + this.heading + lineOfSight)%360)-90);
			}

			if(Math.abs(d - h) < 20 && Math.sqrt(Math.pow(distance.x,2) + Math.pow(distance.y,2)) < 300){
				visability = 100/Math.sqrt(Math.pow(distance.x,2)+Math.pow(distance.y,2));
			}

			if(visability > maxVisability){
				maxVisability = visability;
			}
		}

		return maxVisability;
	}

	this.visualCortex = function(food){
		var output = [];
		output.push(this.eye(food,-20));
		output.push(this.eye(food,20));
		return output;
	}

	this.eat = function(food){
		for(var f of food){
			if(Math.abs(f.location.x - this.location.x) < this.size && Math.abs(f.location.y - this.location.y) < this.size){
				this.contents+=5;
				f.reset();
			}
		}
	}

	this.turn = function(direction){
		var velocityMag = Math.sqrt(Math.exp(this.velocity.x,2)+Math.exp(this.velocity.y,2));
		this.heading += direction;
	}

	this.react = function(food){
		this.time++;
		if(this.time%this.reactionTime==0){
			var thought = this.brain.feedForward(this.visualCortex(food));
			this.turn(thought[0]*1000);	
		}
	}
}











