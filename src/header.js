
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

/*
var fbIframeBegin = '<iframe id="fb-share" src="';
var fbIframeServer = 'https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fopengraph-meta-describer.herokuapp.com%2Fmap%3F';
var fbIframeCallBack = 'callback%3Dhttp%3A%2F%2Fb-stone.github.io%2FPolyName%2F%26';
var fbIframeTitle = 'title%3DThis%2520is%2520my%2520personal%2520polynomial.%26';
var fbIframeDescription = 'description%3DWhat%2520is%2520yours%3F%26';
var fbIframeSiteName = 'site_name%3DPersonal%2520Polynomial%26';
var fbIframeImage = 'image%3Dhttp%3A%2F%2F';
var fbIframeLayout = '&layout=button&mobile_iframe=true&width=59&height=20&appId'
var fbIframeEnd = '" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
//*/

// Facebook SDK variables
var fbJDKBegin = '<div id="fb-share" class="fb-share-button" data-href="http://opengraph-meta-describer.herokuapp.com/map?';
var fbJDKCallBackA = 'callback=http://http://b-stone.github.io/PolyName/&amp;';
var fbJDKTitleA = 'title=This%20is%20my%20personal%20polynomial.&amp;';
var fbJDKDescriptionA = 'description=What%20is%20yours?&amp;';
var fbJDKSiteNameA = 'site_name=Amin%20Ariana&amp;';
var fbJDKImageA = 'image=';//http://data-uri-to-img-url.herokuapp.com/rxDXJuMJ1LU';
var fbJDKMiddle = '" data-layout="button" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fopengraph-meta-describer.herokuapp.com%2Fmap%3F';
var fbJDKCallBackB = 'callback%3Dhttp%253A%252F%252Faminariana.com%26';
var fbJDKTitleB = 'title%3DThis%2Bis%2Bmy%2Bpersonal%2Bpolynomial.%26';
var fbJDKDescriptionB = 'description%3DWhat%20is%2Byours?%26';
var fbJDKSiteNameB = 'site_name%3DPersonal%2BPolynomial%26';
var fbJDKImageB = 'image%3Dhttp%253A%252F%252Fdata-uri-to-img-url.herokuapp.com%252F';//rxDXJuMJ1LU';
var fbJDKEnd = '&amp;src=sdkpreparse">Share</a></div>';


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
          Myurl = "href=" + url + ""; 

          // Stable Javascript SDK
          fbJDKImageA = fbJDKImageA+url;
          var jdkURL = url.replace(/^http:\/\/data-uri-to-img-url.herokuapp.com\//g,"");
          fbJDKImageB = fbJDKImageB+jdkURL;
          fbSocial = fbJDKBegin+fbJDKCallBackA+fbJDKTitleA+fbJDKDescriptionA+fbJDKSiteNameA+fbJDKImageA+fbJDKMiddle+fbJDKCallBackB+fbJDKTitleB+fbJDKDescriptionB+fbJDKSiteNameB+fbJDKImageB+fbJDKEnd;
          $("#social").append(fbSocial);
          FB.XFBML.parse(document.getElementById('#fb-share'));
          console.log('fb parse');

/*
          // Stable iFrame verison
          var iframeURL = url.replace(/^http:\/\//g,"");
          iframeURL = iframeURL.replace(/\//g,"%2F");
//          console.log(Myurl);
//          console.log(iframeURL);          
//          $("#fb-share").attr('src', fbIframeServer+fbIframeCallBack+fbDataTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout);
//          $("body").append('<iframe src="'+fbIframeServer+fbIframeCallBack+fbDataTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout+'" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>' );          
//          $("#social").append('<iframe id="fb-share" src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fopengraph-meta-describer.herokuapp.com%2Fmap%3Fcallback%3Dhttp%3A%2F%2Faminariana.com%26title%3DI%2520dont%2520always%2520meta-meta-describe%2520my%2520shared%2520webpages%26description%3DBut%2520when%2520I%2520do%2C%2520its%2520because%2520I%2520forgot%2520to%2520meta%2520describe%2520them%2520in%2520the%2520original%2520code%26site_name%3DAmin%2520Ariana%26image%3Dhttp%3A%2F%2F'+iframeURL+'&layout=button&mobile_iframe=true&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');          
          var fbIframe = fbIframeBegin+fbIframeServer+fbIframeCallBack+fbIframeTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout+fbIframeEnd;
          var fbSrc = fbIframeServer+fbIframeCallBack+fbIframeTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout;
//          console.log(fbIframe);
//          $(document).ready(function(){
//          $(window).load(function(){
//            $("#social").append(fbIframe);
//          });
//*/

          console.log('on load');

          // Add the graph (maybe just link the data uri?)
          $("#graph").append("<img src=" + url + ">");          
        },
        error:function(shr, status, data){
          console.log("error " + data + " Status " + shr.status);
        },
      });
}

/*
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
*/
