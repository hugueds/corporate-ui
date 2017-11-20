var xmlHttp
var lCancelAjaxCall=false;
var lShowTimeOut=false;
var lFromButton1=false;

//document.onclick=checkClick;
$(document).click(checkClick);

function checkClick(e){
	try {
		var target = (e && e.target) || (event && event.srcElement);
		var obj = document.getElementById('ajaxResult');
		var queryTarget = document.getElementById("Text1");
        var searchButton = document.getElementById("Button1");
		var parent = checkParent(target,obj);
		if(parent && (queryTarget != target) && (searchButton != target)){
            //document.getElementById("Text1").value = '';
			$("Text1").value = '';
			closeAjaxResult();;
		 }

        
	}catch(e) {
	}
}

// function checkParent(element,parentelement){
	// while(element.parentNode){
		// if(element == parentelement){
			// return false
		// }
		// element=element.parentNode
	// }
	// return true
// } 

function replaceAll(inputStr){
var strReplaceAll = inputStr;
var intIndexOfMatch = strReplaceAll.indexOf( "&" );

while (intIndexOfMatch != -1){
   // Relace out the current instance.
   strReplaceAll = strReplaceAll.replace( "&", "%26" )
   // Get the index of any next matching substring.
   intIndexOfMatch = strReplaceAll.indexOf( "&" );
}
return strReplaceAll;
} // replaceAll


function checkOnTab(){
    if (document.getElementById("ajaxlink_1")) {
        document.getElementById("ajaxlink_1").focus();
    }
    else if (document.getElementById("Button1")) {
        document.getElementById("Button1").focus(); 
    }
    return;
} // function

var timer;
function ajaxListScaniaObjects(a_str,url,type,evt){
    clearTimeout(timer);
    
    // lShowTimeOut=false;
    if (document.getElementById('Text1')) {
        var ix = findPosX(document.getElementById('Text1')); 
        var iy = findPosY(document.getElementById('Text1')) + 16;
        //alert(ix);
        //alert(document.getElementById("ajaxObjects").style.left);
        if (document.getElementById("ajaxResult")) {
            document.getElementById("ajaxResult").style.left= ix + 'px';
            document.getElementById("ajaxResult").style.top= iy + 'px';
        }
         // alert(document.getElementById("ajaxResult").style.left);
        //left
    }
    
	var e = window.event;
	if (!e) 
		e = evt;
    
    // 35=end, 36=home, 37=left arrow, 39=right arrow
    if (e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39) { return; }
    
    if (e.keyCode == 40) {
        // alert(e.keyCode);
        if (document.getElementById("ajaxlink_1")) {
            document.getElementById("ajaxlink_1").focus();
        }
        return;
    }
    else if (e.keyCode == 27) {
      //if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
      //if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
      //window.document.frm1.searchwords.value='';
      //window.document.frm1.searchwords.focus();
      return;
    }
    else if (e.keyCode == 9 || e.keyCode == 16 || e.keyCode == 38) {
         return;
    }
    else {
       //alert(e.keyCode);
    }
    
    a_str = replaceAll(a_str);
    
    // ajaxlink
    // var type='scania';
    
    if (a_str.length==0 && type != 'lastCreated') { 
      if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
      if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
      return;
    }
    
    //alert(a_str);
    //xmlHttp=GetXmlHttpObject()
    //if (xmlHttp==null) {
    //  alert ("Browser does not support HTTP Request");
    //  return;
    //}
	
	var xmlHttpReq = false;
	var self = this;
	if (window.XMLHttpRequest) { // Mozilla/Safari
		self.xmlHttpReq = new XMLHttpRequest(); 
	}
	else if (window.ActiveXObject) { // IE
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
    
    timer = setTimeout(function(){
        if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "visible";}
        if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
        lCancelAjaxCall=false;  
        url=url+"?q="+a_str+"&type="+type;
        url=url+"&sid="+Math.random();
        window.status = "Running: " + url;
        // lShowTimeOut=true;
        // setTimeout("timeOutAjax();",10000);
        
		//xmlHttp.onreadystatechange=stateChanged;
        //xmlHttp.open("GET",url,true);
        //xmlHttp.send(null);
		
		self.xmlHttpReq.open('GET', url, true);
		self.xmlHttpReq.onreadystatechange = function() {
			if (self.xmlHttpReq.readyState == 4) {
				if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "visible";}
				if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
				document.getElementById("ajaxResult").innerHTML = self.xmlHttpReq.responseText; //htmlSB.toString();
			}
		}
		self.xmlHttpReq.send(null);
		
        window.status = "Done";
    },500);
} // ajaxListScaniaObjects

function ajaxListIndex(a_str,url,type,ifolderid,e){
    clearTimeout(timer);

    // lShowTimeOut=false;
    if (document.getElementById('indexSearch')) {
        var ix = findPosX(document.getElementById('indexSearch')); 
        var iy = findPosY(document.getElementById('indexSearch')) + 16;
    
        if (document.getElementById("QuikNavResult")) {
            document.getElementById("QuikNavResult").style.left= ix + 'px';
            document.getElementById("QuikNavResult").style.top= iy + 'px';
        }
    }
    
    if (!e) { e = window.event; }
    
    // 35=end, 36=home, 37=left arrow, 39=right arrow
    if (e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39) { return; }

    if (e.keyCode == 40) {
        // alert(e.keyCode);
        if (document.getElementById("ajaxlink_1")) {
            document.getElementById("ajaxlink_1").focus();
        }
        return;
    }
    else if (e.keyCode == 27) {
      //if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
      //if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
      //window.document.frm1.searchwords.value='';
      //window.document.frm1.searchwords.focus();
      return;
    }
    else if (e.keyCode == 9 || e.keyCode == 16 || e.keyCode == 38) {
         return;
    }
    else {
       //alert(e.keyCode);
    }
    
    a_str = replaceAll(a_str);

    // ajaxlink
    // var type='scania';
    
    if (a_str.length==0) { 
      if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
      if (document.getElementById("QuikNavResult")) { document.getElementById("QuikNavResult").style.visibility = "hidden";}
      return;
    }
    
    //alert(a_str);
    // xmlHttp=GetXmlHttpObject()
    // if (xmlHttp==null) {
      // alert ("Browser does not support HTTP Request");
      // return;
    // } 
	
	var xmlHttpReq = false;
	var self = this;
	if (window.XMLHttpRequest) { // Mozilla/Safari
		self.xmlHttpReq = new XMLHttpRequest(); 
	}
	else if (window.ActiveXObject) { // IE
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}

    timer = setTimeout(function(){
		$("#QuikNavResult").show();
        if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
        lCancelAjaxCall=false;  
        url=url+"?q="+a_str+"&type="+type+"&folderid="+ifolderid;
        url=url+"&sid="+Math.random();
		//window.status = "Running: " + url;
		self.xmlHttpReq.open('GET', url, true);
		self.xmlHttpReq.onreadystatechange = function() {
			if (self.xmlHttpReq.readyState == 4) {
				$("#QuikNavResult").show();
				if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
				document.getElementById("QuikNavResult").innerHTML = self.xmlHttpReq.responseText; //htmlSB.toString();
			}
		}
		self.xmlHttpReq.send(null);
		//window.status = "Done";
    },500);
} // ajaxListIndex



var openListRoleId = 0;
var openListUrl;
var openListEvt;
var timer2;

var GlobalShowAll = false;
function ajaxListUsr2(role2,url2,evt2,usersettings){
	if(usersettings=="all=true") GlobalShowAll = true;
	ajaxListUsr(role2,url2,evt2);
}

function ajaxListUsr(role,url,evt){
clearTimeout(timer);
var field = 'ListUsers_' + role;
var field2 = 'ListUsers_' + openListRoleId;
var type = 'listsusr';
var str = role;
openListUrl = url;
openListEvt = evt;
globalfield = field;
if (openListRoleId == role) {
    document.getElementById(field).src = '/images/ArrowDownSorted.gif';
    // if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.display = "none";}
    if (document.getElementById("QuikNavResult")) {document.getElementById("QuikNavResult").innerHTML = "";}
    openListRoleId = 0;
    clearTimeout(timer);
    return;
}
else if (openListRoleId != 0) {
    document.getElementById(field2).src = '/images/ArrowDownSorted.gif';
    // if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.display = "none";}
    if (document.getElementById("QuikNavResult")) {document.getElementById("QuikNavResult").innerHTML = "";}
    // alert(openListRoleId);
}

clearTimeout(timer2);
openListRoleId = role;
if (document.getElementById(field)) {
    var ix = findPosX(document.getElementById(field)); 
    var iy = findPosY(document.getElementById(field)) + 8;
    document.getElementById(field).src = '/images/ArrowUpSorted.gif';
    if (document.getElementById("QuikNavResult")) {
        document.getElementById("QuikNavResult").style.left= ix + 'px';
        document.getElementById("QuikNavResult").style.top= iy + 'px';
        document.getElementById("QuikNavResult").style.width = '314px';
    }
}
    
    if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
    // if (document.getElementById("QuikNavResult")) { document.getElementById("QuikNavResult").style.visibility = "hidden";}
    
    str = replaceAll(str);	
	var xmlHttpReq = false;
	var self = this;
	if (window.XMLHttpRequest) { // Mozilla/Safari
		self.xmlHttpReq = new XMLHttpRequest(); 
	}
	else if (window.ActiveXObject) { // IE
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}

    timer = setTimeout(function(){
		$("#QuikNavResult").show();
        if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
       // if (document.getElementById("QuikNavResult")) { document.getElementById("QuikNavResult").style.visibility = "block";}
        lCancelAjaxCall=false;
        url=url+"?q="+str+"&type="+type;
		if(GlobalShowAll==true) url=url+"&showall=true";
        url=url+"&sid="+Math.random();		//window.status = "Running: " + url;
        timer2=setTimeout("ajaxListUsr(openListRoleId,openListUrl,openListEvt);",10000);
		self.xmlHttpReq.open('GET', url, true);
		self.xmlHttpReq.onreadystatechange = function() {
			if (self.xmlHttpReq.readyState == 4) {
				$("#QuikNavResult").show();
				if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "block";}
				document.getElementById("QuikNavResult").innerHTML = self.xmlHttpReq.responseText; //htmlSB.toString();
			}
		}
		self.xmlHttpReq.send(null);
		//window.status = "Done";
    },500);
} // ajaxListUsr

function showAjaxObjects(a_str,url,type)
{
if (a_str.length==0) { 
  document.getElementById("ajaxObjects").innerHTML=""
  return;
}
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null) {
  alert ("Browser does not support HTTP Request");
  return;
} 
// var url="/scripts/cgiip.exe/WService=utv/ajax/livesearch.p"
url=url+"?q="+a_str+"&type="+type;
url=url+"&sid="+Math.random();
xmlHttp.onreadystatechange=stateChanged 
xmlHttp.open("GET",url,true)
xmlHttp.send(null)
}  // showObjects

function stateChanged() { 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 

		if (lCancelAjaxCall == false) {
		// lShowTimeOut=false;  
			if (document.getElementById("ajaxLoading")) {document.getElementById("ajaxLoading").style.display = "none";}
			if (xmlHttp.responseText.replace(/^\s+|\s+$/g, '') == '<!-- Generated by Webspeed: http://www.webspeed.com/ -->') {
				// alert(xmlHttp.responseText);
				document.getElementById("ajaxObjects").innerHTML="";
				document.getElementById("ajaxResult").style.visibility = "hidden";
			}
		} // lCancelAjaxCall
		else{
			document.getElementById("ajaxObjects").innerHTML=xmlHttp.responseText;
		}
	} 
} // stateChanged

function GetXmlHttpObject() {
var xmlHttp=null;
try {
 // Firefox, Opera 8.0+, Safari
 xmlHttp=new XMLHttpRequest();
}
 catch (e) {
 // Internet Explorer
  try {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
  catch (e) {
   xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
   }
 }
return xmlHttp;
} // GetXmlHttpObject

function closeAjaxResult(){
if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
if (document.getElementById("ajaxResult")) {document.getElementById("ajaxResult").style.visibility = "hidden";}
lCancelAjaxCall=true;
} //closeAjaxResult

function timeOutAjax(){
if (lShowTimeOut==true) {
    if (document.getElementById("ajaxLoading")) { document.getElementById("ajaxLoading").style.display = "none";}
    if (document.getElementById("ajaxObjects")) {
     document.getElementById("ajaxObjects").innerHTML='<a class="error">Listing timeout, try again...</a>';
    }
    if (document.getElementById("ajaxCloseResult")) { document.getElementById("ajaxCloseResult").style.display = "block";}
    lCancelAjaxCall=true;
}
} //timeOutAjax

function MoveOnAjaxObject(iNext,iPrev){
var goToDiv = 'ajaxlink_';
if (!e) var e = window.event;

// alert(e.keyCode);
if (lFromButton1 == true) {
    if (e.keyCode == 9) {
        if (document.getElementById('ajaxlink_1')) {
            document.getElementById('ajaxlink_1').focus();
        }
    }
    lFromButton1 = false;
}
if (e.keyCode == 40) {
    goToDiv = goToDiv + iNext;
    if (document.getElementById(goToDiv)) {
        document.getElementById(goToDiv).focus();
    }
    else {
        window.document.frm1.searchwords.focus();
    }
}
if (e.keyCode == 38) {
    goToDiv = goToDiv + iPrev;
    if (document.getElementById(goToDiv)) {
        document.getElementById(goToDiv).focus();
    }
    else {
        window.document.frm1.searchwords.focus();
    }
}
} // MoveOnAjaxObject

function closeAjaxDiv(){
    if (document.getElementById("ajaxObjects")) {document.getElementById("ajaxObjects").innerHTML="";}
    if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
} //closeAjaxDiv

function CheckAjaxTabbing(){
if (!e) var e = window.event;
window.status = e.keyCode;

// alert(e.keyCode);
if (e.keyCode == 9) {
    if (document.getElementById('ajaxlink_1')) {
        document.getElementById('ajaxlink_1').focus();
        lFromButton1 = true;
    }
} 
} // CheckAjaxTabbing

// function findPosX(obj) 
// {
  // var curleft = 0;
  // if (obj.offsetParent) 
  // {
    // while (obj.offsetParent) 
        // {
            // curleft += obj.offsetLeft
            // obj = obj.offsetParent;
        // }
    // }
    // else if (obj.x)
        // curleft += obj.x;
    // return curleft;
// } // findPosX

// function findPosY(obj)
// {
// var curtop = 0;
// if(obj.offsetParent)
    // while(1)
    // {
      // curtop += obj.offsetTop;
      // if(!obj.offsetParent)
        // break;
      // obj = obj.offsetParent;
    // }
// else if(obj.y)
    // curtop += obj.y;
// return curtop;
// } // findPosY


var GlobalDivName;
function ajaxLoadDiscussion(url,folderid,elementid,divName){
GlobalDivName = divName;
url=url+"?docfolderid="+folderid+"&elementid=" + elementid;
url=url+"&componentType=listdiscussionchannelasajax&sid="+Math.random();
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null) {
  alert ("Browser does not support HTTP Request");
  return;
} 
xmlHttp.onreadystatechange=stateChangedDiscussion 
xmlHttp.open("GET",url,true)
xmlHttp.send(null)
} // ajaxLoadDiscussion


function stateChangedDiscussion() {  

 if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
        // alert(document.getElementById(GlobalDivName).innerHTML)
     document.getElementById(GlobalDivName).innerHTML="";
     if (xmlHttp.responseText.replace(/^\s+|\s+$/g, '') == '<!-- Generated by Webspeed: http://www.webspeed.com/ -->') {
      // alert(xmlHttp.responseText);
         document.getElementById(GlobalDivName).style.display = "none";
     }
     else{
         document.getElementById(GlobalDivName).innerHTML=xmlHttp.responseText;
     }
 } 
} // stateChangedDiscussion


function ajaxLogSearchResult(url,st,q,id,cl,pos,num) {
url=url+"?id=" + id + "&q="+ q + "&st=" + st + "&cl=" + cl + "&pos=" + pos + "&num=" +num;


//alert(q);

//alert(url);
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null) {
  alert ("Browser does not support HTTP Request");
  return;
} 
xmlHttp.onreadystatechange=stateLogSearchResult 
xmlHttp.open("GET",url,true)
//xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=ISO8859-1");
xmlHttp.send(null)
} // ajaxLogSearchResult


function stateLogSearchResult() {  

 if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
     if (xmlHttp.responseText.replace(/^\s+|\s+$/g, '') == '<!-- Generated by Webspeed: http://www.webspeed.com/ -->') {
      // alert(xmlHttp.responseText);
         //window.status=xmlHttp.responseText;
     }
     else{
         //window.status=xmlHttp.responseText;
     }
       
 } 
} // stateLogSearchResult



