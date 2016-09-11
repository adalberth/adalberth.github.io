var grid
var needles
var iterations = 10
var maxNeedles = 1000
var removeInterval = 1


var REMOVE_NEEDLES = true
var REMOVE_ALL_NEEDLES = false
var SHOW_SEARCH_NEEDLES = false
var SHOW_NEEDLE_BOUNDING_BOX = false

function setup() {
  createCanvas(window.innerWidth,window.innerHeight)
  background(255)
  initialNeedles()
}

function draw() {
  background(255)
  createNeedles()

  // var a = createVector(300, 300)
  // var b = createVector(500, 300)
  // var t = constrain(map(count, 0, 60 * 1, 0, 1), 0, 1)
  // line(a.x, a.y, lerp(a.x, b.x, easeInOutExpo(t)), lerp(a.y, b.y, easeInOutExpo(t)))
  // count++

}

function initialNeedles () {
  needles = []
  // createBigNeedle()
}

function createNeedles () {
  var l = needles.length - 1
  var needle
  if(l < maxNeedles) {
    for (var i = 0; i < iterations; i++) {
      needle = new Needle({needles: needles})
      if (SHOW_SEARCH_NEEDLES) needle.highlight()
      var intersects = false
      for (var j = l; j >= 0; j--) {
        var other = needles[j]
        var doIntersect = doPolygonsIntersect(other.boundingBox, needle.boundingBox)
        if(doIntersect) intersects = true
      }
      if (!intersects){
        needles.push(needle)
        // break;
      }
    }
  }

  for (var i = needles.length - 1; i >= 0; i--) {
    var needle = needles[i]
    stroke(0)
    strokeWeight(1)
    needle.draw()
    if (SHOW_NEEDLE_BOUNDING_BOX) {
      needle.showBoundingBox()
    }
  }

  if (REMOVE_NEEDLES) {
    if(l >= maxNeedles * 0.5 && frameCount % removeInterval === 0) {
      var needle = needles[floor(random(needles.length))]
      if(!needle.isAnimating()) needle.remove()
      removeInterval = floor(random(1, 5))
    }
  }

  if (REMOVE_ALL_NEEDLES) {
    needles.length = 0
    // createBigNeedle()
    REMOVE_ALL_NEEDLES = false
  }

}

this.createBigNeedle = function () {
  var customNeedle = new Needle({
    needles: needles,
    a: createVector(random(width * 0.4, width * 0.6), random(height * 0.4, height * 0.6)),
    l: random(width * 0.3, width * 0.4),
    strokeWeight: 10,
    padding: 50
  })
  needles.push(customNeedle)
}

function keyPressed () {
  if (key === 'R') REMOVE_NEEDLES = !REMOVE_NEEDLES
  if (key === 'H') SHOW_SEARCH_NEEDLES = !SHOW_SEARCH_NEEDLES
  if (key === 'B') SHOW_NEEDLE_BOUNDING_BOX = !SHOW_NEEDLE_BOUNDING_BOX
  if (key === ' ') REMOVE_ALL_NEEDLES = !REMOVE_ALL_NEEDLES
}
