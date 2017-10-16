// James Hunt - 17/10/17
// Vehicle class for coding steering behaviours

function Vehicle(x, y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,-2);
  this.position = createVector(x,y);
  this.r = 6;
  this.maxspeed = 5;
  this.maxforce = 0.2;

  // Method to update location of the vehicle
  this.update = function() {
    // Update vehicle velocity
    this.velocity.add(this.acceleration);
    // Limit speed of vehicle
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 every time the vehicle location updates
    this.acceleration.mult(0);
  };

  this.applyForce = function(force) {
    this.acceleration.add(force);
  };

  // Method to locate and eat the closest piece of food:
  this.eat = function (list) {
    var record = Infinity;
    var closest = -1;
    for (var i = 0; i < list.length; i++) {
      var distance = this.position.dist(list[i]); // Get distance between vehicle location and food
      if (distance < record) {
        record = distance;
        closest = i; //Closest is then set to the the value of i
      }
    }

    //If statement to check if food has actually been eaten:
    if (record < 5) {
      list.splice(closest, 1); // Remove the food that was eaten from the array of food
    } else if (closest > -1) {
      this.seek(list[closest]); // Only seek the next next bit of food if it currently exists
    }
  };

  // A method that calculates a steering force towards a target
  // STEER = DESIRED VELOCITY MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target

    // Set magnitude to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired velocity minus velocity
    var steeringForce = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force

    this.applyForce(steeringForce);
  };

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity to represent our vehicle
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
  };
}
