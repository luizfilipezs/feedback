(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Feedback v1.0.0 */
var screens = $(".wrapper");
var currentScreen = 0;
function showScreen() {
    (currentScreen === screens.length - 1) ? currentScreen = 0 : currentScreen++;
    if (currentScreen > 0)
        $(screens[currentScreen - 1]).fadeOut(500, function () {
            $(screens[currentScreen - 1]).css("display", "none");
        });
    $(screens[currentScreen]).fadeIn(700, function () {
        $(screens[currentScreen]).css("display", "block");
    });
    if (currentScreen === screens.length - 1) {
        setTimeout(showScreen, 7500);
    }
}
$(".interactive-button").on("click", showScreen);
$(".blocks").on("click", showScreen);

},{}]},{},[1]);
