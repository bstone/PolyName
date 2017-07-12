///////////////////////////////////////////
// Background button sectors
///////////////////////////////////////////  

// red
d3.select('#background1')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#d40606'});
    d3.select('#png-title').style({'color': 'white'});
  });

// orange
d3.select('#background2')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#ee9c00'});
    d3.select('#png-title').style({'color': 'black'});        
  });

// yellow
d3.select('#background3')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#e3ff00'});
    d3.select('#png-title').style({'color': 'black'});        
  });

// green 
d3.select('#background4')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#06bf00'});
    d3.select('#png-title').style({'color': 'black'});    
  });

// purple
d3.select('#background5')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#001a98'});
    d3.select('#png-title').style({'color': 'white'});
  });


///////////////////////////////////////////
// Download PNG
///////////////////////////////////////////  

d3.select('#download-png')
  .on("click", function() {
    var tempCanvas = document.createElement("canvas");
    var ctx = tempCanvas.getContext("2d");    

    html2canvas(document.getElementById('for-png'), {
      onrendered: function(canvas) {
        eqn = canvas.toDataURL("image/png", 1.0);
        download(eqn,usernameToPrint+"-Personal-Polynomial","png" );                      
      },
    });
});

