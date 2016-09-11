
function Needle (opts) {
  this.a = opts.a || createVector(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.9))
  this.r = random(TWO_PI)
  this.l = opts.l || (opts.a && opts.b ? p5.Vector.dist(opts.a, opts.b) : random(5, 50))
  this.b = opts.b || createVector(this.l * cos(this.r) + this.a.x, this.l * sin(this.r) + this.a.y)

  this.padding = opts.padding || 1
  this.time = 0.0001
  this.increment = 0.01
  this.color = opts.color || color(0)
  this.strokeWeight = opts.strokeWeight || 1

  this.needles = opts.needles || []

  var sub = p5.Vector.sub(this.a,this.b)
  sub.setMag(this.padding)

  var a1 = p5.Vector.add(this.a, sub)
  var b1 = p5.Vector.sub(this.b, sub)

  var r1 = atan2(this.b.x - this.a.x, this.b.y - this.a.y) * -1

  var x1 = this.padding * cos(r1) + b1.x
  var y1 = this.padding * sin(r1) + b1.y
  var x2 = -this.padding * cos(r1) + b1.x
  var y2 = -this.padding * sin(r1) + b1.y
  var x3 = this.padding * cos(r1) + a1.x
  var y3 = this.padding * sin(r1) + a1.y
  var x4 = -this.padding * cos(r1) + a1.x
  var y4 = -this.padding * sin(r1) + a1.y

  this.boundingBox = [
    {x: x1, y: y1},
    {x: x2, y: y2},
    {x: x4, y: y4},
    {x: x3, y: y3}
  ]

  this.highlight = function () {
    push()
    stroke(0, 255, 0)
    strokeWeight(4)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
    pop()
  }

  this.showBoundingBox = function () {
    push()
    strokeWeight(1)
    stroke(255, 0, 0, 100)
    beginShape()
    vertex(this.boundingBox[0].x, this.boundingBox[0].y)
    vertex(this.boundingBox[1].x, this.boundingBox[1].y)
    vertex(this.boundingBox[2].x, this.boundingBox[2].y)
    vertex(this.boundingBox[3].x, this.boundingBox[3].y)
    endShape(CLOSE)
    pop()
  }

  this.draw = function () {
    noFill()
    strokeCap(SQUARE)
    strokeWeight(this.strokeWeight)
    stroke(this.color, map(t, 0, 1, 100, 255))

    this.time += this.increment;
    this.time = this.time > 1 ? 1 : this.time < 0 ? 0 : this.time
    var t = constrain(this.time, 0, 1)
    if (this.increment > 0) {
      line(this.a.x, this.a.y, lerp(this.a.x, this.b.x, easeOutExpo(t)), lerp(this.a.y, this.b.y, easeOutExpo(t)))
    }else if (t > 0.2) {
      line(this.b.x, this.b.y, lerp(this.b.x, this.a.x, easeInExpo(t)), lerp(this.b.y, this.a.y, easeInExpo(t)))
    }

    if (t <= 0) {
      var index = this.needles.indexOf(this)
      if (index > -1) {
        needles.splice(index, 1);
      }
    }
  }

  this.remove = function () {
    this.increment = -0.01
  }

  this.isAnimating = function () {
    return this.time != 1
  }

}
