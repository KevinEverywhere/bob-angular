function pixelWrap(_var){
  if(window[_var] != null){
    return window[_var] +"px";
  }else{
    return  '';
  }
};

function changeOrient(evt){
    getCurrentDimensions();
    less.modifyVars({
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
        "@userFont":uaFont
    });
}    

function getCurrentDimensions(){
    rowTrim=80;
    columnTrim=200;
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

    axis2L=0;
    axis2T=rowTrim;
    axis2R=(theOrientation=="horizontal") ? columnTrim : 0;
    axis2B=(theOrientation=="horizontal") ? rowTrim : (2 * rowTrim);
    axis2W=(theOrientation=="horizontal") ? (theLarge-columnTrim) : theSmall;
    axis2H=(theOrientation=="horizontal") ? (theSmall-(2 * rowTrim)) : theLarge-(2 * rowTrim);

    axis3L=(theOrientation=="horizontal") ? (theLarge-columnTrim) : 0;
    axis3H=(theOrientation=="horizontal") ? (theSmall-(2 * rowTrim)) : rowTrim;
    axis3R=0;
    axis3B=rowTrim;
    axis3W=(theOrientation=="horizontal") ? columnTrim : theSmall;
    axis3T=(theOrientation=="horizontal") ? rowTrim : theLarge-(2 * rowTrim);

    pageBottomL=0;
    pageBottomH=rowTrim;
    pageBottomR=0;
    pageBottomB=0;
    pageBottomT=(theOrientation=="horizontal") ? (theSmall-rowTrim) : (theLarge-rowTrim);
    pageBottomW=(theOrientation=="horizontal") ? theLarge : theSmall;

}
