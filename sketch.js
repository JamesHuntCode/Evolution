// James Hunt - 16/10/17
// Main JavaScript file for coding steering behaviours

var vehicle;
var food = [];
var poison = [];

function setup () {
  createCanvas(700, 400);
  vehicle = new Vehicle(width/2, height/2);

  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw () {
  background(50);

  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8)
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8)
  }

  // Call vehicle functions to allow it to operate:
  vehicle.eat(food);
  vehicle.eat(poison)
  //vehicle.seek(food);
  vehicle.update();
  vehicle.display();
}
