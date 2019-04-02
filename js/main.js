/* Feedback v1.0.0 */
//Animation between screen swap
var screens = $(".wrapper"), currentScreen = 0;
function showScreen() {
    (currentScreen === screens.length - 1) ? currentScreen = 0 : currentScreen++;
    var toHide = (currentScreen > 0) ? currentScreen - 1 : screens.length - 1;
    $(screens[toHide]).fadeOut(500);
    $(screens[currentScreen]).fadeIn(700);
    if (currentScreen === screens.length - 1)
        setTimeout(showScreen, 7500);
}
$(".interactive-button").on("click", showScreen);
$(".blocks").on("click", showScreen);
//Swipe funcions
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;
function getTouches(evt) {
    return evt.touches || // browser API
        evt.originalEvent.touches; // jQuery
}
function handleTouchStart(evt) {
    var firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}
;
function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            /* left swipe */
        }
        else {
            /* right swipe */
        }
    }
    else {
        if (yDiff > 0) {
            /* up swipe */
            $("#control-panel").fadeOut(400);
        }
        else {
            /* down swipe */
            $("#control-panel").fadeIn(400);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
;
