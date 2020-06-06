(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Feedback v1.0.0 */
// Animation between screen swap
var screens = $(".wrapper");
var currentScreen = 0;
function showScreen() {
    currentScreen === screens.length - 1 ? currentScreen = 0 : currentScreen++;
    var toHide = (currentScreen > 0) ? currentScreen - 1 : screens.length - 1;
    $(screens[toHide]).fadeOut(500);
    $(screens[currentScreen]).fadeIn(700);
    if (currentScreen === screens.length - 1)
        setTimeout(showScreen, 7500);
}
$(".interactive-button").on("click", showScreen);
$(".blocks").on("click", showScreen);
// Swipe listeners
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;
var getTouches = function (evt) { return evt.touches || evt.originalEvent.touches; }; // browser API or jQuery       
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
// Generate ID
var randNum = function () { return Math.floor(Math.random() * 99999999999); };
function newId(arr) {
    var id = randNum().toString();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            id = randNum().toString();
            i = 0;
        }
    }
    return id;
}
var Question = /** @class */ (function () {
    function Question(id, asking, answers) {
        this.id = id;
        this.asking = asking;
        this.answers = answers;
    }
    return Question;
}());
var App = /** @class */ (function () {
    function App() {
        // Get or create data and save it on this
        if (localStorage.getItem("feedback") === null)
            localStorage.setItem("feedback", JSON.stringify({
                questions: []
            }));
        var db = JSON.parse(localStorage.getItem("feedback"));
        for (var property in db)
            this[property] = db[property];
        // Check HTML code to get new questions and save in on localStorage
        var blocks = Array.from(document.getElementsByClassName("wrapper"));
        var all_questions = [];
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            var _loop_1 = function (child) {
                var isAQuestion = false;
                for (var _i = 0, _a = child.classList; _i < _a.length; _i++) {
                    var cls = _a[_i];
                    if (cls === "flexbox") {
                        isAQuestion = true;
                        break;
                    }
                }
                if (isAQuestion) {
                    var asking_1 = block.children[0].innerHTML, answers = [];
                    for (var _b = 0, _c = child.children; _b < _c.length; _b++) {
                        var awr = _c[_b];
                        answers.push({
                            option: awr.textContent,
                            score: 0
                        });
                    }
                    var Q = new Question(newId(this_1.questions), asking_1, answers);
                    all_questions.push(Q);
                    if (!this_1.questions.some(function (e) { return e.asking === asking_1; }))
                        this_1.questions.push(Q);
                    this_1.saveChanges();
                    return "break";
                }
            };
            var this_1 = this;
            for (var _a = 0, _b = block.children; _a < _b.length; _a++) {
                var child = _b[_a];
                var state_1 = _loop_1(child);
                if (state_1 === "break")
                    break;
            }
        }
        var _loop_2 = function (q) {
            if (!all_questions.some(function (e) { return e.asking === q.asking; })) {
                var i = this_2.questions.indexOf(q);
                this_2.questions.splice(i, 1);
                this_2.saveChanges();
            }
        };
        var this_2 = this;
        // Delete questions that are no longer used
        for (var _c = 0, _d = this.questions; _c < _d.length; _c++) {
            var q = _d[_c];
            _loop_2(q);
        }
    }
    App.prototype.saveChanges = function () {
        localStorage.setItem("feedback", JSON.stringify(this));
    };
    return App;
}());
var app = new App();

},{}]},{},[1]);
