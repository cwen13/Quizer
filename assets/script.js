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
      "Answers": ["A","B","C","D"],
      "Answer": "B"},
    {"question": "String for this question3?",
      "Answers": ["A","B","C","D"],
      "Answer": "C"}]}
//-------------------------------------------->
let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");
let resultEl = document.querySelector("#result");
let answersEls = document.querySelectorAll("li");
let buttonEls = document.querySelectorAll("button");
let timeEl = document.querySelector("#time");
let highscoresEl = document.querySelector("#highscores button");
let highscoreEl = document.querySelector("#highscore");
const secondsLeft = 90;
let highscore = 0;
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
//      localStorage.set("highscore", );
      endTheGame(true);
    }
  },1000);
}


function shutDown() {
    for (let i=0; i<buttonEls.length - 1; i++) {
      if (i !== 1){
	buttonEls[i].setAttribute("style", "visibility: hidden;");
	timerEl.setAttribute("style", "visibility: hidden;");
      } else {
	let blackLink = document.createElement("a")
	blackLink.textContent = "Fine, I quit.";
	blackLink.setAttribute("href", "./blackOut.html");
	buttonEls[i].textContent = "";
	buttonEls[i].setAttribute("style", "background-color: black;");
	buttonEls[i].appendChild(blackLink);
      }
    }
}

function endTheGame(wasPlayed) {
  if (!wasPlayed) {
    // end gamee when there was no played game
    questionEl.textContent = "You didn't want to play our game?";
    for (let i=1; i<buttonEls.length - 1; i++) {
      buttonEls[i].setAttribute("style", "visibility:visible;");
      if (i === 1) {
	buttonEls[i].textContent = "Shut me down?";
	buttonEls[i].addEventListener("click", () => {shutDown();});
      }else if (i === 2) {
	buttonEls[i].textContent = "No, I actually want to play.";
	buttonEls[i].addEventListener("click", () => {startTheGame();});
      } else {
	buttonEls[i].textContent = "Wait, where are you going?";
	buttonEls[i].addEventListener("click", () => {
	  questionEl.textContent = "I'll be gone.";
	  timer(3);
	  shutDown();
	});
      }
    }
  } else {
    // end game when  agame was played
    // button1: want to play again?
    // button2: Enter highscore?
    // button3: Quit.....Now
    questionEl.textContent = "Great job!";
    for (let i=1; i<buttonEls.length; i++) {
      buttonEls[i].setAttribute("style", "visibility:visible;");
      switch (i) {
      case 1:
	buttonEls[i].textContent = "Want to play again?";
	buttonEls[i].addEventListener("click", () => {startTheGame();});
	break;
      case 2:
	buttonEls[i].textContent = "Enter your highscore?";
	buttonEls[i].addEventListener("click", () => {highScores( );});
	break;
      case 3:
	buttonEls[i].textContent = "Wait, where are you going?";
	buttonEls[i].addEventListener("click", () => {shutDown;});
      case 4:
	buttonEls[i].setAttribute("style", "visibility: hidden;");
      }
    }

  }
  
}

function start(){
  startTheGame(QnAs);
  return;
}
function end(){
  endTheGame(false);
  return;
}
function startScreen() {
  buttonEls[1].addEventListener("click", start);
  buttonEls[2].addEventListener("click", end);
  return;
}

function checkAnswer(guess,qID) {
  isCorrect = (guess === qID) ? true : false;
  console.log("Pick is: " + isCorrect);
  return;
}
  
function buildQandA (questionID) {
  let Question = QnAs["questions"][questionID];
  questionEl.textContent = Question["question"];
  for (let j=1; j<buttonEls.length; j++) {
    let Answers = Question["Answers"];
    buttonEls[j].textContent = Answers[j-1];
  }
  return guess;
}


function playTheGame(QnAs) {
  for (let i=1; i<buttonEls.length; i++) {
    buttonEls[i].setAttribute("style", "visibility: visible;");
    buttonEls[i].addEventListener("click", () => {
      guess = (buttonEls[i].textContent).charAt(0);
      console.log(guess);
    });

  }
  for(let i=0; i<QnAs["questions"].length; i++) {
    checkAnswer(buildQandA(i), QnAs["questions"][i]["Answer"]);
  }
}

function startTheGame() {  
  // remove the two functions added in teh start screen
  buttonEls[1].removeEventListener("click", start);
  buttonEls[2].removeEventListener("click", end);

  // unhide timer, highscore button and score
  timerEl.setAttribute("style", "visibility: visible;");
  highscoresEl.setAttribute("style", "visibility: visible;");
  highscoreEl.setAttribute("style", "visibility: visible;");
  timer(secondsLeft);
  playTheGame(QnAs);
}

startScreen();

