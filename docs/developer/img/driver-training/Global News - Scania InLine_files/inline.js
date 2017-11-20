var searchOnGoing=false;
function pop(url,windowName,params) {
  var newpage = window.open(url,windowName,params);
  newpage.focus();
}

function doWait(){
 var wait = window.open('/pleaswait.htm','wait','status=1,width=240,height=180,resizable=no,scrollbars=no,left=320,top=150');
 wait.focus();
}

function rtrim ( s ){
	return s.replace( /\s*$/, "" );
}

function openInMain(newurl) {
window.opener.parent.MainFrame.location.href = newurl;
window.close();
}

function removesubscr(channel) {
    if(confirm('Are you sure you want to remove this channel from My Channels?')) {
       location.href = '../pub/showdoc.p?docid=663&channelid=' + channel;
    }
}

function confirmGeneral(url, txt, title, submitFlag)
{	
	doAbort = true;
	var thebox = new confirmDialog();
	thebox.callbackYes 	= function() {
		doAbort = false;
		if (submitFlag = "true") {
			document.forms[0].action = url;
			document.forms[0].submit();
		}
		else {
			self.document.location = url;
		}
	};
	thebox.title = title;
	thebox.message = txt;
	thebox.init();
}

function confirmDelete(url, txt)
{	
	doAbort = true;
	var thebox = new confirmDialog();
	thebox.callbackYes 	= function() {
		doAbort = false;
		self.document.location = url;
	};
	thebox.title = "Delete";
	thebox.message = txt;
	thebox.init();
}

function changeSortOrder(value) {
	var endpos, newUrl = '' + window.location;
	var startpos = newUrl.indexOf('DocStore_sortorder=');
	if (startpos > 0) {
	endpos = newUrl.indexOf('&', startpos);
		if (endpos < 1 || endpos < startpos) {
			endpos = newUrl.length;
		}
		else {
		}

	newUrl = newUrl.substr(0, startpos) + 'DocStore_sortorder=' + String(value) + newUrl.substr(endpos);
	}
	else
	{
		newUrl = newUrl + '&DocStore_sortorder=' + String(value);
	}
	window.location = newUrl;
}


function AddToMyShortcuts()
{
	var newURL;
	var regexp1 = "=" ;
	var regexp2 = "?" ;
	var regexp3 = "&" ;
	var i;
	var str;

	var realName;

	newURL = eval("'" + window.location + "'");


	realName = CheckIfShortcutExists(newURL);
	if(realName != null)
	{
 		if(confirm("You already have a shortcut to this page called \"" + realName + "\".\nDo you want to change the name of this shortcut or copy its web address (URL)?") == false) return ;
	}

	for(i=0; i<=newURL.length; i++)
	{
		str = newURL.substr(i, 1);
		if (str != "")
		{
			if ( str.indexOf("=") >= 0 )
			{
				newURL = newURL.replace(regexp1,'@');
			}
			else if ( str.indexOf("?") >= 0 )
			{
				newURL = newURL.replace(regexp2,'$');
			}
			else if ( str.indexOf("&") >= 0 )
			{
				newURL = newURL.replace(regexp3,'£');
			}
		}
	}

	pop('../../cm/pub/showdoc.p?docid=2120&headline=ADD%20TO%20MY%20SHORTCUTS&URL=' + newURL,'AddToMyShortcuts','status=1,width=660,height=420,resizable=yes,scrollbars=yes,left=90,top=20');
}

function submit_frm1(){
   var str = rtrim(document.frm1.searchwords.value);
   var out = '.'; // replace this
   var add = ' '; // with this
   var temp = '' + str; // temporary holder
   var regexp1 = "&" ;
   var regexp2 = "=" ;
   var i;
   var str;
   

   if (searchOnGoing==true){
       return false;
   }
   searchOnGoing=true;
   if (document.frm1.search) {
       document.frm1.search.disabled=true;
   }
   for(i=0; i<=temp.length; i++){
	str = temp.substr(i, 1);
	if (str != "") 
	{
		if ( str.indexOf("&") >= 0 ) {
			temp = temp.replace(regexp1,'%26');
		}
		else if ( str.indexOf("=") >= 0 ) {
			temp = temp.replace(regexp2,'%3D');
		}
	}
   }

   while (temp.indexOf(out)>-1) {
          pos= temp.indexOf(out);
          temp = "" + (temp.substring(0, pos) + add +
          temp.substring((pos + out.length), temp.length));
   }

   // alert(temp);
   document.frm1.searchwords.value = temp;
   str = rtrim(document.frm1.searchwords.value);
   if(str.length < 1){
	 alert('You have to enter at least one character!');
	 document.frm1.searchwords.value = '';
	 document.frm1.searchwords.focus();
	 return false;
   }
   else {
   	//document.frm1.searchitems.value = 'All';
    //document.frm1.hp.value = 'on';
    //document.frm1.page.value = 'on';
    //document.frm1.orgchart.value = 'on';
    //document.frm1.whoiswho.value = 'on';
    //document.frm1.menucat.value = 'on';
    //document.frm1.docstore.value = 'on';
    //document.frm1.file.value = 'on';
    //document.frm1.sl.value = 'on';
    //document.frm1.il.value = 'on';
    //document.frm1.channel.value = 'on';
    //document.frm1.message.value = 'on';
    //document.frm1.article.value = 'on';
    //document.frm1.searchhits.value = '30';
    //document.frm1.searchsortorder.value = 'Relevance';

  	 document.frm1.searchwords.value = rtrim(document.frm1.searchwords.value);
	 var wait = window.open('/pleaswait.htm','wait','status=1,width=240,height=180,resizable=no,scrollbars=no,left=320,top=150');
     wait.focus();
     if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
     if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
	 return true;
   }
}

function setPageHeight(){
    // Define variables
	var menuHeight = 0;		// Variable with height on left menu
	var headHeight = 0;		// Variable with height on mainhead or hpmainhead
	var invisibleHeadHight = 0;	// If mainhead or hpmainhead are empty - compensate rightwrap
	var rightMenuHeight = 0;	// Variable with height on rightmenuarea in main-div
	var mainHeight = 0;		// Variable with height on contentarea in main-div
	var mainMaxHeight = 0;		// Highest div in main-div
	var heightMax = 0;		// Highest div on side
	// alert('setPageHeight');
	// Set menu or toggle height
	if(document.getElementById('menu')){
		menuHeight = document.getElementById('menu').offsetHeight;
	}
  if(document.getElementById('menu2')){
		menuHeight = document.getElementById('menu2').offsetHeight;
	}
   if(document.getElementById('admmenu')){
		menuHeight = document.getElementById('admmenu').offsetHeight;
	}
  if(document.getElementById('admmenu2')){
		menuHeight = document.getElementById('admmenu2').offsetHeight;
	}


	// Set main- or hpmainhead height
	if(document.getElementById('mainhead') || document.getElementById('hpmainhead')  ){
		if (document.getElementById('mainhead')){
			headHeight = document.getElementById('mainhead').offsetHeight;
		}
		if (document.getElementById('hpmainhead')){
			headHeight = document.getElementById('hpmainhead').offsetHeight;
		}
		if (headHeight < 20){ headHeight = 10; invisibleHeadHight = 10; }
	}

	// Set right- or hprightwrap height
	if(document.getElementById('rightwrap') || document.getElementById('hprightwrap')  ){
		if ( document.getElementById('rightwrap') ){
			rightMenuHeight = document.getElementById('rightwrap').offsetHeight;
		}
		if ( document.getElementById('hprightwrap') ){
			rightMenuHeight = document.getElementById('hprightwrap').offsetHeight;
		}
		if ( rightMenuHeight < 20){ rightMenuHeight = 0; }
	}

        if ( document.getElementById('paper') ){
			mainHeight = mainHeight + document.getElementById('paper').offsetHeight;
		}
         if ( document.getElementById('main') ){
			mainHeight = mainHeight + document.getElementById('main').offsetHeight;
		}


	// Set main height
	if( document.getElementById('hpleft') || document.getElementById('hpfloatleft') || document.getElementById('left') || document.getElementById('fullarea')  ){
		if ( document.getElementById('hpleft') ){
			mainHeight = document.getElementById('hpleft').offsetHeight;
		}
		if ( document.getElementById('hpfloatleft') ){
			mainHeight = document.getElementById('hpfloatleft').offsetHeight;
		}
		if ( document.getElementById('left') ){
			mainHeight = document.getElementById('left').offsetHeight;
		}
		if ( document.getElementById('fullarea') ){
			mainHeight = document.getElementById('fullarea').offsetHeight;
		}
		if ( document.getElementById('regnewleft') ){
			mainHeight = mainHeight + document.getElementById('regnewleft').offsetHeight;
		}
		if ( mainHeight < 20 ) { mainHeight = 0; }
	}


	// Compare rightMenuHeight and mainHeight and set highest
	if ( headHeight > 20 || mainHeight > 20){
		if ( rightMenuHeight >= mainHeight ) { mainMaxHeight = rightMenuHeight; }
		else { mainMaxHeight = mainHeight; }
	}

	// Compare mainMaxHeight and menuHeight and set highest
	if ( mainMaxHeight > 20 || menuHeight > 20 ) {
		if( mainHeight >= menuHeight){ heightMax = mainHeight;}
		else {heightMax = menuHeight;}
	}

	// Set min height on page
	if ( heightMax < 800 ) {heightMax = 800;}

	// If there is an item - set height
	// if ( document.getElementById('menu') ){
		// document.getElementById('menu').style.height = heightMax + headHeight + "px";
        // document.getElementById('menu').style.maxHeight = heightMax + headHeight + "px";
	// }
	if ( document.getElementById('menu2') ){
		document.getElementById('menu2').style.height = heightMax + headHeight + "px";
	}
	if ( document.getElementById('admmenu') ){
      if ( document.getElementById('menu') ){ document.getElementById('menu').style.height = heightMax + headHeight + 57 + "px"; }
		 document.getElementById('admmenu').style.height = heightMax + headHeight + 57 + "px";
	}
	if ( document.getElementById('admmenu2') ){
      if ( document.getElementById('menu2') ){ document.getElementById('menu2').style.height = heightMax + headHeight + 57 + "px"; }
		 document.getElementById('admmenu2').style.height = heightMax + headHeight + 57 + "px";
	}

	// if ( document.getElementById('admmain') ){
		// document.getElementById('admmain').style.height = heightMax + headHeight + 40 + "px";
	// }
	if ( document.getElementById('toggle') ){
		document.getElementById('toggle').style.height = heightMax + headHeight + "px";
	}
	if ( document.getElementById('fullarea') ){
		document.getElementById('fullarea').style.height = heightMax + invisibleHeadHight + "px";
	}
	if ( document.getElementById('left') ){
		document.getElementById('left').style.height = heightMax - 40 + "px";
	}
	if ( document.getElementById('rightwrap') ){
		document.getElementById('rightwrap').style.height = heightMax + invisibleHeadHight + "px";
	}
	if ( document.getElementById('hpleft') ){
		document.getElementById('hpleft').style.height = heightMax - 40 + "px";
	}
	// if ( document.getElementById('hpfloatleft') ){
		// document.getElementById('hpfloatleft').style.height = heightMax - 40 + "px";
	// }
	// if ( document.getElementById('hprightwrap') ){
		// document.getElementById('hprightwrap').style.height = heightMax + invisibleHeadHight + "px";
	// }
    if ( document.getElementById('hprightwrapPreview') ){
		document.getElementById('hprightwrapPreview').style.height = heightMax + headHeight + 8 + "px";
	}

	/*--- New check for adding more correct height to container - 30 jan 2014 ---*/
	var pageElements = $("#menu, #hpfloatleft, #hprightwrap, #left, #rightwrap");
	pageElements.css("height", "");

	/* Map through all elements and set the maximum value of height + margin to top as maxArea */
    var maxArea = Math.max.apply(pageElements, $.map( pageElements , function(e){ return $(e).outerHeight() + $(e).position().top; }) );
    
    /* Go through all elements and set correct height */
    pageElements.each(function() {
    	var padding = $(this).outerHeight() - $(this).height();
    	var position = $(this).position().top;

    	$(this).height(maxArea - padding - position);
    });

   // check if span myPos
   if ( document.getElementById('mypos') ){
      document.all['mypos'].scrollIntoView(true);
   }
   // open DocStore
   if (document.getElementById('openDocStores')){
   var docStoreFound=true;
   var i=0;
   var string2='';
   var id='';
   var number='';
      var openDocStores=document.getElementById('openDocStores').value;
      if (openDocStores != '') {
         sString = openDocStores.split(':');
         // alert(openDocStores + '\n' + docStoreFound);
         do{
            string2='';
            string2=sString[i];
            // alert(string2);
            if (string2=='') {
               docStoreFound=false;
            }
            else{
               // open DocStore
                id=string2;
               // alert(string2 + '\n' + openDocStores + '\n' + i);
               openDocStore(id,'true','');

            }
            i++;
         }
         while(docStoreFound == true)
      }
   }

   // konfrr: WHAT IS THE PURPOSE OF THIS???
var sIE7Doc = '';
/* relaod iFrames */
if (document.getElementById('staticpages')) {
   sIE7Doc=document.getElementById('staticpages');
}
else if (document.getElementById('admpage')) {
   sIE7Doc=document.getElementById('admpage');
}
if(sIE7Doc != ''){
  var iIE7frames=sIE7Doc.getElementsByTagName('iframe');
  for (var iIE7=0;iIE7<iIE7frames.length;iIE7++){
      var fIE7 = document.getElementById(iIE7frames[iIE7].id);
//      fIE7.src = fIE7.src;
  }
}

 setIndexLine();
} // setPageHeight

function setChannelMessageToActive(id){
 var div='';
 if(id != ''){
    div = 'msg_' + id;
    if (document.getElementById(div)){
       document.getElementById(div).className = 'chosen';
    }
 }
 else{
   div = 'home';
   if (document.getElementById('channelhome')){
      document.getElementById('channelhome').className = 'channelhomeActive';
	  document.getElementById('channelhome').style.backgroundColor = '#EEE';
   }
 }

   setPageHeight();
} // setChannelMessageToActive



function popupMailMsg(subject,body,url) {
	body = body.replace("#_and_#", "&");
	var doc = "mailto:?subject=" + subject.replace("#_and_#", "%26") + "&body=" + encodeURIComponent(body);
	doc = doc.replace('%23_url_%23', escape(url));
	window.location = doc;
} // popupMailMsg


function popupMailMessage(subject,body) {
   var doc = "mailto:?subject=" + escape(subject) + "&body=" + escape(body);
   window.location = doc;
} // popupMailMessage

function validateEmailAddress(fieldname)
{
	if (document.forms.length > 0) {
   		var field = document.forms[0];
   		for (i = 0; i < field.length; i++) {
   			fn = field.elements[i].name;

			if (fn == fieldname)
			{
				var strAttEmail;
				var correctEmail = true;
				var errorMessage = "The email address is not correct!\n \nThe following characters are not allowed in the email address:\nå ä ö Å Ä Ö : ? & % #";
				var re = /^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/;

				strEmail	= field.elements[i].value;
				strEmail	= strEmail.replace( /\s*$/, "" );
				correctEmail = re.test(strEmail);

				if (strEmail.search(/[åäöÅÄÖ\:\?&%#]/) != -1)
				{
					correctEmail = false;
				}
				if (correctEmail == false)
				{
					alert(errorMessage);
					field.elements[i].focus();
					return false;
				}
				return true;
			}
		}
	}
}

setToggleStatus('expand');

function expand() {
	Set_Cookie('togglestatus','expand',''); 
	e=document.getElementById('toggle');
	e.style.display = 'none';
	e=document.getElementById('menu');
	e.style.display = '';
}

function collaps() {
	Set_Cookie('togglestatus','collaps',''); 
	e=document.getElementById('menu');
	e.style.display = 'none';
	e=document.getElementById('toggle');
	e.style.display = '';
}

function setToggleStatus(action) { 
	if (Get_Cookie('togglestatus')) { 
		var ToggleStatus = Get_Cookie('togglestatus'); 
	} else { 
		Set_Cookie('togglestatus',action,''); 
	}
}

function Get_Cookie(name) {
	var start = document.cookie.indexOf(name+'='); 
	var len = start+name.length+1; 
	if ((!start) && (name != document.cookie.substring(0,name.length))) return null; 
	if (start == -1) return null; 
	var end = document.cookie.indexOf(';',len); 
	if (end == -1) end = document.cookie.length; 
	return unescape(document.cookie.substring(len,end)); 
}

function Set_Cookie(name,value,expires,path,domain,secure) { 
	var cookieString = name + '=' + escape(value) + 
	( (expires) ? ';expires=' + expires.toGMTString() : '') + 
	( (path) ? ';path=' + path : '') + 
	( (domain) ? ';domain=' + domain : '') + 
	( (secure) ? ';secure' : ''); 
	document.cookie = cookieString; 
}

function Delete_Cookie(name,path,domain) {
	if (Get_Cookie(name)) document.cookie = name + '=' +
	( (path) ? ';path=' + path : '') + 
	( (domain) ? ';domain=' + domain : '') + 
	';expires=Thu, 01-Jan-70 00:00:01 GMT'; 
}

function dimInput(field) {
  
   if (document.getElementById(field)) {
      if (document.getElementById(field).style.backgroundColor == '#ffffff' || document.getElementById(field).style.backgroundColor == '') {
         document.getElementById(field).style.backgroundColor = '#EEE';
      }
      else {
         document.getElementById(field).style.backgroundColor = '#ffffff';
      }
   }
} // dimInput

function iFrameImpMsg(msg) {
   dimInput('impBody');
  if (msg.match('DONE')){
   if (document.getElementById('impInputForm')) {
       document.getElementById('impInputForm').style.display = 'none';
   }
   if (document.getElementById('impTankYou')) {
       document.getElementById('impTankYou').style.display = 'block';
   }

  }
} // iFrameImpMsg

function ShowInputForm() {
  if (document.getElementById('impBody')){
      document.getElementById('impBody').value = '';
      // document.forms['comment'].elements['impBody'].focus();
      // document.getElementById('impBody').focus();
  }
  if (document.getElementById('impTankYou')) {
       document.getElementById('impTankYou').style.display = 'none';
   }
  if (document.getElementById('impInputForm')) {
       document.getElementById('impInputForm').style.display = 'block';
   }
} // ShowInputForm

function sendForReview(name,pagename,url) {
var txt='Attention!<br /><br />The reviewer must have publisher or administrator rights in order to view this page.\nTo view the access rights please go to "Enter administration".<br /><br />Do you want to send this page for review?'
var mailsubject='Please review this page before I publish it';
var mailbody='';

mailbody = name + ' wants you to review and comment the page ' + pagename + ' before publishing.\n\n';
mailbody = mailbody + 'To review this page, please follow this link:\n';
mailbody = mailbody + url + '\n\n' + 'Thank you!\n\n';
mailbody = mailbody + '________________________________________________________________________________\n';
mailbody = mailbody + 'Learn more about reviewing pages on InLine Support and Guidelines:\n';
mailbody = mailbody + 'http://inline.scania.com/scripts/cgiip.exe/WService=inline/cm/pub/showdoc.p?docfolderid=54097&docname=Home';

    // var retValue = makeMsgBox("Page for review",txt,48,4,256,0);
    // if (retValue == 6) {
       // popupMailMessage(mailsubject,mailbody);
    // }
	
	var thebox = new confirmDialog();
	thebox.callbackYes = function() {
		popupMailMessage(mailsubject,mailbody);
	};

	thebox.title = "Page for review";
	thebox.message = txt;
	//thebox.trigger = $(this);
	thebox.init();
	
} // sendForReview


function Set_CookieCat( name, value, expires, path, domain, secure ) 
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct 
expires time, the current script below will set 
it for x number of days, to make it for hours, 
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
( ( path ) ? ";path=" + path : "" ) + 
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
} // Set_CookieCat
	
var cOpenmenucategories = '';

function openCategory(CategoryId) {
var MenuDiv = 'MenuId_' + CategoryId;
var OpenChildDiv = 'ChildrenToId_' + CategoryId;
var cSetCookieString = '';
var add=false;
var tmpArrayOpenMC = new Array();
var checkMenuDiv = '';
    if (document.getElementById(MenuDiv))
    {
      if (document.getElementById(MenuDiv).className == 'headlineOpen') {
          document.getElementById(MenuDiv).className = 'headline';
          add=false;
          if (document.getElementById(OpenChildDiv)) { document.getElementById(OpenChildDiv).style.display = 'none';}
      }
      else {
          document.getElementById(MenuDiv).className = 'headlineOpen';
          add=true;
          if (document.getElementById(OpenChildDiv)) { document.getElementById(OpenChildDiv).style.display = 'block';}
      }   
    }
   tmpArrayOpenMC = cOpenmenucategories.split(',');
   for(var i = 0; i < tmpArrayOpenMC.length; i++){
       checkMenuDiv = '';
       checkMenuDiv = 'MenuId_' + tmpArrayOpenMC[i];
       if (document.getElementById(checkMenuDiv)){
          if (add == false &&  tmpArrayOpenMC[i] == CategoryId) {
             // remove from cookie string
          }
          else{
              cSetCookieString = cSetCookieString + tmpArrayOpenMC[i] + ',';
          }
       }
   }
   if (add == true) {
       cSetCookieString = cSetCookieString + CategoryId;
   }
   if(cSetCookieString == ''){
     cSetCookieString = '-1';
   }
   cOpenmenucategories = cSetCookieString;
   Delete_Cookie('openmenucategories','/','');
   Set_CookieCat('openmenucategories',cSetCookieString, 365, '/', '', '');
   setPageHeight();
}// openCategory

function openMyCategories(){
    var tmpArrayOpenMC = new Array();
    var MenuDiv = '';
    var OpenChildDiv = '';
    cOpenmenucategories = Get_Cookie('openmenucategories');
    // alert(cOpenmenucategories);
    if (cOpenmenucategories == null) {
        cOpenmenucategories = '';
        cOpenmenucategories = document.border.myShortCutsCategory.value;
        // alert(cOpenmenucategories);
    }
    tmpArrayOpenMC = cOpenmenucategories.split(',');
    for(var i = 0; i < tmpArrayOpenMC.length; i++){
        MenuDiv = '';
        OpenChildDiv = '';
        MenuDiv = 'MenuId_' + tmpArrayOpenMC[i];
        OpenChildDiv = 'ChildrenToId_' + tmpArrayOpenMC[i];
        if (document.getElementById(MenuDiv))
        {
           document.getElementById(MenuDiv).className = 'headlineOpen';
           if (document.getElementById(OpenChildDiv)) { document.getElementById(OpenChildDiv).style.display = 'block';}
        }
    }
} // openMyCategories


function SiteMap(){
var param = 'sitemaporder=';
var str = document.location.href;
var pos = str.indexOf(param);
var ordertype;
var otherparampos;
var startpos;

	if (pos == -1 ){
		window.location = window.location + '&sitemaporder=' + document.dropdown.sitemaporder.value;
	}
	else{
		startpos = pos + param.length;
		ordertype = str.substring(startpos, str.length);
		otherparampos = ordertype.indexOf("&");

		if (otherparampos > -1){
			ordertype = str.replace(str.substring(startpos, startpos + otherparampos), document.dropdown.sitemaporder.value);
			window.location = ordertype;
		}
		else{
			ordertype = str.replace(str.substring(startpos, str.length), document.dropdown.sitemaporder.value);
			window.location = ordertype;
		}
	}
}

function setImageSizeProfile(filePath,id, widthMax){
var myimage = new Image();
myimage.src = filePath // fileID is the form input type file ID, passed to the function with getElementById('file')
//var HeightMax = widthMax * 1.5;
widthMax = 150;

if(document.getElementById(id)){
    
    if (widthMax > myimage.width) {
        document.getElementById(id).style.width=myimage.width+'px';
    }
    else {
        document.getElementById(id).style.width=widthMax+'px';
    }
    //if (HeightMax > myimage.height) {
    //    document.getElementById(id).style.height=myimage.height+'px';
    //}
    //else {
    //    document.getElementById(id).style.height=HeightMax+'px';
    //}
	if (myimage.width == 0){
		document.getElementById(id).style.width=widthMax+'px'; 
		//document.getElementById(id).style.height=HeightMax+'px';
	}
}	
} // setImageSizeProfile

function setImageSize(filePath,id, widthMax, HeightMax){
var myimage = new Image();
var iPadding = 75;
myimage.src = filePath // fileID is the form input type file ID, passed to the function with getElementById('file')

//alert(myimage.src);
//alert(id);
//alert(myimage.width);
//alert(myimage.height);
// window.status = myimage.src; 
// alert(myimage.width); //gives the pixel width of the file or height or fileSize.
// alert(myimage.height); //gives the pixel width of the file or height or fileSize.
// alert(myimage.fileSize); //gives the pixel width of the file or height or fileSize.
if(document.getElementById(id)){
//alert(myimage.width);
//alert(myimage.height);
    if (widthMax > myimage.width) {
        document.getElementById(id).style.width=myimage.width+'px';
       iPadding = iPadding - myimage.width;
       iPadding = iPadding / 2;
        // alert(iPadding);
        document.getElementById(id).style.marginRight=iPadding+'px';
        document.getElementById(id).style.marginLeft=iPadding+'px';
    }
    else {
        document.getElementById(id).style.width=widthMax+'px';
    }
    if (HeightMax != 0) {
        if (HeightMax > myimage.height) {
            document.getElementById(id).style.height=myimage.height+'px';
        }
        else {
            document.getElementById(id).style.height=HeightMax+'px';
        }
    }
    else {
       document.getElementById(id).style.height=myimage.height+'px';
    }

 // document.getElementById('imagesize').innerHTML = "Size:" + myimage.width + " x " + myimage.height + " px"; 
 // document.getElementById('imagesize').style.display = 'block'; 
} 
} // setImageSize

function setIconSize(filePath,id, widthMax, HeightMax){
// this is a copy of setImageSize() but changed the padding from 75 to 60
var myimage = new Image();
var iPadding = 60;
myimage.src = filePath // fileID is the form input type file ID, passed to the function with getElementById('file')

if(document.getElementById(id)){
    if (widthMax > myimage.width) {
        document.getElementById(id).style.width=myimage.width+'px';
       iPadding = iPadding - myimage.width;
       iPadding = iPadding / 2;
        // alert(iPadding);
        document.getElementById(id).style.paddingRight=iPadding+'px';
        document.getElementById(id).style.paddingLeft=iPadding+'px';
    }
    else {
        document.getElementById(id).style.width=widthMax+'px';
    }
    if (HeightMax != 0) {
        if (HeightMax > myimage.height) {
            document.getElementById(id).style.height=myimage.height+'px';
        }
        else {
            document.getElementById(id).style.height=HeightMax+'px';
        }
    }
    else {
       document.getElementById(id).style.height=myimage.height+'px';
    }

} 
} // setIconSize

function setIndexLine(){
var iHeight=200;
    if(document.getElementById('leftobjectlist') && document.getElementById('leftobjectlist')){
        if (document.getElementById('leftobjectlist')) {
          iHeight = document.getElementById('leftobjectlist').offsetHeight;
        }
        if (document.getElementById('rightobjectlist')) {
            if (document.getElementById('rightobjectlist').offsetHeight > iHeight) {
                iHeight = document.getElementById('rightobjectlist').offsetHeight;
            }
        }
        // document.getElementById('centerobjectlist').style.height = iHeight;
        document.getElementById('leftobjectlist').style.height = iHeight + 'px';
        document.getElementById('rightobjectlist').style.height = iHeight + 'px';
            
        document.getElementById('leftobjectlist').style.maxHeight = iHeight;
        document.getElementById('rightobjectlist').style.maxHeight = iHeight;
    }

} // setIndexLine

function addToTags(tag) {
var newValue1='';
var newValue2='';

newValue1 = document.tagsortorder.deletetags.value;
// newValue2 = document.tagsortorder.mergeFromTags.value;

if (newValue1 == '') {
    newValue1 = tag;
}
else {
    newValue1 = newValue1 + ', ' + tag;
}

if (newValue2 == '') {
    newValue2 = tag;
}
else {
    newValue2 = newValue2 + ', ' + tag;
}
document.tagsortorder.deletetags.value = newValue1;
document.tagsortorder.mergeFromTags.value = newValue1;
// document.tagsortorder.mergeFromTags.value = newValue2;
} // addToDeleteTags


function deleteTags(url) {
	var tags='';

	tags = document.tagsortorder.deletetags.value;
	var txt='Attention!<br /><br />Do you want to delete keywords: "' + tags + '"?<br />You will change keywords on pepole and resources!'

	if (tags == '') {
		return false;
	}
	url = url + '&deletetags=' + tags;

	var thebox = new confirmDialog();
	thebox.callbackYes = function() {
		document.location.href = url;
		//self.document.location = url; // not IE
	};

	thebox.title = "Delete keywords";
	thebox.message = txt;
	//thebox.trigger = $(this);
	thebox.init();
} // deleteTags

function undoWithdrawTags(url) {
	var tags='';

	tags = document.tagsortorder.undowithdrawtags.value;
	var txt='Attention!<br /><br />Do you want to undo withdrawn keywords: "' + tags + '"?'

	if (tags == '') {
		return false;
	}
	url = url + '&undowithdrawtags=' + tags;

	var thebox = new confirmDialog();
	thebox.callbackYes = function() {
		document.location.href = url;
		//self.document.location = url; // not IE
	};

	thebox.title = "Undo withdraw keywords";
	thebox.message = txt;
	//thebox.trigger = $(this);
	thebox.init();
} // undoWithdrawTags

function mergeTags(url) {
	var tags='';
	var totag='';

	tags = document.tagsortorder.mergeFromTags.value;
	totag = document.tagsortorder.mergeToTags.value;
	var txt='Attention!<br /><br />Do you want to replace keywords: "' + tags + '" with "' + totag + '?"<br />You will change keywords on pepole and resources!'

	if (tags == '' || totag == '') {
		return false;
	}
	url = url + '&fromtags=' + tags + '&totag=' + totag;

	var thebox = new confirmDialog();
	thebox.callbackYes = function() {
		document.location.href = url;
		//self.document.location = url; // not IE
	};

	thebox.title = "Replace keywords";
	thebox.message = txt;
	//thebox.trigger = $(this);
	thebox.init();
} // mergeTags


function showMoreTags(){
if(document.getElementById('hideTags')){
    document.getElementById('hideTags').style.display='block';
}
if(document.getElementById('showMore')){
    document.getElementById('showMore').style.display='none';
}
if(document.getElementById('hideSortOrderList')){
    document.getElementById('hideSortOrderList').style.display='block';
}
} // showMoreTags


function showReplyForm(name){
 var Replybutton = 'Reply_button_' + name;
 var Replyspan = 'form_' + name;
 if (document.getElementById(Replyspan)) {
     document.getElementById(Replyspan).style.display = 'block';
 }
 // alert(name);
 //var oEditor = FCKeditorAPI.GetInstance('FCKeditor1_' + name);
 // alert(oEditor.status);
 //oEditor.SetHTML("");
 //oEditor.focus();
 //alert('ll');
 // setFocus();
} // showReplyForm


function closeReplyForm(name){
 var Replybutton = 'Reply_button_' + name;
 var Replyspan = 'form_' + name;
 if (document.getElementById(Replyspan)) {
     document.getElementById(Replyspan).style.display = 'none';
 }
} // closeReplyForm

function getWindowSize() {
var windowWidth = 800;
var windowHeight = 1000;
var menuWidth = 194;
var adjustMainWidth = 8;
var adjustAdmmainWidth = 0;
var adjustHPrightwrapWidth = 50;
var sIE7Doc = '';
var bredd;

if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}

// if(window.innerWidth) { 
// windowWidth = window.innerWidth; 
// } else if(document.documentElement.clientWidth) { 
// windowWidth = document.documentElement.clientWidth; 
// } else if(document.body.clientWidth) { 
// windowWidth = document.body.clientWidth; 
// }

windowWidth = $(window).width();

//check if this page has the menu div, if not set windowWidth = windowWidth + menuWidth to fill out gap from left nav (rel 4_0)
if (document.getElementById('menu') || document.getElementById("menu2")) {
} else {
	windowWidth = windowWidth + menuWidth;
}

//alert("freespace " + (parseInt(windowWidth)-195));
//set element 'admmain' to freespace

adjustAdmmainWidth = 23;
adjustMainWidth = 1;
// if (!dojo.isIE) {
	// adjustMainWidth = 23;
	// adjustAdmmainWidth = 22;
// }

objMain = document.getElementById('main');
objAdmmain = document.getElementById('admmain');
objHPrightwrap = document.getElementById('hprightwrap');

if(objMain){
	//bredd = windowWidth - menuWidth - adjustMainWidth;
	//objMain.style.width = bredd + "px";
}
else if(objHPrightwrap){
	//hprightwrapWidth = (parseInt(objHPrightwrap.style.width) / 100) * document.body.offsetWidth;
	hprightwrapWidth = windowWidth * (parseInt(objHPrightwrap.style.width) / 100);
	hprightwrapWidth = Math.round(hprightwrapWidth);
	bredd = windowWidth - menuWidth - hprightwrapWidth - adjustHPrightwrapWidth;
	//objAdmmain.style.width = bredd + "px";
}
//else if(objAdmmain){
	//bredd = windowWidth - menuWidth - adjustAdmmainWidth;
	//objAdmmain.style.width = bredd + "px";
	//alert(windowHeight);
	//objAdmmain.style.height = (windowHeight * 1.5) + "px";
	//alert(objAdmmain.style.height);
//}


document.body.style.display='block';
/* relaod iFrames. This is a fix for IE7, can this be removed when we have no IE7 but IE8 with compat view? */
if (document.getElementById('staticpages')) {
   sIE7Doc=document.getElementById('staticpages');
}
else if (document.getElementById('admpage')) {
   sIE7Doc=document.getElementById('admpage');
}
else if (document.getElementById('portal_iframe')) {
	document.getElementById('portal_iframe').style.height = parseInt(windowHeight);
}
if(sIE7Doc != ''){
  var iIE7frames=sIE7Doc.getElementsByTagName('iframe');
  for (var iIE7=0;iIE7<iIE7frames.length;iIE7++){
      var fIE7 = document.getElementById(iIE7frames[iIE7].id);
      // fIE7.src = fIE7.src;
  }
}
} // getWindowSize

function checkParent(element,parentelement){
	while(element.parentNode){
		if(element == parentelement){
			return false
		}
		element=element.parentNode
	}
	return true
}

function getQueryVariable(variable)
{
	var query = parent.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) 
	{
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
}

function findPosX(obj) 
{
  var curleft = 0;
  if (obj.offsetParent) 
  {
    while (obj.offsetParent) 
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
} // findPosX

function findPosY(obj)
{
var curtop = 0;
if(obj.offsetParent)
    while(1)
    {
      curtop += obj.offsetTop;
      if(!obj.offsetParent)
        break;
      obj = obj.offsetParent;
    }
else if(obj.y)
    curtop += obj.y;
return curtop;
} // findPosY

window.onresize = function() { 
getWindowSize();
}

// INL-1210 Alt text is not shown when hover images part 2.
// Copy alt-propery to title if title is empty for all images
$( document ).ready(function() {
	$("img:not([title])").each(function() {
		var title = $(this).attr("alt");
		$(this).attr("title", title);
	});
});
