// JS file for questions and answers
//--------JSON-Questions-&-Answers------------>
const QnAs = {
  "questions": [
    {"question": "String for a question0?",
     "Answers": ["A is a lonly number",
		 "B is for button",
		 "C is a coper",
		 "D is devious"],
      "Answer": "A"},
    {"question": "String for the question1?",
     "Answers": ["A if you go",
		 "B if you see",
		 "C if you play",
		 "D if your good"],
      "Answer": "B"},
    {"question": "String for this question3?",
     "Answers": ["A when its dark",
		 "B when its storms",
		 "C when the light is dim",
		 "D when the strong walk no more"],
      "Answer": "C"}]}
//-------------------------------------------->
let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");
let resultEl = document.querySelector("#result");
let answersEls = document.querySelectorAll("li");
let buttonEls = document.querySelectorAll("button");
let timeEl = document.querySelector("#time");
let highScoresEl = document.querySelector("#highScores button");
let highScoreEl = document.querySelector("#highScore");
let intialsEl = document.querySelector("#highScoreInput");
const secondsLeft = 5; //90;
let highScore = 0;
let score = 0;

let isCorrect = false;
let [pick,guess] = ["",""];

timeEl.textContent = secondsLeft

function timer (seconds) {
  let countDown = setInterval(function(){
    seconds--;
    timeEl.textContent = seconds;
    if (seconds === 0){
      clearInterval(countDown);
      // store score and go to end screen
      endTheGame(true);
    }
  },1000);
}

/*------------------------------------------------
 *Game play track
 *------------------------------------------------*/
let start = function startGame(event){
  startTheGame(QnAs);
  return;
}
let end = function endGame(event){
  endTheGame(false);
  return;
}
function startScreen() {
  buttonEls[1].addEventListener("click", start);
  buttonEls[2].addEventListener("click", end);
  return 0;
}
function checkAnswer(guess,qID) {
  console.log("Pick is: " + (guess === qID));
  if (guess === qID){
    score += 10;
    return true;
  }
  return false;
}

let getPick = function pick(event) {
  pick = event.currentTarget.textContent.charAt(0);
  console.log(pick);
  return event.currentTarget.textContent.charAt(0);
}

function showResult(result) {  
  // show if it was correct/wrong
  resultEl.textContent = result ? "Correct" : "Wrong";
  // add solid overline to display
  resultEl.setAttribute("style", "text-decoration: overline;");
  resultEl.setAttribute("style", "text-decoration-style: solid;");
  resultEl.setAttribute("style", "text-decoration-thickness: 0.5rem;");
  resultEl.setAttribute("style", "font-size: 2rem;");
  resultEl.setAttribute("style", "align-content: start;");
  return;
}

function playTheGame(QnAs) {  
  for (let i=0; i<QnAs["questions"].length; i++) {
    let Question = QnAs["questions"][i];
    questionEl.textContent = Question["question"];
    if (i===0) {
      for (let j=1; j<buttonEls.length; j++){
	buttonEls[j].setAttribute("style", "visibility: visible;");
	buttonEls[j].addEventListener("click", getPick);
      }
    }
    /* need to do the follwoing
     * update question and populate buttons with answers
     * check that answer
     * show results in the bottom */
    for (let j=1; j<buttonEls.length; j++) {
      let Answers = Question["Answers"];
      // populate answer buttons
      buttonEls[j].textContent = Answers[j-1];
    }
    // check the guess and show resutls
    showResult(checkAnswer(pick, i));
  }
  endTheGame(true);
}

function startTheGame() {  
  // remove the two functions added in the start screen
  buttonEls[1].removeEventListener("click", start);
  buttonEls[2].removeEventListener("click", end);
  // unhide timer, highScore button and score(highScoreEl)
  timerEl.setAttribute("style", "visibility: visible;");
  highScoresEl.setAttribute("style", "visibility: visible;");
  highScoreEl.setAttribute("style", "visibility: visible;");
  timer(secondsLeft);
  playTheGame(QnAs);
}


/*------------------------------------------------
 *End Game track
 *------------------------------------------------*/
let shutItDown = function (event) {
  shutDown();
}
function shutDown() {
    for (let i=0; i<buttonEls.length - 1; i++) {
      if (i !== 1){
	buttonEls[i].setAttribute("style", "visibility: hidden;");
	timerEl.setAttribute("style", "visibility: hidden;");
      } else {
	let blackLink = document.createElement("a")
	blackLink.textContent = "Fine, see you later.";
	blackLink.setAttribute("href", "./blackOut.html");
	buttonEls[i].textContent = "";
	buttonEls[i].setAttribute("style", "background-color: black;");
	buttonEls[i].appendChild(blackLink);
      }
    }
}

let enterHighScore = function(event){
  /* place score from the input box in the highscore list
   * store score
   * check it against any other scores
   * update table
   */
  
  return;
}
function highScorePage() {
  // clear button visibility and functions
  for (let i=1; i<buttonEls.length; i++) {
    switch (i) {
    case 1:
      buttonEls[i].textContent = "Enter high score!";
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].addEventListener("click", enterHighScore);
      break;
    case 2:
      buttonEls[i].removeEventListener("click", getPick);
      
      break;
    case 3:
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].setAttribute("style", "visibility: hidden;");
      break;
    case 4:
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].setAttribute("style", "visibility: hidden;");
      break;
    }
  }
  // update text and add text box and comment
  questionEl.textContent = "Enter your score below";
  initialsEl.setAttribute("style","visibility:visible");
}

function endTheGame(wasPlayed) {
  if (!wasPlayed) {
    questionEl.textContent = "You didn't want to play our game?";
    // end gamee when there was none played game
    // keep button1's listener but change text
    buttonEls[1].textContent = "No, I actually want to play.";
    // relink up button2 and text
    buttonEls[2].textContent = "Shut me down?";
    buttonEls[2].removeEventListener("click", end);
    buttonEls[2].addEventListener("click", shutItDown);    
  } else {
    // end game when a game was played
    // button1: want to play again?
    // button2: Enter highScore?
    // button3: Quit.....Now
    questionEl.textContent = "Great job!";
    for (let i=1; i<buttonEls.length; i++) {
      buttonEls[i].setAttribute("style", "visibility: visible;");
      switch (i) {
      case 1:
	buttonEls[i].textContent = "Want to play again?";
	buttonEls[i].removeEventListener("click", getPick);
	buttonEls[i].addEventListener("click", start);
	break;
      case 2:
	buttonEls[i].textContent = "Enter your highScore?";
	buttonEls[i].removeEventListener("click", getPick);
	buttonEls[i].addEventListener("click", highScorePage);
	break;
      case 3:
	buttonEls[i].textContent = "Wait, leaving alreadyx?";
	buttonEls[i].removeEventListener("click", getPick);
	buttonEls[i].addEventListener("click", shutItDown);
      case 4:
	buttonEls[i].setAttribute("style", "visibility: hidden;");
	buttonEls[i].removeEventListener("click", getPick);
      }
    }
  } 
}

startScreen();

