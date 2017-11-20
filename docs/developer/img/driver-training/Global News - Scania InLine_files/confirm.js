var confirmDialog = function () {

	this.title 		 	= "The dialog title";
    this.message 	 	= "The dialog message";
    this.yesButton   	= "Yes";
    this.noButton 	 	= "No";
    this.AbortButton 	= null;
    this.callbackYes 	= function() {};
    this.callbackNo  	= function() {};
    this.callbackAbort  = function() {};
    this.init 		 	= init;

    function init() {
    	var self 	= this;
    	var dialog 	= $("<div class=\"dialog\">" + self.message + "</div>");
    	
    	var buttons = [{
			text: self.yesButton,
			"class": "button-yes",
			click: function() {
				$(this).dialog("close");
				self.callbackYes();
			}
		},{
			text: self.noButton,
			"class": "button-no",
			click: function() {
				$(this).dialog("close");
				self.callbackNo();
			}
		}];
    	if(self.AbortButton) {
    		buttons[2] = {
				text: self.AbortButton,
				"class": "button-abort",
				click: function() {
					$(this).dialog("close");
					self.callbackAbort();
				}
			}
    	}

	    dialog.dialog({
	        title: 		self.title,
	        width: 		'auto',
	        modal: 		true,
    		autoOpen: 	false,
    		draggable: 	false,
	        resizable: 	false,
	    	open: function ( event, ui ) {
	    		$(".ui-widget-overlay").addClass("fade");
	    		
	    		var dialog = $(event.target).parent();
	    		dialog.css({opacity:0.9, marginTop: -100}).animate({
	    			marginTop: 0,
	    			opacity: 1
				}, 300);

	    		$("button", dialog).blur();
	    		$("button.button-no", dialog).focus();
	    	},
	        buttons: buttons
	    }).parent().css({position:"fixed"}).end().dialog('open');

        $(window).resize(function() {
			dialog.dialog("option", "position", "center");
		});
	}

}

// Example
/*$(function() {
	$("a.confirm").click(function(e) {
		e.preventDefault();

		var test 			= new confirmDialog();
		test.trigger 		= $(this);
		test.callbackYes 	= function() {
			$("#staticpages p").text("y");
		};
		test.callbackNo 	= function() {
			$("#staticpages p").text("n");
		};
		test.init();
	});
});
*/
