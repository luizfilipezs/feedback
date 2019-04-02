/* Feedback v1.0.0 */

var screens: JQuery<HTMLElement> = $(".wrapper");
var currentScreen: number = 0;

function showScreen(): void {
    (currentScreen === screens.length - 1) ? currentScreen = 0 : currentScreen++;
    if (currentScreen > 0)
        $(screens[currentScreen - 1]).fadeOut(500, function(){
            $(screens[currentScreen - 1]).css("display", "none");
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