
function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA === undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA === undefined || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB === undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB === undefined || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                return false;
            }
        }
    }
    return true;
};


// easing
// Based on https://gist.github.com/gre/1650294

// No easing, no acceleration
function linear( t ) {
    return t;
}

// Slight acceleration from zero to full speed
function easeInSine( t ) {
    return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
}

// Slight deceleration at the end
function easeOutSine( t ) {
    return Math.sin( t * ( Math.PI / 2 ) );
}

// Slight acceleration at beginning and slight deceleration at end
function easeInOutSine( t ) {
    return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
}

// Accelerating from zero velocity
function easeInQuad( t ) {
    return t * t;
}

// Decelerating to zero velocity
function easeOutQuad( t ) {
    return t * ( 2 - t );
}

// Acceleration until halfway, then deceleration
function easeInOutQuad( t ) {
    return t < 0.5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;
}

// Accelerating from zero velocity
function easeInCubic( t ) {
    return t * t * t;
}

// Decelerating to zero velocity
function easeOutCubic( t ) {
    var t1 = t - 1;
    return t1 * t1 * t1 + 1;
}

// Acceleration until halfway, then deceleration
function easeInOutCubic( t ) {
    return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
}

// Accelerating from zero velocity
function easeInQuart( t ) {
    return t * t * t * t;
}

// Decelerating to zero velocity
function easeOutQuart( t ) {
    var t1 = t - 1;
    return 1 - t1 * t1 * t1 * t1;
}

// Acceleration until halfway, then deceleration
function easeInOutQuart( t ) {
    var t1 = t - 1;
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
}

// Accelerating from zero velocity
function easeInQuint( t ) {
    return t * t * t * t * t;
}

// Decelerating to zero velocity
function easeOutQuint( t ) {
    var t1 = t - 1;
    return 1 + t1 * t1 * t1 * t1 * t1;
}

// Acceleration until halfway, then deceleration
function easeInOutQuint( t ) {
    var t1 = t - 1;
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
}

// Accelerate exponentially until finish
function easeInExpo( t ) {

    if( t === 0 ) {
        return 0;
    }

    return Math.pow( 2, 10 * ( t - 1 ) );

}

// Initial exponential acceleration slowing to stop
function easeOutExpo( t ) {

    if( t === 1 ) {
        return 1;
    }

    return ( -Math.pow( 2, -10 * t ) + 1 );

}

// Exponential acceleration and deceleration
function easeInOutExpo( t ) {

    if( t === 0 || t === 1 ) {
        return t;
    }

    var scaledTime = t * 2;
    var scaledTime1 = scaledTime - 1;

    if( scaledTime < 1 ) {
        return 0.5 * Math.pow( 2, 10 * ( scaledTime1 ) );
    }

    return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );

}

// Increasing velocity until stop
function easeInCirc( t ) {

    var scaledTime = t / 1;
    return -1 * ( Math.sqrt( 1 - scaledTime * t ) - 1 );

}

// Start fast, decreasing velocity until stop
function easeOutCirc( t ) {

    var t1 = t - 1;
    return Math.sqrt( 1 - t1 * t1 );

}

// Fast increase in velocity, fast decrease in velocity
function easeInOutCirc( t ) {

    var scaledTime = t * 2;
    var scaledTime1 = scaledTime - 2;

    if( scaledTime < 1 ) {
        return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
    }

    return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );

}

// Slow movement backwards then fast snap to finish
function easeInBack( t, m) {
    var magnitude = magnitude || 1.70158
    var scaledTime = t / 1;
    return scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime - magnitude );

}

// Fast snap to backwards point then slow resolve to finish
function easeOutBack( t, m) {
    var magnitude = magnitude || 1.70158
    var scaledTime = ( t / 1 ) - 1;

    return (
        scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime + magnitude )
    ) + 1;

}

// Slow movement backwards, fast snap to past finish, slow resolve to finish
function easeInOutBack( t, m) {
    var magnitude = magnitude || 1.70158
    var scaledTime = t * 2;
    var scaledTime2 = scaledTime - 2;

    var s = magnitude * 1.525;

    if( scaledTime < 1) {

        return 0.5 * scaledTime * scaledTime * (
            ( ( s + 1 ) * scaledTime ) - s
        );

    }

    return 0.5 * (
        scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
    );

}
// Bounces slowly then quickly to finish
function easeInElastic( t, m ) {
    var magnitude = magnitude || 0.7
    if( t === 0 || t === 1 ) {
        return t;
    }

    var scaledTime = t / 1;
    var scaledTime1 = scaledTime - 1;

    var p = 1 - magnitude;
    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

    return -(
        Math.pow( 2, 10 * scaledTime1 ) *
        Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
    );

}

// Fast acceleration, bounces to zero
function easeOutElastic( t, m ) {
    var magnitude = magnitude || 0.7
    var p = 1 - magnitude;
    var scaledTime = t * 2;

    if( t === 0 || t === 1 ) {
        return t;
    }

    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );
    return (
        Math.pow( 2, -10 * scaledTime ) *
        Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p )
    ) + 1;

}

// Slow start and end, two bounces sandwich a fast motion
function easeInOutElastic( t, m ) {
    var magnitude = magnitude || 0.65
    var p = 1 - magnitude;

    if( t === 0 || t === 1 ) {
        return t;
    }

    var scaledTime = t * 2;
    var scaledTime1 = scaledTime - 1;

    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

    if( scaledTime < 1 ) {
        return -0.5 * (
            Math.pow( 2, 10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
        );
    }

    return (
        Math.pow( 2, -10 * scaledTime1 ) *
        Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5
    ) + 1;

}

// Bounce to completion
function easeOutBounce( t ) {

    var scaledTime = t / 1;

    if( scaledTime < ( 1 / 2.75 ) ) {

        return 7.5625 * scaledTime * scaledTime;

    } else if( scaledTime < ( 2 / 2.75 ) ) {

        var scaledTime2 = scaledTime - ( 1.5 / 2.75 );
        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.75;

    } else if( scaledTime < ( 2.5 / 2.75 ) ) {

        var scaledTime2 = scaledTime - ( 2.25 / 2.75 );
        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.9375;

    } else {

        var scaledTime2 = scaledTime - ( 2.625 / 2.75 );
        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.984375;

    }

}

// Bounce increasing in velocity until completion
function easeInBounce( t ) {
    return 1 - easeOutBounce( 1 - t );
}

// Bounce in and bounce out
function easeInOutBounce( t ) {

    if( t < 0.5 ) {

        return easeInBounce( t * 2 ) * 0.5;

    }

    return ( easeOutBounce( ( t * 2 ) - 1 ) * 0.5 ) + 0.5;

}
