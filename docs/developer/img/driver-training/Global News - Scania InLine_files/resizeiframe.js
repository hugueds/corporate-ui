var cWindowStatusText='';
function getScreenSize(type){
 if(type == 'Height') return screen.height;
 else return screen.width;
} // getScreenHeight

var screenHeight = getScreenSize('Height');
var screenWidth = getScreenSize('Width');

function reCalcHeightSize(height){
if (screenHeight < '768'){height = "431";}
else if (screenHeight > '768'){height = "604";}
else {height = "458";}
return height;
} // reCalcHeightSize


function reCalcWidthSize(width){
if (screenWidth < '1024'){width = "100";}
else if (screenWidth > '1024'){width = "100";}
else {width = "100";}
return width;
} // reCalcHeightSize


function loadintoIframe(iframeid, url){
// alert(iframeid);

    if (document.getElementById) {
        // assign attribute src only if url has changed to avoid page reload
        if (document.getElementById(iframeid).src != url) { 
            document.getElementById(iframeid).src = url;
        }
    }

    document.getElementById(iframeid).height = reCalcHeightSize(document.getElementById(iframeid).height) + '';
    document.getElementById(iframeid).width = reCalcWidthSize(document.getElementById(iframeid).width) + '%';

//alert(window.frames["myframe"].document.body.innerHTML);

// alert(screenWidth + ' * ' + screenHeight);
//alert(document.getElementById(iframeid).width + ' * ' + document.getElementById(iframeid).height);
} // loadintoIframe

function pausecomp(millis) 
{
var date = new Date();
var curDate = null;
do { curDate = new Date(); } 
while(curDate-date < millis);
}  // pausecomp


function loadintoConfirmIframe(iframeid, url){
if (document.getElementById)
document.getElementById(iframeid).src=url
document.getElementById(iframeid).height = 250 + '';
document.getElementById(iframeid).width = 50 + '%';

document.getElementById(iframeid).src = '/pleaswait.htm';
// window.status = 'Start pause';
pausecomp(1000);
document.getElementById(iframeid).src=url;
document.getElementById(iframeid).src = document.getElementById(iframeid).src;
if (cWindowStatusText == '') {
   cWindowStatusText = 'Replace ' + document.getElementById(iframeid).src + ' with ';
}
else{
  cWindowStatusText = cWindowStatusText + document.getElementById(iframeid).src + '?';
}
window.status = 'Done - ' + cWindowStatusText;

} // loadintoConfirmIframe
