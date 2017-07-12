
//--------------
// Global Vars
//--------------

// defines lines and points
var username = []; // initialize for labels
var usernameUC = []; // decided to display upper case in points, did not want to rewrite code so made new var
var usernameToPrint;
var pointset = [];
var pdfPolynomial = "";

// helps with rescaling the range
var startRangeX = [-10,10];
var startRangeY = [-30,70];

var startScale = [2,1];

var play = null;

var width  = 800; 
var height = width/2; 

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

// Reset Button
d3.select('#reset')
  .on("click", function() {
    location.reload();
  });


// Places mathbox element in div containter
var element = document.querySelector('#canvasElement');


// Creates mathbox 
var mathbox = mathBox({
      plugins: ['core', 'controls', 'mathbox'], // removed 'cursor' to fix cursor issue, 
                                                // if we remove 'mathbox' then the thinking image happens (I don't like it)
      controls: {
        klass: THREE.OrbitControls,
      },
      element: element,
    });

if (mathbox.fallback) throw "WebGL not supported"

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(colors.cnvs), 1.0);


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
        width: 2,
        end: true,
      })
      .axis({
        axis: 2,
        width: 2,
        end: true,        
      })
      .grid({
        width: 1,
        niceX: true,
        niceY: true,
      });


// Make axes black
mathbox.select('axis').set('color', 'black');


// Calibrate focus distance for units
mathbox.set('focus', 3);


// Defines points to display
view.array({
      channels: 2,
      live: true,
      id: 'data',
      // data: is set below
    }).swizzle({
      order: "xy"
    })
    .point({
      color: colors.x,
      size: 12,//window.innerWidth*0.01,
      zIndex: 1,
    }).text({
      font: 'Helvetica',
      width:  50,
      height: 5,
      sdf: 0,
      expr: function (emit, i, j, time) {
        emit(usernameUC[i]);
      },
    })
    .label({
      color: colors.lbl,
      snap: false,
      size: 18,//window.innerWidth*0.015,
      offset: [0, 0],
      depth: .5,
      zIndex: 1,
    });

// binds data to points above
view.select('#data').set('data', [pointset]);


// Defines axis labels
view.array({
      // data: is set below
      id: 'axisLabel',
      channels: 2, // necessary
      live: false,
    }).text({
      data: ["x", "y"],
    }).label({
      color: colors.z,
      size: 15,//window.innerWidth*0.021,      
      offset: [13, 20],
      depth: .5,
      zIndex: 1,
    });

// binds data to lables above
view.select('#axisLabel').set('data', [[10,0], [0,70]]);


// Makes lowercase input and records user input, removes spaces
function splitName(name) {
  var splitNameLC = name.toLowerCase();
  return [splitNameLC.match(/[a-z]/g),name.match(/[a-zA-Z]/g)]; // allows for printing user input
}

// assigns point values
function encodeName(nameArray) {
  var points = [];
  // Shifting points to be displayed in initial grid
  for (var i = 0; i < nameArray.length; i++) {
    points.push([i+1,(nameArray[i].charCodeAt()-96)]);
  }
  return points;
}


// Defines global vars from user input
function updateName(newName) {
  console.log(newName)
  usernameToPrint = newName;
  username = splitName(usernameToPrint)[0];
  usernameUC = splitName(usernameToPrint)[1];
  pointset = encodeName(username);
  view.select('#data').set('data', [ pointset]);
  view.select('#axisLabel').set('data', [[10+pointset.length/2+1,0], [0,70]]);  
}


// Handles user input/deleting of points
d3.select('#name-input').on('keyup', function(event){
  usernameToPrint = this.value;
  if(usernameToPrint.length > 0) {
    updateName(usernameToPrint);

    // only letters reset and shift graph
    if (d3.event.keyCode >= 65 && d3.event.keyCode <= 90) {
      setupVis(username);
      nameValues(usernameUC);
      shiftView();
    }

    // delete changes graph and polynomial, but does not shift graph
    if (d3.event.keyCode == 8) {
      setupVis(username);
      deleteNameValues();      
      nameValues(usernameUC);      
    }
  }
});


// Defines the table of points
function nameValues(dataSet) {
  // d3.select("#name-table").selectAll("p")
  //   .data(dataSet)
  //   .enter()
  //   .append("p")
  //   .text(function(d,i) { 
  //     var valueString = "";
  //     var charValue = d.toLowerCase();
  //     var charIndex = i+1;

  //     charValue = charValue.charCodeAt()-96;
  //     valueString = "P(" +  charIndex + ") = " + charValue + " = " +d;

  //     return valueString; 
  //   });

  var tr = d3.select("#name-tab").selectAll('tr')
    .data(dataSet)
    .enter()
    .append('tr');

  tr.append('td')
    .text(function(d,i) { 
      var valueString = "";
      var charValue = d.toLowerCase();
      var charIndex = i+1;

      charValue = charValue.charCodeAt()-96;
      valueString = "P(" +  charIndex + ")"; // = " + charValue + " = " +d;

      return valueString; 
    })

  tr.append('td')
    .text(function(d,i) { 
      var valueString = "";
      var charValue = d.toLowerCase();
      var charIndex = i+1;

      charValue = charValue.charCodeAt()-96;
      valueString = "\xa0 = " + charValue; // + " = " +d;

      return valueString; 
    });

  tr.append('td')
    .text(function(d,i) { 
      var valueString = "";
      var charValue = d.toLowerCase();
      var charIndex = i+1;

      charValue = charValue.charCodeAt()-96;
      valueString = "\xa0 = " +d;

      return valueString; 
    });
}


// removes points from table when deleted
function deleteNameValues() {
//    d3.select("#name-table").selectAll("p")
//      .remove("p");
    d3.select("#name-tab").selectAll("tr")
      .remove("tr");
}


// Sets up the animation and polynomial in broswer
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
    width: 4,//window.innerWidth*0.003,
    color: colors.ln,
  });

  d3.select("#poly-name").html("P(x) = " + makePoly(pointset) + "<br>" + usernameToPrint);
  console.log(usernameToPrint.slice(-1));
  if(usernameToPrint.slice(-1) == 's'){
    d3.select("#png-title").html(usernameToPrint + "\' Personal Polynomial");  
  } else {
    d3.select("#png-title").html(usernameToPrint + "\'s Personal Polynomial");  
  }
  

  formatFrac();

}


// makes items in fraction class into nicer fromat with horizontal bar
function formatFrac(){
  d3.selectAll('.fraction').each(function() {
    var thisObject = d3.select(this);
    var thisValue = thisObject.html();
    var split = thisValue.split("/");
    if( split.length == 2 ){
            thisObject.html('<span class="top">'+split[0]+'</span><span class="bottom">'+split[1]+'</span>')
    }
  });
}


// Shifts the view so graph is centered
function shiftView() {

  if(play) {
    play.remove();
  }

  play = mathbox.play({
    delay: .5,
    target: 'cartesian',
    pace: 3,
    loop: false,
    script: [
      {
        props: {
          range: [startRangeX, startRangeY],
        }
      },
      {
        props: {
          range: [endRangeX(pointset), endRangeY(pointset)],
        }
      },
    ]
  });
}


// Helps with range in shiftView
function endRangeX (points) {
	var newRange = [];
	var d = startRangeX[1] - startRangeX[0];

	newRange[0] = -d/2 + points.length/2+1;
	newRange[1] =  d/2 + points.length/2+1;

	return newRange;
}


// Helps with range in shiftView
function endRangeY (points) {
	var newRange = startRangeY;
	return newRange;
}


// product of all elements in array
function arrayProduct(a) {
    var p = 1;
    for (var i = 0; i < a.length; i += 1) {
      p *= a[i];  //product
    }
    return p;
  }


// sum of all elements in array
function arraySum(a) {
    var s = 0;
    for (var i = 0; i < a.length; i += 1) {
       s += a[i];  // sum
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
            }

          }

          xfunBuilder[k].push(pointset[k][1]);

          xfunBuilder[k] = arrayProduct(xfunBuilder[k]);

        }

        return arraySum(xfunBuilder);
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
        L[n] = L[n].n.toString()+"/"+L[n].d.toString();
      }

    } else {
      L[n] = "0";
    }

  }

  // Creates the polynomial to be viewed
  var polynomial = "";

///*  
// Polynomial in Decending Degrees
  var topDeg = L.length-1;

  if (topDeg == 0) {
    if (sign[topDeg] == " - ") {
      polynomial = sign[topDeg] + "<span class='fraction' style='color:"+colors.coeff+"'>" + L[topDeg] + "</span>";
      pdfPolynomial = polynomial;
    } else {
      polynomial = "<span class='fraction' style='color:"+colors.coeff+"'>" + L[topDeg] + "</span>";
      pdfPolynomial = polynomial;
    }
  } else {
    if (sign[topDeg] == " - ") {
      polynomial = sign[topDeg] + "<span class='fraction' style='color:"+colors.coeff+"'>" + L[topDeg] + "</span> x<sup>" + topDeg + "</sup> ";
      pdfPolynomial = sign[topDeg] + "<span style='color:"+colors.coeff+"'>" + L[topDeg] + "</span> x^" + topDeg;
    } else {
      polynomial = "<span class='fraction' style='color:"+colors.coeff+"'>" + L[topDeg] + "</span> x<sup>" + topDeg + "</sup> ";
      pdfPolynomial = "<span style='color:"+colors.coeff+"'>" + L[topDeg] + "</span> x^" + topDeg;
    }
    for (var q=points.length-2; q>=0; q--) {    
      if (L[q] != 0) {
        if (q == 1 || q ==0 ) {
          if (q == 1) {
            polynomial = polynomial + sign[q] + "<span class='fraction' style='color:"+colors.coeff+"'>" + L[q] + "</span> x ";
            pdfPolynomial = pdfPolynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x ";        
          } else {
            polynomial = polynomial + sign[q] + "<span class='fraction' style='color:"+colors.coeff+"'>" + L[q] + "</span>";
            pdfPolynomial = pdfPolynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span>";        
          }
        } else {
          polynomial = polynomial + sign[q] + "<span class='fraction' style='color:"+colors.coeff+"'>" + L[q] + "</span> x<sup>" + q + "</sup> ";
          pdfPolynomial = pdfPolynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x^" + q;        
        }
      }
    }
  }
//*/

/*  
// Polynomial in ascending degrees 
  if (L[0] != 0) {

    if (sign[0] == " - ") {
      polynomial = sign[0] + "<span style='color:"+colors.coeff+"'>" + L[0] + "</span>";
      pdfPolynomial = polynomial;
    } else {
      polynomial = "<span style='color:"+colors.coeff+"'>" + L[0] + "</span>";
      pdfPolynomial = polynomial;
    }

  }


  for (var q=1; q < points.length; q++) {
//  for (var q=points.length-2; q>=0; q--) {    
    if (L[q] != 0) {
      if (q == 1) {
        polynomial = polynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x ";
        pdfPolynomial = pdfPolynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x ";        
      } else {
        polynomial = polynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x<sup>" + q + "</sup> ";
        pdfPolynomial = pdfPolynomial + sign[q] + "<span style='color:"+colors.coeff+"'>" + L[q] + "</span> x^" + q;        
      }
    }

  }
//*/
  return polynomial;
}


