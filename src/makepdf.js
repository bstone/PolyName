
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
    var dataURL = three.renderer.domElement.toDataURL("image/png", 1.0);
    download(dataURL,usernameToPrint+"-Polynomial-Graph","png" )          
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

