// Quicknavigation functions
// Developed for SAIL by Peter Grape, Strand Interconnect AB, 2008-05-08
//
// 2009-01-08 onclick menu removal function added / Peter Grape 
// 2010-06-01 Adjusted for InLine / Albert Klour och Erik Sandberg, Logica
// 2012-03-15 Use Common Search Service + minor changes and optimizations / Erik Sandberg, Logica

var oldQueryString = "";
var cGlobalQuery='';
var iCount=0;
var timer;
var docRoot=document;
var searchOnGoing=false;
var CurrentStartId=0;

$.ajaxSetup ({
	// Disable caching of all AJAX responses */
	cache: false
});

// Listen to clicks
$(document).click(checkClickQ);

//StringBuffer added by Dick H Larsson (kondil 2010-20-25) to improve performance
function StringBuffer() { 
	this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) { 
	this.buffer.push(string); 
	return this; 
}; 

StringBuffer.prototype.toString = function toString() { 
	return this.buffer.join(""); 
};

function openResult(newurl, target, paramstoticker) {
	var xmlHttpReq = false;
	var params = "url=" + encodeURIComponent(newurl);
	params += "&searchwords=" + encodeURIComponent(rtrim($("#query").val())) + "&" + paramstoticker;
	strURL = "/search/ticker.php";

	$.get(strURL + "?" + params,{}, function(theResponse) {
		if (newurl.indexOf("?tag=") != -1 ) {
			if (target != "") window.open(newurl.replace(/&/g, '%26'), target);
			else docRoot.location = newurl.replace(/&/g, '%26');
		}
		else {
			if (target != "") window.open(newurl, target);
			else docRoot.location = newurl;
		}
	});
} // openResult

function submit_frm1(){
	var str = rtrim($("#query").val());
	var out = '.'; // replace this
	var add = ' '; // with this
	var temp = '' + str; // temporary holder
	var regexp1 = "&" ;
	var regexp2 = "=" ;
	var i;

	if (searchOnGoing==true){
		return false;
	}
	searchOnGoing=true;
	if (document.frm1.search) {
		document.frm1.search.disabled=true;
	}
	// for(i=0; i<=temp.length; i++){
		// str = temp.substr(i, 1);
		// if (str != "") 
		// {
			// if ( str.indexOf("&") >= 0 ) {
				// temp = temp.replace(regexp1,'%26');
			// }
			// else if ( str.indexOf("=") >= 0 ) {
				// temp = temp.replace(regexp2,'%3D');
			// }
		// }
	// }

	while (temp.indexOf(out)>-1) {
		pos= temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
		temp.substring((pos + out.length), temp.length));
	}

	$("#query").val(temp);
	str = rtrim($("#query").val());
	if(str.length < 1){
		alert('You have to enter at least one character!');
		$("#query").val("");
		$("#query").focus();
		searchOnGoing=false;
		return false;
	}
	else {
		$("#query").val(rtrim($("#query").val()));
		if (document.getElementById("QuikNavResult")) {document.getElementById("QuikNavResult").innerHTML="";}
		if (document.getElementById("ajaxResult")) { document.getElementById("ajaxResult").style.visibility = "hidden";}
	return true;
	}
} // submit_frm1

// IE 6 quirks fix for onclick event in checkClickQ. /Peter G
function checkClickQ(e){
	try {
		var target = (e && e.target) || (event && event.srcElement);
		var obj = docRoot.getElementById('QuikNavResult');
		var queryTarget = docRoot.getElementById("query");
		var parent = checkParent(target,obj);
		if(parent && (queryTarget != target)){
			if (docRoot.getElementById("query").value == ''){
				docRoot.getElementById("query").value = ''; //entertext;
				docRoot.getElementById("query").style.color='#D8D8D8';
			}
			closeQuikNavResult();
		}
	}catch(e) {
	//  if any error s occur, disregard them, most likely NPE if no field is found.
	}
} // checkClickQ

function searchEngine(evt,searchtype) {
	clearTimeout(timer);
	var e = window.event;
	var reSpace = /\s\s+/g;
	var reChar = /[^a-z,^0-9^å,^ä,^ö,^\s]/g;
	var resultobj;
	var params = "";
	var strfilter = "";
	var strWikiCat = "";
	var excludeIds = [];
	
	if (searchtype == 'quicksearch' || searchtype == 'quicksearchbegins') {
		docRoot = document;
		strQ = rtrim(docRoot.getElementById("query").value);

	if (window.attachEvent && !window.addEventListener) {
		// Client is old IE browser, use form in old header
			if (docRoot.frm1.filter != null) strfilter = rtrim(docRoot.frm1.filter.value);
			if (docRoot.frm1.src != null) strSrc = rtrim(docRoot.frm1.src.value);
//			if (docRoot.frm1."keyword-valuefacet" != null) strfilter = rtrim(docRoot.frm1.keyword-valuefacet.value);
		} else {
		// Use form in global header
			if (docRoot.gh_form.filter != null) strfilter = rtrim(docRoot.gh_form.filter.value);
			if (docRoot.gh_form.src != null) strSrc = rtrim(docRoot.gh_form.src.value);
//			if (docRoot.gh_form.keyword-valuefacet != null) strfilter = rtrim(docRoot.gh_form.keyword-valuefacet.value);
		}

		//if (docRoot.frm1.getElementById("keyword-valuefacet") != null) strWikiCat = docRoot.frm1.getElementById("keyword-valuefacet").value;
		if($("#keyword-valuefacet").val()) strWikiCat = $("#keyword-valuefacet").val().replace("Category:","");
//		if (docRoot.getElementById("keyword-valuefacet") != null) strWikiCat = docRoot.getElementById("keyword-valuefacet").value.replace("Category:","");
		resultobj = docRoot.getElementById("QuikNavResult");
	}

	if (!e) e = evt;

	if (e.keyCode == 40) {
		checkOnTabQ();
		e.returnValue=false;
		return false;
	}
	if (e.keyCode == 27) {
		closeQuikNavResult(); 
		return false;
	}
    // window.status = e.keyCode;
	// || e.keyCode == 16
	if (e.keyCode == 40 || e.keyCode == 27 || e.keyCode == 38) {return false;} // don't run for this signs

	if(strQ == oldQueryString || (e.keyCode == 32 && rtrim(strQ) == "")) {
		// User editied data without chaning it OR just entered space(s)
		//Abort but leave quick nav open
		return false;
	}

	strURL = "/search/quicknav.php";
	var ilength=strQ.length;
	docRoot.getElementById("query").style.color='';
	if (ilength == 0) {
		if (resultobj) resultobj.style.display='none';
		oldQueryString = "";
		docRoot.getElementById("query").style.cursor = "default";
		return false;
	} // need 2 signs or more

	var ix = findPosX(docRoot.getElementById('query'));
	var iy = findPosY(docRoot.getElementById('query')) + 16;
	
	docRoot.getElementById("query").style.cursor = "wait";
	$("#QuikNavResult").html("<span title='loading' id='ajaxLoading'><img src='/images/transparent_5.gif' style='border:0px; height:20px';></span>");

	// if($( "#menu #current" ).length > 0) {
	// 	// Old menu! Update position here
	// 	$("#QuikNavResult").css('left',ix + 'px');
	// 	$("#QuikNavResult").css('top',iy + 'px');
	// }

	$("#QuikNavResult").show();	
	//$("#ajaxLoading").show();  // Show() breaks layout for loading image!!

	var query = strQ.toLowerCase();
	params = "searchtype=" + searchtype;
	if (searchtype == 'quicksearch') params += "begins";
	if (strfilter != "") params += "&filter=" + strfilter;
	if (strWikiCat != "") params += "&wikicat=" + strWikiCat;
	params += "&searchtext=" + encodeURIComponent(query);

	var rspObj1, rspObj2, rspObj3, rspObjTot;
	var docObj, docObj2, docObj3;
	
	// When key has been pressed, wait for 500 ms, then do 3 ajax requests to search search service
	timer = setTimeout(function(){
		if (searchtype == 'quicksearch') {

			// 1. Get objects that BEGINS with searchtext
 			$.get(strURL + "?" + params,{}, function(beginsResponse) {
				// After HTTP GET run this
				//try
				//{
//					rspObj1 = eval("("+beginsResponse+")"); // use eval to parse Solr's JSON response
					rspObj1 = beginsResponse.components;
					if(rspObj1==null) {
						//alert("Big barabom 1");
						return;
					}
					
					// Process rspObj1
					if(rspObj1.doclists[0]) {
						for(var zx = 0;zx < rspObj1.doclists[0].documents.length; zx++) {
							docObj = rspObj1.doclists[0].documents[zx];
							if(docObj == undefined){ break; }
							docObj.queryno = "B"; // Test
							// Remember the object_ids, will be excluded in next request
							excludeIds[zx] = docObj.object_id;
						}
					}
					// 2. Get objects that CONTAINS searchtext
					params = "searchtype=" + searchtype + "&searchtext=" + encodeURIComponent(query);
					if (strfilter != "") params += "&filter=" + strfilter;	// When searching in wiki only
					if (strWikiCat != "") params += "&wikicat=" + strWikiCat;	// Whem searching in a wiki category only
					params += "&excludeobjectid=" + excludeIds.toString();  // Exclude items from rspObj1
					$.get(strURL + "?" + params,{}, function(containsResponse) {				
						rspObj2 = containsResponse.components;
						if(rspObj2==null) {
							//alert("Big barabom 2");
							return;
						}

						// Extract the actual search words from the containsResponse, will be used for highlighting
						// Note that query.query is returned even if there are no hits
						var solrq = containsResponse.components.sortOptions[0].query;  //   (word1* AND word2*)
						var solrwords = [];
						solrq = solrq.substring(0, solrq.indexOf("*)"));   //  Cut out everything after first *):  (word1* AND word2
						solrwords = solrq.replace(/\*/g, ""); // remove all *   : (word1 AND word2
						solrwords = solrwords.replace(/\sAND\s/g, " "); // remove  AND  :  (word1 word2
						solrwords = solrwords.replace(/\(/g, ""); // remove (  : word1 word2
						solrwords = solrwords.replace(/\)/g, ""); // remove )  (just in case)
						
						// Process rspObj2
						if(rspObj2.doclists[0]) {
							for(var zx = 0;zx < rspObj2.doclists[0].documents.length; zx++) {
								docObj = rspObj2.doclists[0].documents[zx];
								if(docObj == undefined){ break; }
								docObj.queryno = "C"; // Test
							}								
						}
						// 3. Get tags, subject and Org objects that CONTAINS searchtext (not done if searching in wiki only)
						if(strfilter == "") {
							// Search all of InLine
							params = "searchtype=relatedto&searchtext=" + encodeURIComponent(query);
							if (strfilter != "") params += "&filter=" + strfilter;
							if (strWikiCat != "") params += "&wikicat=" + strWikiCat;

							$.get(strURL + "?" + params,{}, function(relatedtoResponse) { 
								rspObj3 = relatedtoResponse.components;
								if(rspObj3==null) {
									//alert("Big barabom 3");
									return;
								}
								// Process rspObj3
								if(rspObj3.doclists[0]) {
									for(var zx = 0;zx < rspObj3.doclists[0].documents.length; zx++) {
										docObj = rspObj3.doclists[0].documents[zx];
										if(docObj == undefined){ break; }
										docObj.queryno = "M"; // Test
									}
								}
								// Merge results and send to presentation
								//rspObjTot = rspObj1.doclists[0].documents.concat(rspObj2.doclists[0].documents, rspObj3.doclists[0].documents);
								if(rspObj1.doclists[0]) rspObjTot = rspObj1.doclists[0].documents;
								if(rspObj2.doclists[0]) {
									if(rspObjTot) { 
										rspObjTot = rspObjTot.concat(rspObj2.doclists[0].documents);
									}
									else {
										rspObjTot = rspObj2.doclists[0].documents;
									}
								}
								if(rspObj3.doclists[0]) {
									if(rspObjTot) { 
										rspObjTot = rspObjTot.concat(rspObj3.doclists[0].documents);
									}
									else {
										rspObjTot = rspObj3.doclists[0].documents;
									}
								}
								//rspObj1.doclists[0].documents.concat(rspObj2.doclists[0].documents, rspObj3.doclists[0].documents);
								presentSearchResult(rspObjTot, solrwords);
							})
							.error(function() { 
								ajaxError();
								return;
							});  // $.get relatedtoResponse
						}
						else {
							// Search wiki only, skip relatedto
							// Merge results and send to presentation
							if(rspObj1.doclists[0]) rspObjTot = rspObj1.doclists[0].documents;
							if(rspObj2.doclists[0]) {
								if(rspObjTot) { 
									rspObjTot = rspObjTot.concat(rspObj2.doclists[0].documents);
								}
								else {
									rspObjTot = rspObj2.doclists[0].documents;
								}
							}
							//rspObjTot = rspObj1.doclists[0].documents.concat(rspObj2.doclists[0].documents);
							presentSearchResult(rspObjTot, solrwords);
						}
					})
					.error(function() { 
						ajaxError();
						return;
					});
					// $.get containsResponse
				//}
				// catch(err)
				// {
					// closeQuikNavResult();
					// return;
				// }
			})
			.error(function(errorobj) { 
				ajaxError(errorobj.status);
				return;
			});  // $.get beginsResponse
		}  // if (searchtype == 'quicksearch')
	},500);  // Timer (setTimeout)
}

function checkOnTabQ(){
	if (docRoot.getElementById("ajaxlink_1")) {
		$('#ajaxlink_1 a').focus();
	}
	return;
} // function


function TabbingOnAjaxObjectQ(iNext,iPrev,evt){
	var goToDiv = 'ajaxlink_';
	var e = evt;
	if (!e) e = window.event;

	if (e.keyCode == 40) {
		goToDiv = goToDiv + iNext;
		if (docRoot.getElementById(goToDiv)) {
			$('#' + goToDiv + ' a').focus();
		}
		else {
			docRoot.getElementById('query').focus();
		}
		e.returnValue=false;
	}
	windows.status = e.keycode;
	if (e.keyCode == 38) {
		goToDiv = goToDiv + iPrev;
		if (docRoot.getElementById(goToDiv)) {
			$('#' + goToDiv + ' a').focus();
		}
		else {
			docRoot.getElementById('query').focus();
		}
		e.returnValue=false;
	}
	return false;
} // TabbingOnAjaxObjectQ

function closeQuikNavResult(){
	$("#ajaxObjects").html("");
	$("#QuikNavResult").hide();
	docRoot.getElementById("query").style.cursor = "default";
	oldQueryString = "";
}

function setActive(id){
	var setActiveDiv = 'ajaxlink_';
	setActiveDiv = setActiveDiv + id;
	if (docRoot.getElementById(setActiveDiv)) {
	}
} // setActive

// Add event for quicknav submenues
function setmouseenter(id)
{
	var t;
	var objname = "#inner" + (id - 1);
	var objWidth = $(objname).width() * -1;
	var objHeight = $("#ajaxlink_" + id).height();
	var topp = $("#ajaxlink_" + id).offset().top;
	
	$("#another" + (id - 1)).mouseenter(function(){
		// if($( "#menu #current" ).length > 0) {
		// 	// Old menu! Update position here	
		// 	$(objname).css({ left: objWidth});
		// 	$(objname).css("top", topp - objHeight);
		// }
		t = setTimeout('$("' + objname + '").show()',500);
	}).mouseleave(function(){
		clearTimeout(t);
		$(objname).hide();
	});
} // setmouseenter

// Used to group hits with same name, used for sub menues
function registerKeyToValue(map, key, value)
{
	key = key.toLowerCase();
	if(map[key] != null)
	{
		var arr = map[key];
		arr[arr.length] = value;
	}
	else
	{
		var arr = new Array();
		arr[0] = value;
		map[key] = arr;
	}
} // registerKeyToValue

// Create quicknav code
function presentSearchResult(docs, words)
{
	var htmlSB = new StringBuffer();
	var cclass = "";
	var mapNameToDoc = new Object();
	var debugtext = "";
	var NoHitText = "";
	var additionalText = "";
	// if the user deleted the entry before the result came back from the server we will close immediately.
	if (docRoot.getElementById('query').value.length == 0) {
		closeQuikNavResult();
		return;
	}

	if (docs==null) {
	//if (docs==null || docs.documents.length==0) {
	//if (docs.length==0) {
		// No hits!
		$("#ajaxLoading").hide();
		docRoot.getElementById("query").style.cursor = "default";
		NoHitText = "<div id='SearchHeaderOuter' style='background-color: #999; height: 22px;'>";
		NoHitText += "<div id='SearchHeaderInner' style='margin: 0px 15px 0px 15px;'><span style='padding-right: 60px;'><a href='#' class='description' style='color: white; display: inline; font-weight: bold; text-decoration: none ! important;' onclick='javascript:if (submit_frm1()) top.document.frm1.submit();'>Press Enter to see all results</a></span>";
		NoHitText += "<span style='display: inline; color: white; font-size: 12px;'>>></span></div>";
		NoHitText += "</div>";
		NoHitText += "<div id='SearchTitleOuter' style='background-color: #fff; height: 22px;'>";
		NoHitText += "<div id='SearchTitleInner' class='description' style='margin: 0px 0px 0px 15px; color: #666; font-style: italic;'><span class='bold'>Suggested items below</span></div>";
		NoHitText += "</div>";
		NoHitText += "<div style='background-color: #ECECED;'>";
		NoHitText += "<div class='description' style='margin: 0px 15px;'><i>Nothing was found in Quick Navigation. Try again by using Advanced Search (press Enter)</i></div>";
		//$("#QuikNavResult").html("<div class='description' style='margin: 0px 5px;'><i>Nothing was found in Quick Navigation. Try again by using Advanced Search (press Enter)</i></div>");
		$("#QuikNavResult").html(NoHitText);
		oldQueryString = "";
		return;
	}

	// Add highlighting and group hits with same name
	//for(var i = 0; i < docs.documents.length; i++)
	for(var i = 0; i < docs.length; i++)
	{
		//var doc = docs.documents[i];
		var doc = docs[i];
		doc.preferred_name = doHighlight(doc.preferred_name, words, "<span id=highl>", "</span>");
		registerKeyToValue(mapNameToDoc, doc.preferred_name, doc);
	}

	//mapNameToDoc now contains all response docs
	var counter = 0;
	var topLevel = null;
	
	htmlSB.append("<div id='SearchHeaderOuter' style='background-color: #999; height: 22px;'>");
	htmlSB.append("<div id='SearchHeaderInner' style='margin: 0px 15px 0px 15px;'><span style='padding-right: 60px;'><a href='#' class='description' style='color: white; display: inline; font-weight: bold; text-decoration: none ! important;' onclick='javascript:if (submit_frm1()) top.document.frm1.submit();'>Press Enter to see all results</a></span>");
	//htmlSB.append("<span style='margin: 0px 10px; color: white; display: inline;' class='description'> >> </span></div>");
	htmlSB.append("<span style='display: inline; color: white; font-size: 12px;'>>></span></div>");
	htmlSB.append("</div>");
	htmlSB.append("<div id='SearchTitleOuter' style='background-color: #fff; height: 22px;'>");
	htmlSB.append("<div id='SearchTitleInner' class='description' style='margin: 0px 0px 0px 15px; color: #666; font-style: italic;'><span class='bold'>Suggested items below</span></div>");
	htmlSB.append("</div>");
	
	for(p in mapNameToDoc)
	{
		var arr = mapNameToDoc[p]; 
		var innerCounter = "inner" + counter;
		var anotherCounter = "another" + counter;
	
		//If we have more than one elements in the array we are going to create a group
		if(arr.length > 1)
		{
			cclass = getCSSclass('groupitem', counter++);
			//do not remove transparent image because of mouseover problem with IE6
			htmlSB.append("<div id='ajaxlink_" + counter + "'>");
			htmlSB.append("<div id='" + anotherCounter + "' style='z-index:1;' class='" + cclass + "'><div class='groupitemarrow'>&nbsp;</div><img src='/images/transparent_5.gif' style='width: 28px; height: 1px;' border='0'><a href='#' style='display:inline;text-decoration:none;'>" + arr[0].preferred_name + " <i>(" + arr.length + ")</i> </a>");
			htmlSB.append("<div id='" + innerCounter + "' style='border:1px solid black;position:absolute;width:80%;display:none;background-color:white;margin-left:10px;'>");
			for(var j = 0; j < arr.length; j++)
			{
				// Add AD username and organisation acronym to profile names: Bruce Lee (bruce), IOAW
				additionalText = "";
				if(arr[j].object_type == "profile") {
					additionalText = " (" + arr[j].alternative_name + ")";
					if(arr[j].object_organisation_acronym_s != "" && arr[j].object_organisation_acronym_s != undefined) additionalText += ", " + arr[j].object_organisation_acronym_s;
				}
				// Add debug for non prod environments. Prod = *inline.scania.com or *inline.scania.se.
				if(window.location.hostname.indexOf("inline.scania.com") == -1 && window.location.hostname.indexOf("inline.scania.se") == -1 && window.location.hostname.indexOf("eduinline.scania.com") == -1) debugtext = " [" + arr[j].queryno + "]";
				cclass = getCSSclass(arr[j].object_type, j);
			
				//htmlSB.append("<div id='ajaxlink_" + counter + "' class='" + cclass + "' style='font-size:100%;'><a ");
				htmlSB.append("<div id='ajaxlink_" + counter + "'" + " style='font-size:100%;'><a ");
				//htmlSB.append(" onKeyPress='if(event.keyCode==40) event.returnValue=false;' onKeydown='if(event.keyCode==40) event.returnValue=false;'");
				htmlSB.append(" onKeydown='TabbingOnAjaxObjectQ(\"" + hit_next + "\",\"" + hit_prev + "\",event);' ");
				htmlSB.append(" href='javascript:openResult(\"" + arr[j].preferred_link.replace(/\\/g,"/") + "\"," + getTarget(arr[j].object_type) + ",\"objecttype=" + arr[j].object_type + "\");' class='" + cclass + "'>" + arr[j].preferred_name + additionalText + debugtext + "</a>  </div>");
			}

			htmlSB.append("</div></div></div>");
		}

		//No group, only a single result for this title
		else {
			// Add AD username and organisation acronym to profile names: Bruce Lee (bruce), IOAW
			additionalText = "";
			if(arr[0].object_type == "profile") {
				additionalText = " (" + arr[0].alternative_name + ")";
				if(arr[0].object_organisation_acronym_s != "" && arr[0].object_organisation_acronym_s != undefined) additionalText += ", " + arr[0].object_organisation_acronym_s;
			}
			// Add debug for non prod environments. Prod = *inline.scania.com or *inline.scania.se.
			if(window.location.hostname.indexOf("inline.scania.com") == -1 && window.location.hostname.indexOf("inline.scania.se") == -1 && window.location.hostname.indexOf("eduinline.scania.com") == -1) debugtext = " [" + arr[0].queryno + "]";
			cclass = getCSSclass(arr[0].object_type, counter++);
			var hit_prev = counter - 1;
			var hit_next = counter + 1;
			htmlSB.append("<div id='ajaxlink_" + counter + "'><a href='javascript:openResult(\"" + arr[0].preferred_link.replace(/\\/g,"/") + "\"," + getTarget(arr[0].object_type) + ",\"objecttype=" + arr[0].object_type + "\");' class='" + cclass + "'");
			htmlSB.append(" onKeydown='TabbingOnAjaxObjectQ(\"" + hit_next + "\",\"" + hit_prev + "\",event);' ");
			htmlSB.append(">" + arr[0].preferred_name + additionalText + debugtext + "</a>  </div>");
		}
	}

	$("#ajaxLoading").hide();
	docRoot.getElementById("query").style.cursor = "default";
	$("#QuikNavResult").html("" + htmlSB.toString());
	oldQueryString = strQ;
	
	// Set mouseenter event on all items (easier than to find the otherX items)
	for(var k = 1; k <= counter; k++) setmouseenter(k);				
} // presentSearchResult

function getCSSclass(objtype, hitnr) {
	var cclass = "";
	switch(objtype)
	{
		case "channel":
			cclass = "channel";
			break;
		case "scanialink":
			cclass = "ScaniaLink";
			target = "'_blank'";
			break;
		case "externallink":
			cclass = "wwwLink";
			target = "'_blank'";
			break;
		case "hp":
			cclass = "homepage";
			break;
		case "mainhp":
			cclass = "homepage";
			break;
		case "subhp":
			cclass = "subhomepage";
			break;
		case "mainsubhp":
			cclass = "subhomepage";
			break;
		case "profile":
			cclass = "profile";
			break;
		case "keyword":
			cclass = "tag";
			break;
		case "news":
			cclass = "News";
			break;
		case "org":
			cclass = "org";
			break;
		case "subject":
			cclass = "sub";
			break;
		case "wikipage":
			cclass = "wikipage";
			break;
		case "wikicategory":
			cclass = "wikicategory";
			break;
		case "groupitem":
			cclass = "groupitem";
			break;
		default:
			cclass = "other";
			break;
	}
	// alternate colour for each search result
	if (hitnr % 2 == 1) cclass = cclass; //'QuikNavItem';
	else cclass += "_2"; //'QuikNavItem_2';
	return cclass;
} // getCSSclass

function getTarget(objtype) {
	var target = "\"\"";
	switch(objtype)
	{
		case "scanialink":
			target = "\"_blank\"";
			break;
		case "externallink":
			target = "\"_blank\"";
			break;
	}
	return target;
} // getTarget

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
	var words = searchTerm.replace(/([\\?\\*\\(\\)])/g,"\\$1");
	if (words.indexOf("q=") >= 0) words = getParameters("q", words);
	//var words = words.replace(/(\b\w\b)|(\b\w\w\b)/g,""); // one or two character words shall be ignored
	var words = words.replace(/(\b\w+)/g,"\\b$1"); // add a \b to the beginning of every word
	var words = words.replace(/ /g,"|"); // add an OR between every word
	//var words = words.replace(/ /g," ");
	regexp = new RegExp ("(" + words + ")", "gi"); // generate the words list
	bodyText = bodyText.replace(regexp,highlightStartTag + '$1' + highlightEndTag);	
	return bodyText;
} // doHighlight

function getParameters(paramName, sString) 
{	
	var arrURLParams = sString.split("&");
	var arrParamNames = new Array(arrURLParams.length);
	var arrParamValues = new Array(arrURLParams.length);
	var i = 0;
	for (i=0;i<arrURLParams.length;i++)
	{
		var sParam = arrURLParams[i].split("=");
		arrParamNames[i] = sParam[0];
		if (sParam[1] != "")
			arrParamValues[i] = unescape(sParam[1]);
		else
			arrParamValues[i] = ""; //No Value
	}

	for (i=0;i<arrURLParams.length;i++)
	{
		if(arrParamNames[i] == paramName){
			//alert("Param:"+arrParamValues[i]);
			return arrParamValues[i];
		}
	}
	return sString;
}

function ajaxError(status) {
	var errormessage;
	$("#ajaxLoading").hide();
	docRoot.getElementById("query").style.cursor = "default";
	if(status==403) errormessage = "Session error. Please reload this page.";
	else errormessage = "Search service is currently not available.<br />Please try again later.";

	$("#QuikNavResult").html("<div class='description' style='margin-left:10px; color:red;'><i>" + errormessage + "</i></div>");
	oldQueryString = "";
}
