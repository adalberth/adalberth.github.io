function Boid (opts) {
  this.location = opts.vector.copy()
  this.acceleration = createVector(0,0)
  this.velocity = createVector(0,0)

  this.maxspeed = opts.maxSpeed || 10
  this.maxforce = opts.maxForce || 0.5

  this.r = opts.r || random(10,50)
  this.c = opts.color || color(0, 50)

  this.rotation = opts.rotation || random(0, PI)
  this.rotationForce = opts.rotationForce || random(0.001, 0.01)

  this.rotationDirection = opts.rotationDirection || random() < 0.5 ? -1 : 1
  this.lineStart = createVector()
  this.lineEnd = createVector()

  this.render = function() {
    this.update()
    this.lineEdges()
    this.borders()
    this.display()
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.9)
    this.rotation += (this.velocity.mag() * 0.05) * this.rotationDirection
  }

  this.lineEdges = function () {
    var x1 = this.r * cos(this.rotation + HALF_PI) + this.location.x
    var y1 = this.r * sin(this.rotation + HALF_PI) + this.location.y
    var x2 = this.r * cos(this.rotation - HALF_PI) + this.location.x
    var y2 = this.r * sin(this.rotation - HALF_PI) + this.location.y
    this.lineStart.x = x1
    this.lineStart.y = y1
    this.lineEnd.x = x2
    this.lineEnd.y = y2
  }

  this.display = function() {
    noFill();
    stroke(this.c);
    this.draw()
  }

  this.draw = function () {
    push();
      translate(this.location.x,this.location.y);
      rotate(this.rotation);
      line(0, this.r * -1,0,this.r)
      endShape();
    pop();
  }

  this.highlight = function () {
    stroke(255, 0, 0);
    this.draw()
  }

  this.repel = function (boid) {
    var sub = p5.Vector.sub(this.location, boid.location)
    sub.limit(this.maxforce)
    this.applyForce(sub)
  }


  this.borders = function() {
    if (this.location.x < -this.r) this.location.x = width+this.r;
    if (this.location.y < -this.r) this.location.y = height+this.r;
    if (this.location.x > width+this.r) this.location.x = -this.r;
    if (this.location.y > height+this.r) this.location.y = -this.r;
  }
}
