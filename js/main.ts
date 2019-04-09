/* Feedback v1.0.0 */

// Animation between screen swap

var screens: JQuery<HTMLElement> = $(".wrapper"),
    currentScreen: number = 0;

function showScreen(): void {
    (currentScreen === screens.length - 1) ? currentScreen = 0 : currentScreen++;
    var toHide: number = (currentScreen > 0) ? currentScreen - 1 : screens.length - 1;
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

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

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

function randNum(): number {
    return Math.floor(Math.random() * 99999999999);
}

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
    public id: string;
    public asking: string;
    public answers: answer[];
    constructor(ID: string,asking: string, answers: answer[]) {
        this.id = ID;
        this.asking = asking;
        this.answers = answers;
    }
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
        for (let property in db) {
            this[property] = db[property];
        }
        // Check HTML code to get new questions and save in on localStorage
        const blocks: HTMLCollection = document.getElementsByClassName("wrapper");
        var all_questions: Question[] = new Array();
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
                    let asking: string = block.children[0].innerHTML,
                        answers: answer[] = new Array();
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
    saveChanges(): void {
        localStorage.setItem("feedback", JSON.stringify(this));
    }
}

var app: App = new App();
