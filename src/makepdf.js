d3.select('#make-pdf')
  .on("click", function() {
    var dataURL = three.renderer.domElement.toDataURL("image/png", 1.0);

    var doc = new jsPDF();

    doc.setFontSize(40);
    doc.text(35, 25, "Personal Polynomial!");
    doc.addImage(dataURL, 'png', 15, 40, 180, 90);
    doc.fromHTML(usernameToPrint + " = ",20, 150, { // this may not need the from HTML, it is just a string.
      'width': 170, 
      });    
    doc.fromHTML(pdfPolynomial,25, 155, {
      'width': 165, 
      });
    var filename = usernameUC.join("");
    doc.save(filename+'.pdf');
  });