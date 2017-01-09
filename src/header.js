
/*
d3.select("#nav-bar").html(`
	<div class="navbar-header">
	  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	    <span class="sr-only">Toggle navigation</span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
	  </button>
	  <a class="navbar-brand" href="./index.html">Personal Polynomial</a>	  
	  <a class="navbar-brand" href="./details.html">Make PDF</a>
	</div>`
	);
*/
//var testContent = "";



d3.select("#social-link").on("click", function() {
//	d3.select("#fb-description").property(content="Did this work?");
	window.sessionStorage.setItem("testContent", "it worked!!");
	window.sessionStorage.setItem("testImage", three.renderer.domElement.toDataURL("image/png", 1.0));
	}
	);

function onSocialLoad() {
	d3.select("#test-id").html(window.sessionStorage.getItem("testContent"));
	var testImageVar = window.sessionStorage.getItem("testImage");
//	d3.select("#test-id").property(src="http://www.jderry.com/2015/images/link.jpg");


	var data = [{id: 1, text: 'sample text 1', imgsrc: testImageVar},
            {id: 3, text: 'sample text 3', imgsrc: 'http://placehold.it/100x100'},
            {id: 4, text: 'sample text 4', imgsrc: 'http://placehold.it/100x100'}];

	var gallery = d3.select('body').append('div');

	var container = gallery.selectAll('.container')
		.data(data, function(d) { return d.id; });
	    
	container.enter().append('div')
	    .attr('class', 'container')

	container.exit().remove();
	        
	        
	container.selectAll('.text')
	    .data(function(d) { return [d]; })
	    .enter().append('p')
	    .attr('class', 'text')
	    .text(function(d) { console.log(d); return d.text; });

	container.selectAll('.picture')
	    .data(function(d) { return [d]; })
	    .enter().append('img')
	    .attr('class', 'picture')
	    .attr('src', function(d) { return d.imgsrc; });

	    printHTML();
	    console.log(Myurl);
//	    getHTML(); //does not work yet
}

var Myurl = "boo";
function printHTML() {
	  var imageData = window.sessionStorage.getItem("testImage");
	  var imageDataRaw = imageData.replace(/^data:image\/\w+;base64,/, "");
      //$("textarea").html(imageDataRaw);
      $.ajax({
        url: "http://data-uri-to-img-url.herokuapp.com/images.json",
        type: "POST",
        data: { 'image': { 'data_uri': imageDataRaw } },
        xhrFields: {
          // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
          // This can be used to set the 'withCredentials' property.
          // Set the value to 'true' if you'd like to pass cookies to the server.
          // If this is enabled, your server must respond with the header
          // 'Access-Control-Allow-Credentials: true'.
          withCredentials: false
        },
        success:function(data){
          console.log(data);
          url = data['url'];
          Myurl = "href=" + url + ""; // not assigning var??
          console.log(Myurl);
          console.log("Why no pring?");
          $("body").append("<img src=" + url + ">");
          $("body").append("<p id='get-url'><a href=" + url + ">" + url + "</a></p>");          
        },
        error:function(shr, status, data){
          console.log("error " + data + " Status " + shr.status);
        },
      });
}

function getHTML() {
	console.log(Myurl);
	Myurl = d3.select("#get-url").html();
	console.log(Myurl);	
      $.ajax({
        url: "http://opengraph-meta-describer.herokuapp.com/map?",
        type: "GET",
        data: { 'title': 'This is a test',
        		'image': Myurl,
        		'callback': 'http://math.adelphi.edu'
        	},
        xhrFields: {
          // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
          // This can be used to set the 'withCredentials' property.
          // Set the value to 'true' if you'd like to pass cookies to the server.
          // If this is enabled, your server must respond with the header
          // 'Access-Control-Allow-Credentials: true'.
          withCredentials: false
        },
        success:function(data){
          console.log(data);
          nurl = data['url'];
          $("body").append("<p><a href=" + nurl + ">" + nurl + "</a></p>")
//          $("body").append("<img src=" + nurl + ">")
        },
        error:function(shr, status, data){
          console.log("error " + data + " Status " + shr.status);
        },
      });
}

//d3.select("#fb-image")