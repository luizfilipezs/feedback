/* Feedback v1.0.0 */

//Animation between screen swap

var screens: JQuery<HTMLElement> = $(".wrapper"),
    currentScreen: number = 0;

function showScreen(): void {
    (currentScreen === screens.length - 1) ? currentScreen = 0 : currentScreen++;
    var toHide: number = (currentScreen > 0) ? currentScreen - 1 : screens.length - 1;
    $(screens[toHide]).fadeOut(500, function(){
        $(screens[toHide]).css("display", "none");
    });
    $(screens[currentScreen]).fadeIn(700, function(){
        $(screens[currentScreen]).css("display", "block");
    });
    if (currentScreen === screens.length - 1) {
        setTimeout(showScreen, 7500);
    }
}

$(".interactive-button").on("click", showScreen);
$(".blocks").on("click", showScreen);