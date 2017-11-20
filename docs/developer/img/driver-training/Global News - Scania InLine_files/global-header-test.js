
/*
This file is used for javascripts that is used widley used
over the different Scania IT-Platforms such as the Portal,
InLine, Agora and Team Room. Using the same script url
will increase loading speed as files will be picked from the local cache.
*/


/*** GENERIC FUNCTIONS ***/
// Toggle Class on object
function gh_toggleClass(object, nameOfClass) {
  if(object != null) {
    if(object.className.match(nameOfClass)){
      object.className = object.className.replace(nameOfClass, '').replace(/\s*$/, '');
    } else {
      object.className += object.className ? " " + nameOfClass : nameOfClass;
    }
  }
}

/*** COOKIE HANDLING FUNCTIONS ***/
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==" ") c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/*** GLOBAL HEADER RELATED SCRIPTS ***/

var entertext = ""; // used by quicknav, we should rename it
var header_update_ask = true;  // Only do Ajax call first time
var ghCookieName = "global_header_show";

if(!apihost) {
  var apihost = "inline.scania.com";
}

if(document.location.href.indexOf("&freemode=y") > -1 || document.location.href.indexOf("&targetfolderid=") > -1)  {
  // Page is shown i freemode or targetfolderid is present in URL! Skip global header
  // Do nothing...
} else if (window.attachEvent && !window.addEventListener) {
   // Client is old IE browser, do nothing now. Show the old header (hidden on page) when DOM is loaded
   $( document ).ready(function() {
    $( "#top" ).show();            // Show old header
    $( "#inlinetop" ).show();      // Show old header on wiki
    $( "#menu #current" ).show();  // Show user name in left menu
   });

} else if($("#globalheader").length > 0 && window.location.href.indexOf("inlinegateway.scania.com/") < 0) {
  // Create the header if there is a globalheader div. Do not show this header on (pre)inlinegateway!

  // Fake black header if it is visible
  ghSetFakeHeader();
  ghGetContent();

  var headerRendering = function (headercontent) {

    ghRemoveFakeHeader();


    // Copy dynamic content to headercontent
    var allcontent = headercontent.content.replace("[[askQuestionContent]]", headercontent.askQuestionContent);
    var allcontent = allcontent.replace("[[shareEmailLink]]", headercontent.shareEmailLink);
    // Insert content in header
    $( "#globalheader" ).html(allcontent);

    // Set variables
    var el_domBody = document.getElementsByTagName("body")[0]; //<body unresolved>
    var el_globalHeader = document.getElementById("global_header"); //Hide-button
    var el_ghHideButton = document.getElementById("header-hidden-link"); //Hide-button
    var el_ghHideIcon = document.getElementById("gh-hide"); //Hide-button Icon
    // additional vars for wiki-elements
    var el_wikiLeft = document.getElementById("mw-panel");
    var el_wikiTop = document.getElementById("mw-head");

    // Toggle Global Header hide-icon (arrow up / down)
    function gh_toggleHideIcon() {
      if(el_ghHideIcon.className.match('icon-chevron-down')){
        el_ghHideIcon.className = el_ghHideIcon.className.replace('icon-chevron-down', 'icon-chevron-up');
      } else {
        el_ghHideIcon.className = el_ghHideIcon.className.replace('icon-chevron-up', 'icon-chevron-down');
      }
    }

    // Function is triggered when hide-button is clicked
    function hideButtonClicked() {
      gh_toggleClass(el_domBody,"goshow");
      gh_toggleHideIcon();

      //Set cookies
      if(readCookie(ghCookieName) == "true") {
        createCookie(ghCookieName, "false");
      } else {
        createCookie(ghCookieName, "true");
      }
    }

    // Event-listner on ghHideButton (IE8-fix - use deprecated "attachEvent" if addEventListener does not work)
    if (!el_ghHideButton.addEventListener) {
        // IE8
        el_ghHideButton.attachEvent("onclick", hideButtonClicked);
    }
    else {
        el_ghHideButton.addEventListener("click", hideButtonClicked, false);
    }

    // Read cookie, toggle Global header if cookie is present.

    if(readCookie(ghCookieName) == "true"|| !readCookie(ghCookieName)) {
      createCookie(ghCookieName, "true");
      gh_toggleClass(el_domBody,"goshow");
      gh_toggleHideIcon();
    }

    window.setTimeout(function(){
      // Turn on transition
      gh_toggleClass(el_domBody,"gh-transition-active");
      gh_toggleClass(el_wikiLeft,"gh-transition-active");
      gh_toggleClass(el_wikiTop,"gh-transition-active");
      gh_toggleClass(el_globalHeader,"gh-transition-active");
    }, 1000);

    // Update dynamic content from API
    if(headercontent.showAgoraNotice) {
      $('.agora-notice').removeClass("hidden");
    }
    if(headercontent.isWikiCategory) {
      // Search "This wiki category only"
//      $('[name=filter]').val(headercontent.sourcePageName);
      $('[name=keyword-valuefacet]').val(headercontent.sourcePageName);
      $('#search-opt-wikicatonly').removeClass("hidden");
    }

    $('.search-opt').click(function() {
      $('.search-opt').removeClass('disabled');
      $('.search-opt i').addClass('hidden');
      $(this).toggleClass('disabled');
      $(this).find('i').toggleClass('hidden');
      var text = $(this).find('a').text()
      $('#button-label').text(text)
    });

    var agoraq_menu = $('.dropdown-submenu');
    var agoraq = $('#sub');
    var pending = false;
    var cancel_hide = false;

    agoraq_menu.mouseenter(function(){
      // om pending Ã¤r true, sÃ¤tt cancel_hide till true,
      // pending sÃ¤tts till sann 300ms efter man lÃ¤mnat menyn med muspekaren
      if(pending) {cancel_hide = true}
      // annars lÃ¤gger vi till klassen showme pÃ¥ agorafrÃ¥gan
      else {
        $('#sub').addClass('showme');
      }
    });

    agoraq_menu.mouseleave(function(){
      // Leaving menu
      pending = true;
      setTimeout(function(){
        // Efter 300ms sÃ¤tter vi den till false
        pending = false;
        if(cancel_hide == false){ agoraq.removeClass('showme'); }
        // om cancel_hide Ã¤r false tar vi bort klassen showme frÃ¥n agorafrÃ¥gan
        cancel_hide = false;
      }, 300);
    });

    var search_field = $($('.form-group input')[1]);
    $(search_field).focus(function(){
      if($('body').hasClass('mediawiki')){
        var top_pos = $(window).scrollTop();
      }
      else {
        var top_pos = $(window).scrollTop() + 52;
      }
      window.setTimeout(function(){
        var left_pos = $(search_field).position().left;
        $('#QuikNavResult').css({left: left_pos, top: top_pos});
      }, 400);
    });
    $(window).resize(function(){
      var left_pos = $(search_field).position().left;
      $('#QuikNavResult').css({left: left_pos});
    });
  };
}

// Get content for Global header from API
function ghGetContent() {

  $.ajax({
    url:            "https://" + apihost + "/api/header/foo/globalheader.json",
    contentType:    "application/json",
    jsonpCallback:  'globalheader',
    scriptCharset:  'UTF-8',
    dataType:       'jsonp',
    type:           'GET',
    async:          false,
    cache:          true,
    data:           {"referrer":document.location.href},
    success: function ( data ) {
      
      if(data && data.api[0].hits > 0) {
        headerRendering(data.result[0]);
      } else {
        console.log("Failed to load header API data");
      }
    }
  });
}

function ghSetFakeHeader() {
  if(readCookie(ghCookieName) == "true") {
    $("#globalheader").css( "height", "51px" ) ;
    $("#globalheader").css( "background-color", "#222222" ) ;
  //  $("#globalheader").css( "background-color", "blue" ) ;
    $("#globalheader").css( "border-color", "#fff");
    $("#globalheader").css( "margin-bottom", "1px");
  }
}

function ghRemoveFakeHeader() {
  if(readCookie(ghCookieName) == "true") {
    $("#globalheader").css( "height", "" ) ;
    $("#globalheader").css( "margin-bottom", "");
  }  
}

// Send notification that current user has read the "Ask a colleugue" question
function ghSendAskRead(urlIn, qid) {

  if(!urlIn) console.log("url is undefined!");

  if(header_update_ask) {

    $.ajax({
      url:            urlIn,
      contentType:    "application/json",
      jsonpCallback:  'askread',
      scriptCharset:  'UTF-8',
      dataType:       'jsonp',
      type:           'GET',
      data:           { "questionid": qid },
      async:          false,
      cache:          true,
      success: function ( data ) {
      // Success or error does not matter
      }
    });
  // Remember that Ajax call has been done
  $('.agora-notice').hide("slow");
  header_update_ask = false;
  }
};

function ghUpdateShareAgora (url) {

    if($("#ghPostMessage").val() == "") {
      // Prevent empty message
      $("#ghErrorEmptyMessage").toggleClass('hidden');
      $("#ghPostMessage").focus();
      return;
    }
    $("#ghErrorEmptyMessage").addClass('hidden');
    $("a btn").addClass('btn-disabled');

    $.ajax({
        url:            url,
        contentType:    "application/json",
        jsonpCallback:  'social',
        scriptCharset:  'UTF-8',
        dataType:       'jsonp',
        type:           'GET',
        async:          false,
        cache:          true,
        //data:           {'postmessage':$("#ghPostMessage").val() },
        data:           {'postmessage':$("#ghPostMessage").val(), 'linkUrl': window.location.href, 'linkTitle': window.document.title },
        success: function ( data ) {
            if(data.api[0].hits > 0) {
                $("#ghConfirmMessage").toggleClass('hidden');
                window.setTimeout(function(){
                    $("#ghConfirmMessage").toggleClass('hidden');
                    var textarea = $('#ghPostMessage');
                    textarea.val('');
					$('#agora-share-modal').modal('toggle');
                }, 2000);
            }
            else {
                $("#ghErrorMessage").toggleClass('hidden');
                $('#ghErrorMessage .close').click(function(){
                  $('#ghErrorMessage').toggleClass('hidden');
                });
            }
        }
    });
}

function ghShareEmail(sender) {
  var currentUrl =  window.location.href;
  window.location.href = "mailto:?subject=Tip on information at Scania&body=Have you seen this?<br /><br />" + /* encodeURIComponent(currentUrl) +*/  "<br /><br />Best regards<br />" + sender;
}

