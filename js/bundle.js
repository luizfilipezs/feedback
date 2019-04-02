(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
