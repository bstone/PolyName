
d3.select('#background1')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#d40606'})
  });

d3.select('#background2')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#ee9c00'})
  });

d3.select('#background3')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#e3ff00'})
  });

d3.select('#background4')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#06bf00'})
  });

d3.select('#background5')
  .on('click', function() {
    d3.select('#for-png').style({'background-color': '#001a98'})
  });

// var getImadeData = function () {
//     var i = arguments.length,
//         tempCanvas = document.createElement("canvas"),
//         ctx = tempCanvas.getContext("2d");
// //     while (i--) {
//         ctx.drawImage(arguments[0], 0, 0);
//         ctx.drawImage(arguments[1], 20, 20);        
// //    };
//     return tempCanvas.toDataURL("image/png", 1.0);
// };

///////////////////////////////////////////
// Download All The Things
///////////////////////////////////////////  

d3.select('#make-graph-eqn')
  .on("click", function() {
    var tempCanvas = document.createElement("canvas");
//    tempCanvas.width = 1200;
//    tempCanvas.height = 600;
    var ctx = tempCanvas.getContext("2d");    
//    var img = new Image;

    html2canvas(document.getElementById('for-png'), {
      onrendered: function(canvas) {
        eqn = canvas.toDataURL("image/png", 1.0);
//        img.src = eqn;        
//        ctx.drawImage(img,0,0);        
//        var graph = tempCanvas.toDataURL("image/png", 1.0);        
        download(eqn,usernameToPrint+"-Personal-Polynomial","png" );                      
    console.log("one");        
      },
    });


    // html2canvas(document.getElementById('poly-name'), {
    //   onrendered: function(canvas) {
    //     eqn = canvas.toDataURL("image/png", 1.0);
    //     img.src = eqn;        
    //     ctx.drawImage(img,20,500);        
    // console.log("one");        
    //   },
    // });

    // console.log(img.src);

    // var img2 = new Image;
    // html2canvas(document.getElementById('testme'), {
    //   onrendered: function(canvas) {
    //     console.log(canvas);
    //     eqn = canvas.toDataURL("image/png", 1.0);
    //     img2.src = eqn;        
    //     ctx.drawImage(img2,800,20);          
    //     var graph = tempCanvas.toDataURL("image/png", 1.0);        
    //     download(graph,usernameToPrint+"-Did-It-Graph","png" );              
    //     console.log("two");
    //   },
    // });



    // html2canvas(document.getElementById('poly-name'), {
    //   onrendered: function(canvas) {
    //     ctx.drawImage(canvas,200,200)
    //   },
    // });



    console.log(tempCanvas)    


});



d3.select('#make-pdf')
  .on("click", function() {
    var dataURL = three.renderer.domElement.toDataURL("image/png", 1.0);
    console.log(dataURL);
    var dataURIFrac;
//    var htmlFrac = document.getElementById("poly-name").innerHTML;
//    var dataURIFrac = 'data:text/html,' + encodeURIComponent(htmlFrac);
/*
    var node = document.getElementById('poly-name');
    domtoimage.toPng(node)
      .then (function (dataUrl) {
//          var img = new Image();
//          img.src = dataUrl;
          console.log(dataUrl);
          dataURIFrac = dataUrl;
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
//*/

    html2canvas(document.getElementById('for-pdf'), {
      onrendered: function(canvas) {
        dataURIFrac = canvas.toDataURL("image/png", 1.0);
        console.log(dataURIFrac);
        console.log("makePDF");
//        makePDF(dataURL,dataURIFrac);
        sitePDF(dataURIFrac);
        console.log("done");
    //    document.body.appendChild(canvas);
      },
    });

  });

function sitePDF(dataURIFrac){
    var doc = new jsPDF();

    doc.setDrawColor(255,0,0);
    doc.rect(5, 5, 200, 287 );

    doc.setFontSize(40);
    doc.text(35, 25, "Personal Polynomial!");
    doc.setFontSize(14);    

    doc.addImage(dataURIFrac, 'png', 10, 40, 200, 100);

    doc.text(25, 200, "Like you, the above polynomial is the only one of its kind!");    
    doc.text(25, 205, "It is the only polynomial of its degree that passes through");    
    doc.text(25,210, "the points on the right.");    

    var filename = usernameUC.join("");
    doc.save(filename+'.pdf');

}

///*
function makePDF(dataURL,dataURIFrac){
    var doc = new jsPDF();

    doc.setDrawColor(255,0,0);
    doc.rect(5, 5, 200, 287 );

    doc.setFontSize(40);
    doc.text(35, 25, "Personal Polynomial!");
    doc.setFontSize(14);    
//    doc.addImage(dataURL, 'png', 15, 40, 180, 90);
    doc.fromHTML(usernameToPrint + " = ",20, 140, { // this may not need the from HTML, it is just a string.
      'width': 170, 
      });    
    doc.addImage(dataURIFrac, 'png', 15, 40, 200, 200);
    doc.fromHTML(pdfPolynomial,25, 145, {
      'width': 130, 
      });
    doc.fromHTML(d3.select('#name-table').html(),165, 140, {
      'width': 30, 
      });    

    doc.text(25, 200, "Like you, the above polynomial is the only one of its kind!");    
    doc.text(25, 205, "It is the only polynomial of its degree that passes through");    
    doc.text(25,210, "the points on the right.");    



    var filename = usernameUC.join("");
    doc.save(filename+'.pdf');
  }
//*/    

///////////////////////////////////////////
// Download Graph
///////////////////////////////////////////

d3.select('#make-graph')
  .on("click", function() {
    var graph = three.renderer.domElement.toDataURL("image/png", 1.0);
    download(graph,usernameToPrint+"-Polynomial-Graph","png" )          
//    downloadURI(dataURL,usernameToPrint+"-Polynomial-Graph.png");
});

///////////////////////////////////////////
// Download Equation
///////////////////////////////////////////  

d3.select('#make-eqn')
  .on("click", function() {
      html2canvas(document.getElementById('poly-name'), {
        onrendered: function(canvas) {
          eqn = canvas.toDataURL("image/png", 1.0);
          download(eqn,usernameToPrint+"-Polynomial-Eqn","png" )          
//          downloadURI(eqn,usernameToPrint+"-Polynomial-Eqn.png");        
        },
      });
});

///////////////////////////////////////////
// Download Graph and Equation
///////////////////////////////////////////

// d3.select('#make-graph-eqn')
//   .on("click", function() {
//       html2canvas(document.getElementById('poly-name'), {
//         onrendered: function(canvas) {
//           var graph = three.renderer.domElement//.toDataURL("image/png", 1.0)
//           canvas.getContext('2d').drawImage(graph, 500, 500, 500, 500);
//           eqn = canvas.toDataURL("image/png", 1.0);
//           download(eqn,usernameToPrint+"-Polynomial-Eqn","png" )          
// //          downloadURI(eqn,usernameToPrint+"-Polynomial-Eqn.png");        
//         },
//       });
// });


// http://stackoverflow.com/a/15832662
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

// Safari 3.0+ "[object HTMLElementConstructor]" 
function isSafari(){
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
}

// http://stackoverflow.com/a/9851769
// Opera 8.0+
//var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
//var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
//var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
//var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
//var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
//var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
//var isBlink = (isChrome || isOpera) && !!window.CSS;



// TODO
//1) Is it too complicated to have the user's graph and the equation in the same image, 
//and that's why they are separate buttons? (Nothing to fix here as I know you've done 
//so much already, I just want to understand the answer as I need to encourage people 
//to share one or the other on social media, but they are interrelated.) 

//(ME) It’s not too complicated. I just thought people would like to have an option of having 
//just one. I can make a button to download both as well. (Seems hard right now)

//2) Can the NMF and Global Math Week logos and site URL go on the PDF template, or that 
//is also too complicated? (If people / teachers choose to print and share, it would be 
//great if there was some obvious connection to the events!) - see attachment for one 
//suggested layout that would let the file be something that could be printed and seen 
//from more of a distance without adding many elements to what you have.

//(ME) I can make the PDF look how you have. I will work on that this weekend. 

//3) Can we rename the text on the download buttons to "Download PDF", "Download graph image", 
//and "Download your equation”?  (In general, although I'd like to believe the website users to 
//be sophisticated enough to get that the arrow symbol means "click to download", user experience 
//feedback leads me to think that making it a bit more obvious would be helpful.)

//(ME) I will do this. (DONE)

//4) When do you need the final text for the page? If you're ready for us to send, I can work on 
//this with James and share with David Eisenbud for a final check from MSRI's end.

//(ME) I can put the final text on the sight whenever you want. That is the easy part. Once I have a 
//link to the video and the text I will add that information. 



