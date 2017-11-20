//Scania Bootstrap Documentation - Navigation

//ADD Navigation to document
$('#scania-bootstrap-docs-navigation').append('\
    <nav class="navbar navbar-default portal-navigation" role="navigation">\
      <div class="navbar-header">\
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\
          <span class="sr-only">Toggle navigation</span>\
          <span class="icon-bar"></span>\
          <span class="icon-bar"></span>\
          <span class="icon-bar"></span>\
        </button>\
        <a class="navbar-brand visible-xs" href="#" data-noclick="true"><small>Menu</small></a>\
      </div>\
      <div class="collapse navbar-collapse navbar-ex1-collapse">\
        <ul class="nav navbar-nav">\
          <li data-id="home"><a href="index.html">Home</a></li>\
          <li data-id="design-principles"><a href="design-principles.html">Design principles</a></li>\
          <li data-id="graphic-profile"><a href="graphic-profile.html">Graphic Profile</a></li>\
          <li data-id="ux-guidelines"><a href="ux-getting-started.html">Design Guidelines</a></li>\
          <li data-id="developer-guide"><a href="developer-getting-started.html">Developer Guide</a></li>\
          <li data-id="examples"><a href="examples.html">Examples</a></li>\
          <li data-id="references"><a href="references.html">References</a></li>\
          <li data-id="support"><a href="support.html">Support</a></li>\
        </ul>\
        <ul class="nav navbar-nav navbar-right">\
          <button class="btn btn-sm btn-default" type="button" id="maximize-button"><span id="maximize-icon" class="icon-fullscreen" data-step="4" data-intro="At any time you can maximize the application."></span></button>\
        </ul>\
      </div>\
      <div class="collapse navbar-collapse portal-nav-level-two collapse">\
    	  <ul class="nav navbar-nav hidden" data-id="nav-level-two-developer">\
              <li data-id="developer-getting-started"><a href="developer-getting-started.html">Getting Started</a></li>\
              <li data-id="developer-css"><a href="developer-css.html">CSS</a></li>\
              <li data-id="developer-components"><a href="developer-components.html">Components</a></li>\
              <li data-id="developer-javascript"><a href="developer-javascript.html">Javascript</a></li>\
              <li data-id="developer-icons"><a href="developer-icons.html">Icons</a></li>\
              <li data-id="developer-scania-bootstrap-classes"><a href="developer-scania-bootstrap-classes.html">Scania Bootstrap classes</a></li>\
              <li data-id="developer-print"><a href="developer-print.html">Print</a></li>\
              <li data-id="developer-support"><a href="developer-support.html">Support</a></li>\
              <li data-id="developer-recommended-tools"><a href="developer-recommended-tools.html">Recommended tools</a></li>\
              <li data-id="developer-coding-standard"><a href="developer-coding-standard.html">Coding standard</a></li>\
    	    </ul>\
          </div>\
    </nav>');
$('body').append('\<script src="https://static.scania.com/build/users/cds/1.0.0/google-analytics/google.js" type="text/javascript"></script>');

/*


*/

$('#scania-bootstrap-ux-design-navigation').append('\
    <a href="ux-additional-information.html" class="list-group-item prospect">Additional information</a>\
                        <a href="ux-advanced-tables.html" class="list-group-item prospect">Advanced Tables</a>\
                        <a href="ux-browser-reject.html" class="list-group-item prospect">Browser reject</a>\
                        <a href="ux-buttons.html" class="list-group-item">Buttons</a>\
                        <a href="ux-charts.html" class="list-group-item">Charts Plugin</a>\
                        <a href="ux-datepickers.html" class="list-group-item prospect">Datepickers</a>\
                        <a href="ux-environment-mapping.html" class="list-group-item">Environment mapping</a>\
                        <a href="ux-feedback.html" class="list-group-item">Feedback</a>\
                        <a href="ux-feedback-form.html" class="list-group-item">Feedback form</a>\
                        <a href="ux-form-submit.html" class="list-group-item prospect">Form submit</a>\
                        <a href="ux-icons.html" class="list-group-item">Icons</a>\
                        <a href="ux-input-field.html" class="list-group-item">Input fields</a>\
                        <a href="ux-introduction.html" class="list-group-item">Introduction</a>\
                        <a href="ux-scania-bootstrap-library.html" class="list-group-item">Axure Bootstrap library</a>\
                        <a href="ux-shortcuts.html" class="list-group-item">Keyboard shortcuts</a>\
                        <a href="ux-links.html" class="list-group-item prospect">Links</a>\
                        <a href="ux-pagination.html" class="list-group-item prospect">Pagination</a>\
                        <a href="ux-required-optional-fields.html" class="list-group-item">Required and optional fields</a>\
                        <a href="ux-select-and-multiselect.html" class="list-group-item ">Select and Multiselect</a>\
                        <a href="ux-sidebar-fix.html" class="list-group-item prospect">Sidebar fix</a>\
                        <a href="ux-spam-filter.html" class="list-group-item">Spam filter</a>\
                        <a href="ux-status-indication.html" class="list-group-item">Status indication</a>\
                        <a href="ux-text-case.html" class="list-group-item">Text case</a>\
                        <a href="ux-upload-files.html" class="list-group-item prospect">Upload files</a>\
                            <span class="suggestions"><i class="icon-plus"></i> <a href="ux-suggest-guideline.html" class="suggest-guideline">Suggest new guideline</a></span>');
//SET Active menu-item
if(window.location.href.match('index.html') || window.location.href.substr(window.location.href.lastIndexOf('/') + 1).length == 0){
  $('[data-id="home"]').addClass('active'); //This is home - if
}else if(window.location.href.match('developer-getting-started.html')){
  $('[data-id="developer-getting-started"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('css.html')){
  $('[data-id="developer-css"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
} // Sub menu UX starts and ends
else if(window.location.href.match('ux-')){
  $('[data-id="ux-guidelines"]').addClass('active');
    var value = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    $("[href='" + value +"']").addClass('active'); 
} //Sub menu developer starts 
else if(window.location.href.match('developer-components.html')){
  $('[data-id="developer-components"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-javascript.html')){
  $('[data-id="developer-javascript"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-icons.html')){
  $('[data-id="developer-icons"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-scania-bootstrap-classes.html')){
  $('[data-id="developer-scania-bootstrap-classes"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-print.html')){
  $('[data-id="developer-print"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-print.html')){
  $('[data-id="developer-print"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-support.html')){
  $('[data-id="developer-support"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-recommended-tools.html')){
  $('[data-id="developer-recommended-tools"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
}else if(window.location.href.match('developer-coding-standard.html')){
  $('[data-id="developer-coding-standard"]').addClass('active');
  $('[data-id="nav-level-two-developer"]').removeClass('hidden');
  $('[data-id="developer-guide"]').addClass('active');
} // Sub menu developer ends 
else if(window.location.href.match('feedback.html')){
  $('[data-id="feedback"]').addClass('active');
}else if(window.location.href.match('colorscheme.html')){
  $('[data-id="colorscheme"]').addClass('active');
}else if(window.location.href.match('prospects.html')){
  $('[data-id="prospects"]').addClass('active');
}else if(window.location.href.match('design-principles.html')){
  $('[data-id="design-principles"]').addClass('active');
}else if(window.location.href.match('graphic-profile.html')){
  $('[data-id="graphic-profile"]').addClass('active');
}else if(window.location.href.match('examples.html')){
  $('[data-id="examples"]').addClass('active');
}else if(window.location.href.match('support.html')){
  $('[data-id="support"]').addClass('active');
}else if(window.location.href.match('references.html')){
  $('[data-id="refereces"]').addClass('active');
}

// sub feddback meny handle 

jQuery( document ).ready(function( $ ) {
  $(".section").addClass("hidden");
  $("#section1").removeClass("hidden");

  $("#content-nav li").click(function(event) {
    event.preventDefault();
    var theNum = event.currentTarget.id.replace(/^\D+/g, "");

    $(".section").addClass("hidden");
    $("#section"+theNum).removeClass("hidden");

    $(".submenu").removeClass("active");
    $(event.currentTarget).addClass("active");
    $(event.currentTarget.id).removeClass("hidden");
    $(event.currentTarget.id).addClass("active");
  })

  $( window ).resize(function() {
    if(window.location.href.match('ux-feedback.html')){
      setSubMenu();
    }
  });

});

function setSubMenu(){
  //printer($( window ).width());
  var winW = $( window ).width();
    if(winW<1200){
      $("#content-nav").removeClass("nav-justified");
      $(".submenu").css("float","none");
    }else if(winW>=1200 && $("#content-nav").hasClass("nav-justified")==false){
      $("#content-nav").addClass("nav-justified");
      $(".submenu").css("float","left");
      //$(".nav-tabs.nav-justified > li").css("width","initial");
    }
}

function printer(data){
//if (window.console && window.console.log) window.console.log(data); 
}
/*

          <li data-id="feedback"><a href="feedback.html">Feedback</a></li>\
          <li data-id="colorscheme"><a href="colorscheme.html">Color Scheme</a></li>\

*/