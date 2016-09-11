function lineIntersect(a,b,c,d) {
    var x=((a.x*b.y-a.y*b.x)*(c.x-d.x)-(a.x-b.x)*(c.x*d.y-c.y*d.x))/((a.x-b.x)*(c.y-d.y)-(a.y-b.y)*(c.x-d.x));
    var y=((a.x*b.y-a.y*b.x)*(c.y-d.y)-(a.y-b.y)*(c.x*d.y-c.y*d.x))/((a.x-b.x)*(c.y-d.y)-(a.y-b.y)*(c.x-d.x));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (a.x>=b.x) {
            if (!(b.x<=x&&x<=a.x)) {return false;}
        } else {
            if (!(a.x<=x&&x<=b.x)) {return false;}
        }
        if (a.y>=b.y) {
            if (!(b.y<=y&&y<=a.y)) {return false;}
        } else {
            if (!(a.y<=y&&y<=b.y)) {return false;}
        }
        if (c.x>=d.x) {
            if (!(d.x<=x&&x<=c.x)) {return false;}
        } else {
            if (!(c.x<=x&&x<=d.x)) {return false;}
        }
        if (c.y>=d.y) {
            if (!(d.y<=y&&y<=c.y)) {return false;}
        } else {
            if (!(c.y<=y&&y<=d.y)) {return false;}
        }
    }
    return true;
}


function intersect(va,vb,vc,vd){
  var a1, a2, b1, b2, c1, c2;
  var r1, r2 , r3, r4;
  var denom, offset, num;

  // Compute a1, b1, c1, where line joining points 1 and 2
  // is "a1 x + b1 y + c1 = 0".
  a1 = vb.y - va.y;
  b1 = va.x - vb.x;
  c1 = (vb.x * va.y) - (va.x * vb.y);

  // Compute r3 and r4.
  r3 = ((a1 * vc.x) + (b1 * vc.y) + c1);
  r4 = ((a1 * vd.x) + (b1 * vd.y) + c1);

  // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if ((r3 != 0) && (r4 != 0) && same_sign(r3, r4)){
    return false;
  }

  // Compute a2, b2, c2
  a2 = vd.y - vc.y;
  b2 = vc.x - vd.x;
  c2 = (vd.x * vc.y) - (vc.x * vd.y);

  // Compute r1 and r2
  r1 = (a2 * va.x) + (b2 * va.y) + c2;
  r2 = (a2 * vb.x) + (b2 * vb.y) + c2;

  // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if ((r1 != 0) && (r2 != 0) && (same_sign(r1, r2))){
    return false;
  }

  //Line segments intersect: compute intersection point.
  denom = (a1 * b2) - (a2 * b1);

  if (denom == 0) {
    // return 'COLLINEAR';
    return false;
  }

  if (denom < 0){
    offset = -denom / 2;
  }
  else {
    offset = denom / 2 ;
  }

  // The denom/2 is to get rounding instead of truncating. It
  // is added or subtracted to the numerator, depending upon the
  // sign of the numerator.
  num = (b1 * c2) - (b2 * c1);
  if (num < 0){
    x = (num - offset) / denom;
  }
  else {
    x = (num + offset) / denom;
  }

  num = (a2 * c1) - (a1 * c2);
  if (num < 0){
    y = ( num - offset) / denom;
  }
  else {
    y = (num + offset) / denom;
  }

  // lines_intersect
  // return 'DO_INTERSECT'
  return createVector(x,y);
}

function same_sign(a, b){
  return (( a * b) >= 0);
}
