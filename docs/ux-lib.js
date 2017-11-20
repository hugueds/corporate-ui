
// window.onload = function() {
//   document.querySelector("html").style.display = 'block';
// }

setTimeout(function(){ document.querySelector("html").style.display = 'opacity'; }, 0);

// var brand = window.location.hostname.split('.')[0];

// if (brand === 'corporate-ui' || brand === 'static') {
//   brand = 'scania';
// }



// if(document.location.href.indexOf("corporate-ui") > -1)
// {
//   $('body').attr('data-env', 'demo');
// }

// if (brand === 'porsche') {
//   var fileref = document.createElement("link");
//   fileref.rel = "stylesheet";
//   fileref.type = "text/css";
//   fileref.href = "//static.scania.com/development/global/css/brands/porsche.css";
//   document.getElementsByTagName("head")[0].appendChild(fileref);
// } 

// if (brand === 'man') {
//   var fileref = document.createElement("link");
//   fileref.rel = "stylesheet";
//   fileref.type = "text/css";
//   fileref.href = "//static.scania.com/development/global/css/brands/man.css";
//   document.getElementsByTagName("head")[0].appendChild(fileref);

//    $("a.style-scope.nav-item").attr("href", "http://www." + brand + ".eu/")
  
// } 

// if (brand === 'volkswagen') {
//   var fileref = document.createElement("link");
//   fileref.rel = "stylesheet";
//   fileref.type = "text/css";
//   fileref.href = "//static.scania.com/development/global/css/brands/volkswagen.css";
//   document.getElementsByTagName("head")[0].appendChild(fileref);
  
// } 

// if (brand === 'audi') {
//   var fileref = document.createElement("link");
//   fileref.rel = "stylesheet";
//   fileref.type = "text/css";
//   fileref.href = "//static.scania.com/development/global/css/brands/audi.css";
//   document.getElementsByTagName("head")[0].appendChild(fileref);
  
// } 

// if (brand === 'spotify') {
//   var fileref = document.createElement("link");
//   fileref.rel = "stylesheet";
//   fileref.type = "text/css";
//   fileref.href = "//static.scania.com/development/global/css/brands/spotify.css";
//   document.getElementsByTagName("head")[0].appendChild(fileref);
  
// } 



// $('body').removeClass('scania').addClass(brand);

// $('body.' + brand + ' :not(script)').contents().filter(function() {
//     return this.nodeType === 3;
//   }).replaceWith(function() {
//     var brandCap = brand.toLowerCase().replace(/\b[a-z]/g, function(letter) {
//       return letter.toUpperCase();
//     });
//     if(brandCap === 'Man') {
//       brandCap = 'MAN';
//     }
//     return this.nodeValue.replace(/Scania/g, brandCap);
//   });

	// Triggers when corporate-ui has finnised loading

document.addEventListener('corporate-ui-loaded', function(e) {

  document.body.className += ' done-loading';

});