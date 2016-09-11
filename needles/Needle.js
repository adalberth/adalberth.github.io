
function Needle () {
  this.a = createVector(random(width * 0.25, width * 0.75), random(height * 0.25, height * 0.75))
  this.r = random(TWO_PI)
  this.l = random(5, 50)
  this.b = createVector(this.l * cos(this.r) + this.a.x, this.l * sin(this.r) + this.a.y)

  this.padding = 2

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

  this.draw = function () {
    noFill()
    stroke(0, 1)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}
