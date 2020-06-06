/* Feedback v1.0.0 */

// Animation between screen swap

var screens = $(".wrapper");
var currentScreen = 0;

function showScreen() {
    currentScreen === screens.length - 1 ? currentScreen = 0 : currentScreen++;
    var toHide = (currentScreen > 0) ? currentScreen - 1 : screens.length - 1;

    $(screens[toHide]).fadeOut(500);
    $(screens[currentScreen]).fadeIn(700);

    if (currentScreen === screens.length - 1) setTimeout(showScreen, 7500);
}

$(".interactive-button").on("click", showScreen);
$(".blocks").on("click", showScreen);

// Swipe listeners

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

const getTouches = evt => evt.touches || evt.originalEvent.touches; // browser API or jQuery       

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
        } else {
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            $("#control-panel").fadeOut(400);
        } else { 
            /* down swipe */
            $("#control-panel").fadeIn(400);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
};


// Generate ID

const randNum = () => Math.floor(Math.random() * 99999999999);

function newId(arr: any[]): string {
    var id: string = randNum().toString();
    for (let i: number = 0;i < arr.length;i++) {
        if (arr[i].id === id) {
            id = randNum().toString();
            i = 0;
        }
    }
    return id;
}


// Main

interface answer {
    option: string;
    score: number;
}

class Question {
    constructor(
        public id: string,
        public asking: string,
        public answers: answer[]
    ) { }
}

/**
 * Prevent errors using `Array.from()` method
 */
interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

class App {
    public questions: Question[];
    constructor() {
        // Get or create data and save it on this
        if (localStorage.getItem("feedback") === null)
            localStorage.setItem("feedback", JSON.stringify({
                questions: []
            }));
        
        const db: object = JSON.parse(localStorage.getItem("feedback"));

        for (let property in db)
            this[property] = db[property];

        // Check HTML code to get new questions and save in on localStorage
        const blocks = Array.from(document.getElementsByClassName("wrapper"));
        var all_questions: Question[] = [];
        
        for (let block of blocks) {
            for (let child of block.children) {
                let isAQuestion: boolean = false;
                for (let cls of child.classList) {
                    if (cls === "flexbox") {
                        isAQuestion = true;
                        break;
                    }
                }
                if (isAQuestion) {
                    let asking = block.children[0].innerHTML,
                        answers: answer[] = [];

                    for (let awr of child.children) {
                        answers.push({
                            option: awr.textContent,
                            score: 0
                        });
                    }
                    let Q = new Question(newId(this.questions), asking, answers);
                    all_questions.push(Q);
                    if (!this.questions.some(e => e.asking === asking))
                        this.questions.push(Q);
                        this.saveChanges();
                    break;
                }
            }
        }
        // Delete questions that are no longer used
        for (let q of this.questions) {
            if (!all_questions.some(e => e.asking === q.asking)) {
                let i: number = this.questions.indexOf(q);
                this.questions.splice(i, 1);
                this.saveChanges();
            }
        }
    }
    saveChanges() {
        localStorage.setItem("feedback", JSON.stringify(this));
    }
}

var app = new App();
