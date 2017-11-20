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
          <li data-id="getstarted"><a href="getstarted.html">Get started</a></li>\
          <li data-id="css"><a href="css.html">CSS</a></li>\
          <li data-id="components"><a href="components.html">Components</a></li>\
          <li data-id="javascript"><a href="javascript.html">Javascript</a></li>\
          <li data-id="icons"><a href="icons.html">Icons &amp; Fonts</a></li>\
          <li data-id="feedback"><a href="feedback.html">Feedback</a></li>\
          <li data-id="colorscheme"><a href="colorscheme.html">Color Scheme</a></li>\
          <li data-id="pages"><a href="pages.html">Pages</a></li>\
          <li data-id="prospects"><a href="prospects.html">Prospects</a></li>\
        </ul>\
        <ul class="nav navbar-nav navbar-right">\
          <button class="btn btn-sm btn-default" type="button" id="maximize-button"><span id="maximize-icon" class="icon-fullscreen"></span></button>\
        </ul>\
      </div>\
    </nav>\
');

//SET Active menu-item
if(window.location.href.match('index.html') || window.location.href.substr(window.location.href.lastIndexOf('/') + 1).length == 0){
  $('[data-id="home"]').addClass('active'); //This is home - if
}else if(window.location.href.match('getstarted.html')){
  $('[data-id="getstarted"]').addClass('active');
}else if(window.location.href.match('css.html')){
  $('[data-id="css"]').addClass('active');
}else if(window.location.href.match('components.html')){
  $('[data-id="components"]').addClass('active');
}else if(window.location.href.match('javascript.html')){
  $('[data-id="javascript"]').addClass('active');
}else if(window.location.href.match('icons.html')){
  $('[data-id="icons"]').addClass('active');
}else if(window.location.href.match('feedback.html')){
  $('[data-id="feedback"]').addClass('active');
}else if(window.location.href.match('colorscheme.html')){
  $('[data-id="colorscheme"]').addClass('active');
}else if(window.location.href.match('prospects.html')){
  $('[data-id="prospects"]').addClass('active');
}else if(window.location.href.match('pages.html')){
  $('[data-id="pages"]').addClass('active');
}