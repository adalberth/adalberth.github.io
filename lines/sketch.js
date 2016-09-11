var grid
var boids

function setup() {
  createCanvas(window.innerWidth,window.innerHeight)
  background(255)

  grid = new Grid()
  grid.init()

  boids = []
  for (var i = 0; i < 150; i++) {
    boids.push(new Boid({
      vector: createVector(random(width * 0.4, width * 0.6), random(height * 0.4, height * 0.6)),
    }))
  }
}

function draw() {
  background(255)

	grid.reset()

  // add boids to grid fields
  for (var i = 0; i < boids.length; i++) {
    var boid = boids[i]
    var field = grid.lookup(boid.location)
    field.add(boid)
  }

  // react to other boids
  for (var i = 0; i < boids.length; i++) {
    var boid = boids[i]
    var field = grid.lookup(boid.location)
    var neighborsFields = grid.neighbors(field, ceil(boid.r / grid.resolution))
    for (var j = 0; j < neighborsFields.length; j++) {
      for (var k = 0; k < neighborsFields[j].visitors.length; k++) {
        var other = neighborsFields[j].visitors[k]
        if(boid != other){
          var is = intersect(boid.lineStart, boid.lineEnd, other.lineStart, other.lineEnd)
          if(is != false) boid.repel(other)
        }
        // if(k < 1 && boid.location.dist(other.location) > boid.r) {
          // push()
          //   line(boid.lineStart.x, boid.lineStart.y, other.lineStart.x, other.lineStart.y)
          //   line(boid.lineEnd.x, boid.lineEnd.y, other.lineEnd.x, other.lineEnd.y)
          // pop()
          // boid.highlight()
          // neighborsFields[j].highlight()
        // }
      }
    }
    boid.render()
  }

  if(frameCount % (60 * 1) === 0) {
    for (var i = 0; i < 3; i++) {
      var boid = boids[floor(random(boids.length))]
      boid.velocity = createVector(random(-10, 10), random(-10, 10))
    }
  }
}
