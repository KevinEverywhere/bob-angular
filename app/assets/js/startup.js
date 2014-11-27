function pixelWrap(_var){
  if(window[_var] != null){
    return window[_var] +"px";
  }else{
    return  '';
  }
};

function changeOrient(event){
    console.log("changeOrient . startup---");
    try{
        changeSize(event)
     //   event.preventDefault();
    }catch(oops){
        changeSize(event)
        console.log("no orient change");
    }
};

function isMobile(){
    var _isMobile={
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPhone: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPod: function() {
            return navigator.userAgent.match(/iPod/i);
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Desktop: function() {
            return navigator.userAgent.match(/Chrome/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (_isMobile.Android() || _isMobile.BlackBerry() || _isMobile.iOS() || _isMobile.Opera() || _isMobile.Windows());
        },
        type:function(){
            var _type="NotMobile";
            for(var z in _isMobile){
                if((z!="type") && (z!="any") && (z!="iOS")){
                    if(_isMobile[z]()){
                        _type=z;
                        break;
                    }
                }
            }
            return _type;
        }
    }
    return _isMobile;
}

function changeSize(evt){
    getCurrentDimensions();
    less.modifyVars({
        "@bobAppX":pixelWrap("bobAppX"),
        "@bobAppY":pixelWrap("bobAppY"),
        "@axis1L":pixelWrap("axis1L"),
        "@axis1T":pixelWrap("axis1T"),
        "@axis1R":pixelWrap("axis1R"),
        "@axis1B":pixelWrap("axis1B"),
        "@axis1W":pixelWrap("axis1W"),
        "@axis1H":pixelWrap("axis1H"),
        "@axis2L":pixelWrap("axis2L"),
        "@axis2T":pixelWrap("axis2T"),
        "@axis2R":pixelWrap("axis2R"),
        "@axis2B":pixelWrap("axis2B"),
        "@axis2W":pixelWrap("axis2W"),
        "@axis2H":pixelWrap("axis2H"),
        "@axis3L":pixelWrap("axis3L"),
        "@axis3T":pixelWrap("axis3T"),
        "@axis3R":pixelWrap("axis3R"),
        "@axis3B":pixelWrap("axis3B"),
        "@axis3W":pixelWrap("axis3W"),
        "@axis3H":pixelWrap("axis3H"),
        "@pageBottomL":pixelWrap("pageBottomL"),
        "@pageBottomT":pixelWrap("pageBottomT"),
        "@pageBottomR":pixelWrap("pageBottomR"),
        "@pageBottomB":pixelWrap("pageBottomB"),
        "@pageBottomW":pixelWrap("pageBottomW"),
        "@pageBottomH":pixelWrap("pageBottomH"),
        "@isMobile":isMobile().any(),
        "@mobileType":isMobile().type(),
        "@rowTrim":pixelWrap("rowTrim"),
        "@columnTrim":pixelWrap("columnTrim")
    });
    if(window.hardcoded){window.hardcoded()}
}    

var rowTrim=50, columnTrim=200, apiKey='AIzaSyA-pLtbyLpZuLivlcOZSIq54horCyM8FlU', handleClientLoad=function (){
    gapi.client.setApiKey(apiKey);
};

function getCurrentDimensions(){
    try{
        theLarge=Math.max(window.innerWidth, window.innerHeight);
        theSmall=Math.min(window.innerWidth, window.innerHeight);
        theOrientation=(window.innerWidth>window.innerHeight)?"horizontal":"vertical";
    }catch(noBodyClient){
        try{
            theLarge=Math.max(document.body.clientWidth, document.body.clientHeight);
            theSmall=Math.min(document.body.clientWidth, document.body.clientHeight);
            theOrientation=(document.body.clientWidth>document.body.clientHeight)?"horizontal":"vertical";
        }catch(noBodyClient){
            theLarge=Math.max(window.screen.width, window.screen.height);
            theSmall=Math.min(window.screen.width, window.screen.height);
            theOrientation=(window.screen.width>window.screen.height)?"horizontal":"vertical";
        }
    }
    axis1L=0;
    axis1T=0;
    axis1R=0;
    axis1H=rowTrim;
    axis1W= (theOrientation=="horizontal") ? theLarge : theSmall;
    axis1B=(theOrientation=="horizontal") ? (theSmall-rowTrim) : (theLarge-rowTrim);

    if( (isMobile().any() && ((theSmall < 480) || (theLarge < 720 ))) || 
        ((theSmall < 480) || (theLarge < 720 ) || theOrientation=="vertical")){
        axis2L=0;
        axis2T=rowTrim;
        axis2R=0;
        axis2B=rowTrim;
        axis2W=(theOrientation=="horizontal") ? theLarge : theSmall;
        axis2H=(theOrientation=="horizontal") ? (theSmall-(2 * rowTrim)) : theLarge-(2 * rowTrim);

        axis3L=0;
        axis3H=0;
        axis3R=(theOrientation=="horizontal") ? theLarge : theSmall;
        axis3B=(theOrientation=="horizontal") ? theSmall : theLarge;
        axis3W=0;
        axis3T=(theOrientation=="horizontal") ? theSmall : theLarge;

    }else{
        axis2L=0;
        axis2T=rowTrim;
        axis2R=(theOrientation=="horizontal") ? columnTrim : 0;
        axis2B=(theOrientation=="horizontal") ? rowTrim : (2 * rowTrim);
        axis2W=(theOrientation=="horizontal") ? (theLarge-columnTrim) : theSmall;
        axis2H=(theOrientation=="horizontal") ? (theSmall-(2 * rowTrim)) : theLarge-(3 * rowTrim);

        axis3L=(theOrientation=="horizontal") ? (theLarge-columnTrim) : 0;
        axis3H=(theOrientation=="horizontal") ? (theSmall-(2 * rowTrim)) : (2*rowTrim);
        axis3R=0;
        axis3B=rowTrim;
        axis3W=(theOrientation=="horizontal") ? columnTrim : theSmall;
        axis3T=(theOrientation=="horizontal") ? rowTrim : theLarge-(3 * rowTrim);
    }
    pageBottomL=0;
    pageBottomH=rowTrim;
    pageBottomR=0;
    pageBottomB=0;
    pageBottomT=(theOrientation=="horizontal") ? (theSmall-rowTrim) : (theLarge-rowTrim);
    pageBottomW=(theOrientation=="horizontal") ? theLarge : theSmall;
    bobAppX=(theOrientation=="horizontal") ? (theLarge-theSmall)/2 : (theSmall-theLarge)/2; 
    bobAppY=(theOrientation=="vertical") ? (theLarge-theSmall)/2 : (theSmall-theLarge)/2; 

}
