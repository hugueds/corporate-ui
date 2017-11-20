
$(function() {
    $( ".search-box .scania-icon-search" ).click(function() {
      $("primary-items .nav-item" ).toggleClass( "search-fade" );
    });
});

// Scripts for keeping the state of the sticky main menu

function autoHideHeader () {
  window.scrollTo({ top: 76, left: 0, behavior: 'smooth' });
  Cookies.set('c-main-navigation', 'sticky', { expires: 1 });
  Cookies.set('c-last-visited-domain', window.location.host, { expires: 1 });
}

function getHeaderState() {
  if (Cookies.get('c-main-navigation') == 'sticky') {
    window.scrollTo({ top: 76, left: 0, behavior: 'instant' });
  }
  if ((Cookies.get('c-main-navigation') != 'showHeader') && (Cookies.get('c-main-navigation') != 'sticky' )) {
    setTimeout(autoHideHeader, 2450);
  }
}

window.onbeforeunload = function(e) {
  if($(window).scrollTop() == 0) {
    Cookies.set('c-main-navigation', 'showHeader', { expires: 1 });
  }
  else {
    Cookies.set('c-main-navigation', 'sticky', { expires: 1 });
  }
};


//setTimeout(getHeaderState, 550);

document.addEventListener('corporate-ui.loaded', getHeaderState, false);
