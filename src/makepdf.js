d3.select('#make-pdf')
  .on("click", function() {
    var dataURL = three.renderer.domElement.toDataURL("image/png", 1.0);

    var doc = new jsPDF();

    doc.setDrawColor(255,0,0);
    doc.rect(5, 5, 200, 287 );

    doc.setFontSize(40);
    doc.text(35, 25, "Personal Polynomial!");
    doc.setFontSize(14);    
    doc.addImage(dataURL, 'png', 15, 40, 180, 90);
    doc.fromHTML(usernameToPrint + " = ",20, 140, { // this may not need the from HTML, it is just a string.
      'width': 170, 
      });    
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
  });