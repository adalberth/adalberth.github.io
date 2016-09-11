function Grid (r) {
	this.resolution = r || 30
	this.cols = width / this.resolution
	this.rows = height / this.resolution
	this.fields = []
	this.debug = false

	this.init = function () {
		// var xoff = 0
		for (var i = 0; i < this.cols; i++) {
			this.fields[i] = []
			// var yoff = 0
			for (var j = 0; j < this.rows; j++) {
					// var theta = map(noise(xoff,yoff),0,1,0,TWO_PI);
					this.fields[i].push(new Field({
							// vector: createVector(cos(theta),sin(theta)),
							x: i*this.resolution,
							y: j*this.resolution,
							r: this.resolution,
							flowField: this
					}))
					// yoff += 0.1
			}
			// xoff += 0.1
		}
	}

	// this.update = function () {
	// 	var zoff = frameCount * 0.01
	// 	var xoff = 0
	// 	for (var i = 0; i < this.cols; i++) {
	// 		var yoff = 0
	// 		for (var j = 0; j < this.rows; j++) {
	// 				var theta = map(noise(xoff, yoff, zoff),0,1,0,TWO_PI);
	// 				this.fields[i][j].vector = createVector(cos(theta),sin(theta))
	// 				yoff += 0.1
	// 		}
	// 		xoff += 0.1
	// 	}
	// }

	this.reset = function () {
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.fields[i][j].reset();
				// if(this.debug) this.fields[i][j].draw();
			}
		}
	}

	this.lookup = function(lookup) {
    var column = int(constrain(lookup.x/this.resolution,0,this.cols - 1));
    var row = int(constrain(lookup.y/this.resolution,0,this.rows - 1));
    return this.fields[column][row];
  }

	this.findIndexes = function (field) {
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				if(this.fields[i][j] === field){
					return [i, j]
				}
			}
		}
	}

	this.neighbors = function (field, size) {
		var indexes = this.findIndexes(field)
		var s = size !== undefined ? int(size) : 1
		var start = s * -1
		var end = s + 1
		var neighbors = []
		for (var i = start; i < end; i++) {
			for (var j = start; j < end; j++) {
					var ii = indexes[0] + i
					var jj = indexes[1] + j
					// if(ii === indexes[0] && jj === indexes[1]) continue
					if(ii < 0 || jj < 0) continue
					if(ii > this.fields.length - 1 || jj > this.fields[indexes[0]].length - 1) continue
					neighbors.push(this.fields[ii][jj])
			}
		}
		return neighbors
	}
}

function Field (opts) {
	// this.vector = opts.vector
	this.x = opts.x
	this.y = opts.y
	this.r = opts.r
	this.flowField = opts.flowField
	this.visitors = []

	this.reset = function () {
		this.visitors = []
	}

	this.add = function (visitor) {
		this.visitors.push(visitor)
	}

	// this.draw = function() {
  //   push();
  //   var arrowsize = 4;
	// 	var len = this.vector.mag() * this.r;
  //   translate(this.x + len * 0.5, this.y + len * 0.5);
	// 	noFill()
  //   stroke(255,100);
  //   rotate(this.vector.heading());
  //   line(-len * 0.5, 0, len * 0.5, 0);
  //   pop();
  // }

	this.highlight = function () {
		push()
		fill(0, 255, 0, 55)
		noStroke()
		rect(this.x, this.y, this.r, this.r)
		pop()
	}

}
