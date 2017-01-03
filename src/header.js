
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

d3.select("#fb-div").on("click", function() {
	d3.select("#fb-description").property(content="Did this work?");
	d3.select("#test-id").html("it worked!!");
	}
	);

//d3.select("#fb-image")