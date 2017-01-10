
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
var fbDataServer = "http://opengraph-meta-describer.herokuapp.com/map?";
var fbDataCallback = "callback=http://aminariana.com&";
var fbDataTitle = "title=I%20don't%20always%20meta-meta-describe%20my%20shared%20webpages&";
var fbDataDescription = "description=But%20when%20I%20do,%20it's%20because%20I%20forgot%20to%20meta%20describe%20them%20in%20the%20original%20code&";
var fbDataSiteName = "site_name=Amin%20Ariana&";
var fbDataImage = "image=http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Jonathan_Goldsmith_2009.jpg/400px-Jonathan_Goldsmith_2009.jpg";

var fbServer = "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fopengraph-meta-describer.herokuapp.com%2Fmap%3F";
//"callback%3Dhttp%253A%252F%252Faminariana.com%26";
//"title%3DI%2Bdon%2527t%2Balways%2Bmeta-meta-describe%2Bmy%2Bshared%2B";
//"webpages%26description%3DBut%2Bwhen%2BI%2Bdo%252C%2Bit%2527s%2Bbecause%2BI%2Bforgot%2Bto%2Bmeta%2Bdescribe%2Bthem%2Bin%2Bthe%2Boriginal%2Bcode%26";
//"site_name%3DAmin%2BAriana%26";
//"image%3Dhttp%253A%252F%252Fupload.wikimedia.org%252Fwikipedia%252Fcommons%252Fthumb%252F2%252F2a%252FJonathan_Goldsmith_2009.jpg%252F400px-Jonathan_Goldsmith_2009.jpg&amp;";
//"src=sdkpreparse"

var fbIframeServer = "https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fopengraph-meta-describer.herokuapp.com%2Fmap%3F";
var fbIframeCallBack = "callback%3Dhttp%3A%2F%2Faminariana.com%26";
var fbIframeTitle = "title%3DI%2520don't%2520always%2520meta-meta-describe%2520my%2520shared%2520webpages%26";
var fbIframeDescription = "description%3DBut%2520when%2520I%2520do%2C%2520it's%2520because%2520I%2520forgot%2520to%2520meta%2520describe%2520them%2520in%2520the%2520original%2520code%26";
var fbIframeSiteName = "site_name%3DAmin%2520Ariana%26";
var fbIframeImage = "image%3Dhttp%3A%2F%2F";
var fbIframeLayout = "&layout=button&mobile_iframe=true&width=59&height=20&appId";

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
//          var fbDataImage = "image="+url;
          var iframeURL = url.replace(/^http:\/\//g,"");
          iframeURL = iframeURL.replace(/\//g,"%2F");
          console.log(Myurl);
          console.log(iframeURL);          
          console.log("Why no pring?");
//          $("#fb-share").attr('src', fbIframeServer+fbIframeCallBack+fbDataTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout);
//          $("body").append('<iframe src="'+fbIframeServer+fbIframeCallBack+fbDataTitle+fbIframeDescription+fbIframeSiteName+fbIframeImage+iframeURL+fbIframeLayout+'" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>' );          
          $("body").append("<img src=" + url + ">");          
//          $("#fb-share").attr('data-href', fbDataServer+fbDataCallback+fbDataTitle+fbDataDescription+fbDataSiteName+fbDataImage);
//          $("#fb-share").attr('href', fbServer+fbDataCallback+fbDataTitle+fbDataDescription+fbDataSiteName+fbDataImage);          
//          $("body").append("<p id='get-url'><a href=" + url + ">" + url + "</a></p>");          
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

d3.select("#dothis").on("click", function(){
  var dothis = "do this now!";
//  d3.select("fb-share").property("data-href", dothis );  
//  document.getElementById("fb-share").style.datahref='do this now!';  
//  console.log("do this pleasddde");
  console.log(dothis);  
//    $(".fb-share").attr('data-href',encodeURIComponent(location.href));
  console.log(document.getElementById("fb-share"));
});

//  var dothis = "do this now!";
//  d3.select("#fb-share").on("load", function() {
//    $("#fb-share").attr('data-href',encodeURIComponent(location.href));
//    console.log(Myurl);
//    d3.select(this).property("data-href", dothis );
//  });
// http://opengraph-meta-describer.herokuapp.com/map?callback=http://aminariana.com&amp;title=Personal%20Polynomial&amp;description=This%20is%20my%20personal%20polynomial%20What%20is%20yours&amp;site_name=Personal%20Polynomial&amp;image=http://data-uri-to-img-url.herokuapp.com/TGdGx9AFiDU );  
//  console.log("do this fb!!");
//  console.log(Myurl);      

//$(document).ready(function() {

//  console.log(Myurl);
//});

//http://opengraph-meta-describer.herokuapp.com/map?callback=http://aminariana.com&title=I%20don't%20always%20meta-meta-describe%20my%20shared%20webpages&description=But%20when%20I%20do,%20it's%20because%20I%20forgot%20to%20meta%20describe%20them%20in%20the%20original%20code&site_name=Amin%20Ariana&image=http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Jonathan_Goldsmith_2009.jpg/400px-Jonathan_Goldsmith_2009.jpg



