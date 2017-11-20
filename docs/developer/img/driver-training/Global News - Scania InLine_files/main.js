$(function() {
    // Fix compatibility issue if Scania bootstrap is loaded
    if($("#cds").length > 0) {
        $.fn.bsTooltip = $.fn.tooltip.noConflict();
    }
});

var profileTooltip = function () {

    /* Tooltip attributes (default values) */

    this.trigger        = "a.profile";
    this.triggerEvent   = null;
    this.showDelay      = 500;
    this.hideDelay      = 2000;
    this.id             = "trigger.attr('rel')";
    this.apihost        = "inline.scania.com";
    this.body           = function () {

        /* We are using a function here that are returning the array so that when we are removing empty elements we do that only for that instance of this.body */

        return [
            {"tag":"li","class":"picture_url","html":"<span style=\"background-image: url('${picture_url}'); filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${picture_url}', sizingMethod='scale');\"></span>"},
            {"tag":"li","class":"preferred_name","html":"<a href=\"${profile_url}\">${preferred_name}</a>"},
            {"tag":"li","class":"jobposition","html":"${jobposition}"},
            {"tag":"li","class":"organisation_acronym","html":"${organisation_acronym} - ${organisation_name}"},
            {"tag":"li","class":"building","html":"${city} - ${building}"},
            {"tag":"li","class":"mobile","html":"Mob. <span>${mobile}</span>"},
            {"tag":"li","class":"telephone","html":"Tel. <span>${telephone}</span>"},
            {"tag":"li","class":"collapse","id":"form","html":"${social_post_form}"}
        ];
    };
    this.footer         = [
        {"tag":"a","class":"email icon","href":"mailto:${email}","html":"${email}","title":"${email}"},
        {"tag":"a","class":"user icon","href":"${profile_url}","html":"Profile","title":"View full profile"},
        {"tag":"a","class":"agora icon","href":"${social_url}","html":"Agora","title":"View Agora profile","target":"_blank","children":[
            {"tag":"span","class":"common_followers","html":"${social_common_followers}","title":"Followers in common on Agora"}
        ]},
        {"tag":"a","class":"btn btn-agora btn-xs","id":"agorarelation","html":"${social_relation}"},
        {"tag":"a","class":"btn btn-agora btn-xs","id":"agorapost","html":"${social_post}","data-target":"#form","data-toggle":"collapse"}
        /* {"tag":"img","class":"flag","src":"//www.wahlgmbh.com/static/i18n/flags/${country}.png"  } */ 
    ];
    this.position       = {
        my:         "left top+5",
        at:         "left bottom",
        collision:  "flipfit flipfit"
    };
    this.callback       = function () {};
    this.init           = init;


    /* Tooltip is initiated in the init */

    function init () {

        var self         = this;
        var cardTrigger  = $(this.trigger);
        var triggerEvent = this.triggerEvent;
        var jsondata = null;

        $(document).on('click', function() {
            cardTrigger.tooltip("close");
        });

        cardTrigger.attr("title", "");

        cardTrigger.on({
            mouseover: function () {
                cardTrigger.tooltip("close");

                window.clearTimeout( window.cardHideDelay );
            },
            mouseout: function ( event ) {

                /* We need to set this when a profile card is visible so that we do not stop propagation for the delay on tooltip */
                if($(".profilecard").is(":visible")) {
                    event.stopImmediatePropagation();
                }

                /* Reset the load card content delay */
                window.clearTimeout( window.cardLoadDelay );

                window.cardHideDelay = setTimeout( function() {
                    cardTrigger.tooltip("close");
                }, self.hideDelay);

            }
        });

        cardTrigger.tooltip({
            content: function ( callback ) {
                var trigger     = $(this);
                var url         = "https://" + self.apihost + "/api/user/" + eval(self.id) + "/profilecard.json";
                var cachedHtml  = trigger.attr("data-html");

                if(!cachedHtml) {

                    /* Load the content only when the profile card is displayed.*/
                    /* This delay is used instead of standard tooltip delay because we load the data with ajax */
                    window.cardLoadDelay = setTimeout( function() {

                        $.ajax({
                            url:            url + "?callback=?",
                            contentType:    "application/json",
                            jsonpCallback:  'profilecard',
                            scriptCharset:  'UTF-8',
                            dataType:       'jsonp',
                            type:           'GET',
                            async:          false,
                            cache:          false,
                            success: function ( data ) {
                                jsondata = data;
                                var body = self.body();

                                if(data.api[0].hits > 0) {

                                    /* Make country lowercase */
                                    // data.user[0].country = data.user[0].country ? (data.user[0].country).toLowerCase() : "se";

                                    /* Check if any empty values exist and remove those */
                                    $.each(data.user[0], function(key, value) {
                                        if(value == "") {

                                            $.each(body, function(key1, value1) {
                                                if(value1 && value1['class'] == key) {

                                                    body[key1] = undefined;

                                                }
                                            });

                                        }
                                    })

                                    var transform = {
                                        "tag":      "ol",
                                        "children": [
                                            body,
                                            {"tag":"li","class":"footer","children": [
                                                self.footer
                                            ]}
                                        ]
                                    };

                                    var cardContent = json2html.transform(data.user, transform);
                                    //console.log(transform)

                                    trigger.attr("data-html", cardContent);

                                    /* We need a timeout here for this not to trigger at start of hover event */
                                    setTimeout( function() {

                                        /* In jQuery 1.9 is(:hover) do not work this is a work around */
                                        if($(trigger.selector + ":hover").is(self.trigger)) {
                                            callback(cardContent);
                                        }
                                    }, 1);

                                } else {
                                    /* User not found in profilecard API */
                                }
                            },
                            fail: function (e) {
                                return e.message;
                            }
                        });

                    }, self.showDelay);

                } else {

                    trigger.tooltip({
                        show: {
                            delay: self.showDelay
                        },
                        position: self.position
                    });

                    /* This displays a cached profile card */
                    return cachedHtml;
                }
            },
            open: function ( event, ui ) {

                var trigger = $(this);
                var target  = $(ui.tooltip[0]);

                target.addClass("profilecard bootstrap");

                /* Make it possible to mark text in the card */
                target.on('click', function ( event ) {
                    event.stopPropagation();
                });

                /* We need to set the card position when we know how big the card is */
                self.position.of = trigger;
                target.position(self.position);

                /* Solves the problem not showing footer icons in ie */
                /* This is caused by the footer being displayed absolute and hapens when loading from cached data */
                setTimeout( function() {
                    target.focus();
                }, self.showDelay);

                /* hide button if social_relation_url is empty = not relevant to show buttons */
				if (jsondata.user[0].social_relation_url === "") {
					$("#agorarelation").hide();
					$("#agorapost").hide();
				}
				else {
					/* Solve the follow/unfollow url */
					$("#agorarelation").click(function() {
						// alert(jsondata.user[0].social_relation);
						//$("#agorarelation").attr("disabled", "disabled");
						updateRelation(jsondata.user[0].social_relation_url, trigger);
					});
					// console.log($("#agorarelation"));

                    if (jsondata.user[0].social_post_url != "") {
                        $("#agorapost").click(function() {
                            //updateProfilePost(jsondata.user[0].social_post_url);
                            //console.log(jsondata.user[0].social_post_form);
                            $("#form").collapse("toggle")
                        });
                    };
				}

                $(function(){
                    $("#form").on("show.bs.collapse", function(){
                        $('#agorapost').addClass('active');
                    });
                    $("#form").on("hide.bs.collapse", function(){
                        $('#agorapost').removeClass('active');
                    });
                    $('.cancel').click(function(){
                        $('#form').collapse('toggle');
                    })
                    $('.submit').click(function(){
                        // $('#form .alert').toggleClass('hidden');
                        // var textarea = $('#form textarea');
                        // textarea.val('');
                    });
                });

                /* Hide card on mouseout after some time */
                target.on({
                    mouseover: function () {
                        window.clearTimeout( window.cardHideDelay );
                    },
                    mouseout: function ( event ) {

                        window.cardHideDelay = setTimeout( function() {
                            trigger.tooltip("close");
                        }, self.hideDelay);

                    }
                });

                self.callback();

            }
        }).on("touch");

        /* If trigger event is something else from mouseover then do this */
        // There is a bug in this, when displaying a cached profile card while using click event
        if(this.triggerEvent) {
            cardTrigger.on(self.triggerEvent, function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).tooltip("open");
            });
            cardTrigger.off("mouseover");
        }
    }
    
    function updateRelation (url, trigger) {

        url = trigger.attr("data-state-url") || url;

		//alert('post this: ' + url);
		// $("#agorarelation").attr("disabled", "disabled");
        var test = 0;
        $.ajax({
			url:			url,
            contentType:	"application/json",
            jsonpCallback:	'social',
            scriptCharset:	'UTF-8',
            dataType:		'jsonp',
            type:			'GET',
            async:			false,
            cache:			false,
            success: function ( data ) {
				// var body = self.body();
				//console.log(data);
				
				if(data.api[0].hits > 0) {
					//alert(data);
					$("#agorarelation").html(data.social[0].social_relation);
					$("#agorarelation").off("click");
					$("#agorarelation").click(function() {
						updateRelation(data.social[0].social_relation_url, trigger);
					});

                    var cardHtml = $(trigger.attr("data-html"));
                    $("#agorarelation", cardHtml).html(data.social[0].social_relation);
                    trigger.attr("data-html", cardHtml.prop('outerHTML'));
                    trigger.attr("data-state-url", data.social[0].social_relation_url);
				}
			},
            fail: function (e) {
                return e.message;
            }
		});
		// $("#agorarelation").removeAttr("disabled");
	}

    // function updateProfilePost (url) {
    //     // alert(url);
    //     $.ajax({
    //         url:            url + "?callback=?",
    //         contentType:    "application/json",
    //         jsonpCallback:  'social',
    //         scriptCharset:  'UTF-8',
    //         dataType:       'jsonp',
    //         type:           'GET',
    //         async:          false,
    //         cache:          true,
    //         success: function ( data ) {
                
    //             if(data.api[0].hits > 0) {
    //                 alert('Done!');
    //             }
    //         }
    //     });
    // }

}

function updateProfilePost (url) {
    //alert($("#profilePostPrivate").val());
	if($("#profilePostMessage").val() == "") {
		$("#profileErrorEmptyMessage").toggleClass('hidden');
		$("#profilePostMessage").focus();
		return;
	}
    $.ajax({
        url:            url,
        contentType:    "application/json",
        jsonpCallback:  'social',
        scriptCharset:  'UTF-8',
        dataType:       'jsonp',
        type:           'GET',
        async:          false,
        cache:          true,
        data:           {'postmessage':$("#profilePostMessage").val(), 'postprivate':$("#profilePostPrivate").val()},
        success: function ( data ) {
            if(data.api[0].hits > 0) {
                // $("#form .alert").toggleClass('hidden');
                $("#profileConfirmMessage").toggleClass('hidden');
                window.setTimeout(function(){
                    $('#form').collapse('toggle');
                    // $('#form .alert').toggleClass('hidden');
                    $("#profileConfirmMessage").toggleClass('hidden');
					$("#profileErrorEmptyMessage").toggleClass('hidden');
                    var textarea = $('#form textarea');
                    textarea.val('');
                }, 2000);
            }
            else {
                $("#profileErrorMessage").toggleClass('hidden');
                window.setTimeout(function(){
                    $('#form').collapse('toggle');
                    $("#profileErrorMessage").toggleClass('hidden');
					$("#profileErrorEmptyMessage").toggleClass('hidden');
                    var textarea = $('#form textarea');
                    textarea.val('');
                }, 2000);
            }
        }
    });
}

$(function() {

    /* Available settings */
    // wikiTooltip.trigger
    // testTooltip.triggerEvent
    // wikiTooltip.delay
    // wikiTooltip.id
    // wikiTooltip.body
    // wikiTooltip.footer
    // wikiTooltip.position


    /* For use on wiki */

/****    
    $(".mw-userlink").removeClass("new");

    $(".mw-userlink").each(function() {
        var id = $(this).attr("href").split('User:')[1];
        $(this).attr("href", "http://devinline.scania.com/profile/" + id)
    });

    var wikiTooltip   = new tooltip();
    wikiTooltip.trigger = ".mw-userlink";
    wikiTooltip.delay = 500;
    wikiTooltip.id    = "trigger.attr('href').split('profile/')[1]";

    wikiTooltip.init();

**/
    /* For use on Inline */
  /**  
    var inlineTooltip   = new tooltip();
    inlineTooltip.trigger = ".iconenvelope";

    inlineTooltip.init();
**/


})