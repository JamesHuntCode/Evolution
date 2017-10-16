// James Hunt - 16/10/17
// Main JavaScript file for coding steering behaviours

var vehicles = [];
var food = [];
var poison = [];

function setup () {
  createCanvas(640, 360);
  for (var i = 0; i < 20; i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y); // Generate 10 vehicles starting at random locations
  }

  // Add food into the world for the vehicles to eat:
  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  //Add poison into the world (hopefully) for the vehicles to avoid:
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw () {
  background(50);

  //Keep generating food into the world:
  if (random(1) < 0.06) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  //Keep generating poison into the world:
  if (random(1) < 0.01) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  // Draw food:
  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4); // Draw the food as a green cirle
  }

  // Draw poison:
  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4); // Draw the poison as a red circle
  }

  // Call vehicle functions to allow it to operate:
  for (var i = vehicles.length-1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviours(food, poison);
    vehicles[i].update();
    vehicles[i].display();

    if (vehicles[i].death()) {
      vehicles.splice(i, 1); // If vehicle has died, remove it from array of vehicles
    }
  }
}
