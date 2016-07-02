
//--------------
// Global Vars
//--------------

// defines lines and points
var username = []; // initialize for labels
var usernameToPrint;
var pointset = [];

// helps to find max/min values
//var maxVal = -100;// help with scaling
//var minVal = 100;

// helps with rescaling the range with a slider 
var startRangeX = [-10,10];
var startRangeY = [-30,70];
//var newRangeX = [startRangeX,startRangeX];
//var newRangeY = [startRangeY,startRangeY];
//var factorX = 0;
//var factorY = 1;

var startScale = [2,1];
//var newScale = [startScale,startScale];

var play = null;

var width  = Math.min(800,window.innerWidth);
var height = width/2; //width/2; //window.innerHeight-100;

var colors = {
      x: 0xFF4136,   // red
      y: 0xFFDC00,   // yellow
      z: 0x0074D9,   // blue
      xy: 0xFF851B,  // orange
      xz: 0xB10DC9,  // purple
      yz: 0x2ECC40,  // green
      xyz: 0x654321, // brown
      coeff: "#A9A9A9", // Gray
      ln: '#3090FF', // blue
      lbl: 'white', // white
      cnvs: 0xFFFFFF, // Clear/white
    }


/*
d3.select('#delete-char')
  .on("click", function() {
    var newName = usernameToPrint.slice(0,username.length-1);
    updateName(newName)
    //username = username.slice(0,username.length-1);
  });


d3.select('#add-char')
  .on("click", function() {
    if (username.length < pointset.length) {
      var newName = usernameToPrint + 'a';
      updateName(newName)
    }
  });

  function newName() {
    location.reload();
  }
//*/

d3.select('#reset')
  .on("click", function() {
    location.reload();//    newName();
  });

/*
// Initialize sliders
var rangeXSlider = document.getElementById('rangex-slider');
noUiSlider.create(rangeXSlider, {
    start: [1],
    tooltips: false,
    range: {
  'min': [-5],
  'max': [20]
}
});



rangeXSlider.noUiSlider.on('slide', updateRangeX);


function updateRangeX(){
    factorX = rangeXSlider.noUiSlider.get();
    newRangeX[1] = [startRangeX[0]-factorX, startRangeX[1]+factorX];
    scaleRangeX(newRangeX);
    newRangeX[0] = newRangeX[1];

    d3.select("#x-scale").html('x-Axis Scale: '+factorX);
}

function scaleRangeX(rangeArray) {

  if(play) {
    play.remove();
  }

  play = mathbox.play({
    delay: 0,
    target: 'cartesian',
    pace: 1,
    //      to: 2,
    loop: false,
    script: [
      //        {props: {factorX: 1, factorY: 1},
      {props: {range: [rangeArray[0],startRangeY]}},
      //        {props: {range: [[pointset[0][0]-3, -pointset[0][0]+3], [Math.floor(minVal)-200, Math.ceil(maxVal)+200]]}},
      {props: {range: [rangeArray[1],startRangeY]}},
      //        {props: {factorX: -pointset[0][0], factorY: maxVal},
      //        {props: {mathbox.select('point').set('color', 'red')}},
      //        {props: {range: [[-2, 2], [-1, 1]]}},
    ]
  });
}
//*/


var mathbox = mathBox({
      plugins: ['core', 'controls', 'mathbox'], // removed 'cursor' to fix cursor issue, 
                                                // if we remove 'mathbox' then the thinking image happens (I don't like it)
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
    });
if (mathbox.fallback) throw "WebGL not supported"

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(colors.cnvs), 1.0);

divContainer = document.getElementById( 'canvasElement' );
document.getElementById('container').appendChild( divContainer );

three.renderer.setSize( width, height);
divContainer.appendChild( three.renderer.domElement );


// Place camera
var camera =
      mathbox
      .camera({
        proxy: true,
        position: [0, 0, 2],
      });


// 2D cartesian
var view =
      mathbox
      .cartesian({
        range: [startRangeX, startRangeY],
        scale: startScale,
      });

// Axes + grid
view
      .axis({
        axis: 1,
        width: 3,
      })
      .axis({
        axis: 2,
        width: 3,
      })
      .grid({
        width: 2,
        niceX: true,
        niceY: true,
//        divideX: 50,
//        divideY: 25,
      });

// Make axes black
mathbox.select('axis').set('color', 'black');

// Calibrate focus distance for units
mathbox.set('focus', 3);

view.array({
//      items: 1,
      channels: 2,
      live: true,
      id: 'data',
      // data: is set below
    }).swizzle({
      order: "xy"
    })
    .point({
      color: colors.x,
      size: window.innerWidth*0.016,
      zIndex: 1,
    }).text({
      font: 'Helvetica',
//      style: 'bold',
      width:  50,
      height: 5,
      sdf: 0,
      expr: function (emit, i, j, time) {
        emit(username[i]);
      },
    })
    .label({
      color: colors.lbl,//'#30A0FF',
      snap: false,
      size: window.innerWidth*0.023,
      offset: [0, 0],
      depth: .5,
      zIndex: 1,
    });


view.select('#data').set('data', [pointset]);



function splitName(name) {
  var splitName = name.toLowerCase();
  return splitName.match(/[a-z]/g);
}


function encodeName(nameArray) {
  var points = [];
  // Shifting points to be displayed in initial grid
  for (var i = 0; i < nameArray.length; i++) {
    points.push([i,(nameArray[i].charCodeAt()-96)]);
  }
  return points;
}

function updateName(newName) {
  console.log(newName)
  usernameToPrint = newName;
  username = splitName(usernameToPrint);
  pointset = encodeName(username);
  view.select('#data').set('data', [ pointset]);
}

d3.select('#name-input').on('keyup', function(event){
  usernameToPrint = this.value;
  if(usernameToPrint.length > 0) {
    updateName(usernameToPrint);

    // only letters reset and shift graph
    if (d3.event.keyCode >= 65 && d3.event.keyCode <= 90) {
      setupVis(username);
      shiftView();
    }

    // delete changes graph and polynomial, but does not shift graph
    if (d3.event.keyCode == 8) {
      setupVis(username);
    }
  }
});

/*
d3.select('#view-poly').on("click", function() {
  updateName(usernameToPrint);
  setupVis(username);
});
*/


function setupVis(nameArray) {

  view.select('#vector').remove();

  view.interval({
    id:'vector',
    expr: function (emit, x, i, time) {
      var t = time/1.25 - 5;
      if (x < t && x < nameArray.length + 10) {
        emit(x, lagrange(x));
      }
    },
    width: 512,
    channels: 2,
    live: true, // allows for the delete letter and add letter feature
  }).line({
    width: window.innerWidth*0.004,
    color: colors.ln,
  });

  d3.select("#poly-name").html(usernameToPrint+" = " + makePoly(pointset));
}

function shiftView() {

  if(play) {
    play.remove();
  }

  play = mathbox.play({
    delay: .5,
    target: 'cartesian',
    pace: 3,
    //      to: 2,
    loop: false,
    script: [
      //        {props: {factorX: 1, factorY: 1},
      {props: {range: [startRangeX, startRangeY]}},
      //        {props: {range: [[pointset[0][0]-3, -pointset[0][0]+3], [Math.floor(minVal)-200, Math.ceil(maxVal)+200]]}},
      {props: {range: [endRangeX(pointset), endRangeY(pointset)]}},
      //        {props: {factorX: -pointset[0][0], factorY: maxVal},
      //        {props: {mathbox.select('point').set('color', 'red')}},
      //        {props: {range: [[-2, 2], [-1, 1]]}},
    ]
  });
}


function endRangeX (points) {
	var newRange = [];
	var d = startRangeX[1] - startRangeX[0];

//	if (d > points.length) {
		newRange[0] = -d/2 + points.length/2;
		newRange[1] =  d/2 + points.length/2;
//	} else {

//	}

	return newRange;
}


function endRangeY (points) {
	var newRange = startRangeY;
	return newRange;
}


function arrayProduct(a) {
    var p = 1;
    for (var i = 0; i < a.length; i += 1) {
      // s += array[i];  // sum
      p *= a[i];  //product
    }
    return p;
  }


function arraySum(a) {
    var s = 0;
    for (var i = 0; i < a.length; i += 1) {
       s += a[i];  // sum
      //p *= a[i];  //product
    }

    return s;
  }


// Actual Lagrange Polynomial function
function lagrange(x) {
    var xfunBuilder=[];

        for (var k = 0; k < username.length; k++) {
          xfunBuilder.push([]);

          for (var j = 0; j < username.length; j++) {

            if (j != k) {
              xfunBuilder[k].push((x - pointset[j][0])/(pointset[k][0]-pointset[j][0]));
//              console.log(pointset[j][0]);
//              console.log(pointset[k][0]);
            }

          }

          xfunBuilder[k].push(pointset[k][1]);

          xfunBuilder[k] = arrayProduct(xfunBuilder[k]);


        }

        return arraySum(xfunBuilder);
  }


// Creation of Vandermonde (Not Used)
function vandermonde (a) {

    var vand = [];

    for(var k = 0; k < a.length; k++) {
      vand.push([]);

      for (var i = 0; i < a.length; i++) {
        vand[k].push(Math.pow(a[k][0],a.length - i -1));
      }

    }

    return vand;
  }


// Multiplication of Matrices (Not Used)
function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}


// Multiplication of polynomials viewed as arrays
function polyProd(A,B) {
  var C = [];

  for(var i = 0; i < A.length+B.length - 1; i++) {
    C[i] = 0;
  }

  for(var j=0; j < A.length; j++) {
    for(var k=0; k < B.length; k++) {
      C[j+k] = C[j+k] + A[j]*B[k];
    }
  }

  return C;
}


// Creates the polynomial to be displayed
function makePoly(points) {

  // Initial Vars
  var numer = [];
  var denom = [];
  var L = []; // final polynomial array
  var sign = [];

  // Initialize Vars
  for(var i = 0; i < points.length ; i++) {
    numer[i] = [1];
    denom[i] = 1;
    L[i] = 0;
    sign[i] = " + ";
  }

  // Creates numerator and denominator of l_i(x)
  for(var j = 0; j < points.length ; j++) {
      for(var k = 0; k < points.length ; k++) {
        if (j!=k) {
          numer[j] = polyProd(numer[j],[-points[k][0],1]);
          denom[j] = denom[j]*(points[j][0]-points[k][0]);
        }
      }
  }

  // Uses Fraction.js to preserve rational numbers
  var y = [];

  for(var l=0; l < points.length; l++) {
    y[l] = new Fraction(points[l][1]);

    for(var m=0; m < points.length; m++) {
      numer[l][m] = y[l].mul(numer[l][m]).div(denom[l]);
//      console.log(numer[l][m]);
    }
  }


  // Defines polynomial as an array
  for(var n=0; n < points.length; n++) {
    for(var p=0; p < points.length; p++) {
      L[n] = numer[p][n].add(L[n]);
    }

    if (L[n].n != 0) {

      if (L[n].s == -1) {
        sign[n] = " - ";
      }

      if (L[n].d == 1) {
        L[n] = L[n].n.toString();

      } else {
//        L[n] = "<sup>"+ L[n].n.toString()+"</sup>&frasl;<sub>"+L[n].d.toString()+"</sub>";
//        L[n] = L[n].n.toString()+" &frasl; "+L[n].d.toString();
        L[n] = L[n].n.toString()+"/"+L[n].d.toString();
      }

    } else {
      L[n] = "0";
    }

  }

  // Creates the polynomial to be viewed
  var polynomial = "";

  if (L[0] != 0) {

    if (sign[0] == " - ") {
      polynomial = sign[0] + "<span style='color:"+colors.coeff+"'>" + L[0] + "</span>";
    } else {
      polynomial = "<span style='color:"+colors.coeff+"'>" + L[0] + "</span>";
    }

  }

  for (var q=1; q < points.length; q++) {
    if (L[q] != 0) {
      if (q == 1) {
        polynomial = polynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x ";
      } else {
        polynomial = polynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x<sup>" + q + "</sup> ";
      }
    }

  }

  return polynomial;
}
