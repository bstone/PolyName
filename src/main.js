
// Global Vars

//var usernameLabel = []; // initialize for labels
var username = []; // initialize for labels
var usernameToPrint;
var pointset = [];
var maxVal = -100;// help with scaling
var minVal = 100;

var startRangeX = [-1,19];
var startRangeY = [-30,70];

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
    }


function newName() {
    location.reload();
}


d3.select('#delete-char')
  .on("click", function() {
    username = username.slice(0,username.length-1);
  });


d3.select('#add-char')
  .on("click", function() {
    if (username.length < pointset.length) {
      username = username+"a";
    }
  });

/*
// Initialize sliders
var scaleSlider = document.getElementById('scale-slider');
noUiSlider.create(scaleSlider, {
    start: [1500],
    tooltips: true,
    range: {
  'min': [0],
  'max': [6000]
}
});
//*/


var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
    });
if (mathbox.fallback) throw "WebGL not supported"

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

divContainer = document.getElementById( 'canvasElement');
document.getElementById('container').appendChild( divContainer );

//three.renderer = new THREE.WebGLRenderer();


//console.log(width);
//console.log(window.innerWidth);

three.renderer.setSize( width, height); 
divContainer.appendChild( three.renderer.domElement );


//d3.selectAll('#canvasElement').append(three.renderer.domElement);
//console.log(mathbox);


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
        scale: [2, 1],
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
/*
    .transform({
      scale: dataRanges.slice(0,3).map(function(d,i){return i ? 1/d : 2/d}),
      position: dataScaledMinimums.slice(0,3).map(function(d,i){return i ? -d : -2*d}),
    })
*/
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
      color: 'white', //'#30A0FF',
      snap: false,
      size: window.innerWidth*0.023,
      offset: [0, 0],
      depth: .5,
      zIndex: 1,
    });


view.select('#data').set('data', [ pointset]);
//console.log(view.select('#data')); 


function splitName(name) {
	var splitName = name.toLowerCase();
	return splitName.match(/[a-z]/g);
}


function encodeName(nameArray) {
	var points = [];
	// Shifting points to be displayed in initial grid
    for (var i = 0; i < username.length; i++) {
    	pointset.push([i,(username[i].charCodeAt()-96)]);          
    }
    return points;	
}

d3.select('#name-input').on('keyup', function(event){
//    console.log(this.value.substr(this.value.length - 1).match(/[a-z]/i) != null);  
//    if (this.value.substr(this.value.length - 1).match(/[a-z]/i)[0] != null) {
        
        username = this.value.toLowerCase();
        usernameToPrint = this.value;

        console.log(username);

//        username = splitName(this.value);
//        usernameToPrint = this.value;
//        usernameLabel = username;


       
        
//        console.log(username[0].match(/[a-z]/i) != null);
//    }
    });


d3.select('#view-poly')
    .on("click", function() {

      username = username.match(/[a-z]/g);
//      usernameLabel = username;

//     //console.log(username.match(/[a-z]/g));
      //username = username.match(/[a-z]/g);
      //usernameLabel = username;
      //usernameLabel = username;

      setupVis(username);

//      console.log(usernameLabel);

});
      


function setupVis(nameArray) {
	encodeName(nameArray)
//	console.log(pointset);
//	console.log(usernameLabel);


      var data =
        view.interval({
          expr: function (emit, x, i, time) {
              var t = time/1.25 - 5;
              if (x < t && x < nameArray.length) {
                emit(x, lagrange(x));
              }
            },
          width: 512,
          channels: 2,
//          history: 90,
          live: true, // allows for the delete letter and add letter feature
//          factorX: 1,
//          factorY: 1,
          }).line({
          width: window.innerWidth*0.004,
          color: colors.ln,
//          color: 'white',
          });
/*
   view.vector({
      color: 'red',//0x3080FF,
      width: 30,
      start: true,
      end: false,
    });
*/
  
// console.log(maxVal);

      d3.select("#view-poly").html("Success!").classed("btn btn-lg btn-success", true); 

      d3.select("#typed-name").html(usernameToPrint+" = " + makePoly(pointset));

//      document.getElementById("delete-char").disabled = false; // Turns button off, but I don't like the looks.
//      document.getElementById("add-char").disabled = false; // Turns button off, but I don't like the looks.

//    d3.select("#add-char").attr( 'disabled', 'false'); // why doesn't this work? It seems to change it, but nothing happens.

      document.getElementById("view-poly").disabled = true; // Turns button off, but I don't like the looks.
//    d3.select("#view-poly").attr( 'id', 'null');

//    var n = -pointset[0][0];

/*
    var valIndex = pointset[0][0];
    var tmpLag;  

      while (valIndex < Math.floor(username.length/2-1/2)) {
        tmpLag = lagrange(valIndex);
        if (tmpLag > maxVal) {maxVal = tmpLag};            
        if (tmpLag < minVal) {minVal = tmpLag};                    
        valIndex = valIndex + 1/2; // characters of name are spaced by one
      }
//*/

///*
    var play = mathbox.play({
      target: 'cartesian',
      pace: 6,
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
//*/

//mathbox.select('axis').set('color', 'black');


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

/*
//    var button = document.querySelector('#button');

    var symbols =     [
      'B',
      'r',
      'a',
      'n',
      'd',
      'e',
      'n',
      '!',
    ];


    // Define VDOM handler to clone real DOM elements
//   var clone = MathBox.DOM.createClass({
//      render: function (el, props, children) {
//        var button = children.cloneNode(true);
//        return button;
//      },
//    });

    // Define VDOM handler to format 'latex' into an HTML span
    var latex = MathBox.DOM.createClass({
      render: function (el) {
        this.props.innerHTML = katex.renderToString(this.children);
        return el('span', this.props);
      }
    });

    mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls,
      },
      loop: {
        start: window == window.top,
      },
      camera: {
        near: .01,
        far: 1000,
      }
    });
    three = mathbox.three;

    three.camera.position.set(-1, 1, 2.5);
    three.camera.lookAt(new THREE.Vector3())
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    view = mathbox
    .set({
      scale: null,
    })
    .polar({
      range: [[-2, 2], [-1, 1], [-1, 1]],
      scale: [2, 1, 1],
      bend: .25
    });

    view.interval({
      width: 48,
      expr: function (emit, x, i, t) {
        y = Math.sin(x + t / 4) * .5 + .75;
        emit(x, y);
      },
      channels: 2,
    })
    .line({
      color: 0x30C0FF,
      width: 16,
    })
    .resample({
      width: 8,
    })
    .point({
      color: 0x30C0FF,
      size: 60,
    })
    .html({
      width:  8,
      height: 1,
      expr: function (emit, el, i) {
        // Emit Characters
        var color = ['#30D0FF','#30A0FF'][i%2];
        emit(el(latex, {style: {color: color}}, symbols[i]));
      },
    })
    .dom({
      snap: false,
      offset: [0, 32],
      depth: 0,
      zoom: 1,
      outline: 2,
      size: 30,
    });
//*/


/*
  // This function will fire everytime a keypress occurs in the name input
  // TODO: deal with copy/paste and other inputs.
  d3.select('#name-input').on('keyup', function(event){
    var dataset = this.value;

    console.log(dataset);   


      var circles = svg.selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle");

      circles.attr("cx", function(d, i) {
//          d = d.charCodeAt();
            return (i * 50) + 25;
          })
           .attr("r", 9)
           .attr("cy", function(d) {
            d = d.charCodeAt();            
            return d;
           })
           .attr("fill", "yellow")
           .attr("stroke", "orange")
           .attr("stroke-width", function(d) {
            d = d.charCodeAt();            
            return d/2;
           });

console.log(circles);
  })
*/  


