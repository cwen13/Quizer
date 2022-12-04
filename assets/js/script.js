/*
  Functions
  + in timer
   - start timer
   - stop timer
   - reduce time on wrong answer
  + init to build home page
  + render question+
   - build question text/buttons
  + check answer
   - if correct give points and render next question
   - if wrong reduce time/maybe lose points render next question
  + check if done
   - if not go to next question
   - if done render highscore form
  */

let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");
let resultEl = document.querySelector("#result");
let answersEls = document.querySelectorAll("li");
let buttonEls = document.querySelectorAll("button");
let timeEl = document.querySelector("#time");
let highScoresEl = document.querySelector(".highScores");
let highScoreEl = document.querySelector("#highScore");
let initialsEl = document.querySelector("#highScoreInput");
let scoreEl = document.querySelector("#score");
let secondsLeft = 90;
let score = 0;
let count = 0;
let guess;
let isCorrect = false;
let highScore = [];
let selection = "";
let playing = true;

function timer (sec) {
  let countDown = setInterval(function(){
    sec--;
    timeEl.textContent = sec;
      if (sec <= 0){
	clearInterval(countDown);
	// store score and go to end screen
	timeEl.textContent = 0;
	endTheGame(true);
      } else if (!playing) {
	console.log("Play is false");
	clearInterval(countDown);
	// store score and go to end screen
	timeEl.textContent = 0;
	endTheGame(true);
      }
  },1000);
}

/*------------------------------------------------*
 *-------------------Game-play--------------------*
 *------------------------------------------------*/
let start = function startGame(event){
  timer(secondsLeft); 
  startTheGame();
  return 1;
}

let end = function endGame(event){
  endTheGame(false);
  return 1;
}

function startScreen() {
  buttonEls[0].addEventListener("click", start);
  buttonEls[1].addEventListener("click", end);
  return 1;
}

function displayQuestion(Q, count){
  // Update questions and show answers
  questionEl.textContent = Q[count]["question"];
  for (let j=0; j<buttonEls.length; j++) {
    buttonEls[j].textContent = Q[count]["answers"][j];
  }
  return 1;
}

function checkAnswer(guess,qID) {
  count++;
  if (count >= QnAs['questions'].length) {
    playing = false;
    endTheGame(true);
  } else {
    displayQuestion(QnAs["questions"], count);
    if (guess !== qID){
      secondsLeft -= 10;
      return false;
    }
  }
  score += 10;
  scoreEl.textContent = score;
  showResult(guess);
  return true;
}

let getPick = function pick(event) {
  selection = event.currentTarget.textContent.charAt(0);
  guess = checkAnswer(selection,QnAs['questions'][count]['answer']);
  return 1;
}

function showResult(result) {  
  function ResultsTimer (sec) {
    let countDown = setInterval(function(){
      sec--;
      timeEl.textContent = sec;
      if (sec <= 0){
	clearInterval(countDown);
	resultEl.setAttribute("style","visibility: hidden");
      }
    },100);
  }
  
  // show if choice is correct/wrong and add solid overline to display
  resultEl.textContent = result ? "Correct" : "Wrong";
  resultEl.setAttribute("style", "border-style: solid none none none; border-width: 0.25rem; width: 50%; font-size: 2rem;");
  ResultsTimer(1); 
  return 1;
}

function setUpTearDown (start) {
  // set the base setting or buttons
  for (let j=0; j<buttonEls.length; j++){
    if (!start) {
      // set up question buttons
      buttonEls[j].setAttribute("style", "visibility: visible;");
      buttonEls[j].addEventListener("click", getPick);
    } else {
      // tear down butttons and remove attached funciton
      buttonEls[j].setAttribute("style", "visibility: hidden;");
      buttonEls[j].removeEventListener("click", getPick);
    }
  }
  return 1;
}

function playTheGame() {
  setUpTearDown(true);
  displayQuestion(QnAs["questions"], count);
  setUpTearDown();
  return 1;
}

/*------------------------------------------------
 *----------------End-Game-track------------------
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
  return 1;
}

let enterHighScore = function(event){
  event.preventDefault()
  /* place score from the input box in the highscore list
   * store score
   * check it against any other scores
   * update table
   */
  // pull score in a array from localStorage
  try {
    scoreList = JSON.parse(localStorage.getItem("highScores"));
  } catch (e) {
    scoreList = [];
  }
  
  // add intials entered and score into local Stoarge
  scoreList.push([initialsEl.value, score]);
  localStorage.setItem("highScores",JSON.stringify(scoreList));
  window.location.href = "./highScores.html";
  return 1;  
}
  
function highScorePage() {
  // update text and add text box and comment
  questionEl.textContent = "Enter your intials";
  initialsEl.setAttribute("style", "visibility: visible;");
  // clear button visibility and functions
  for (let i=0; i<buttonEls.length; i++) {
    switch (i) {
    case 0:
      buttonEls[i].textContent = "Submit";
      buttonEls[i].setAttribute("style", "");
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].addEventListener("click", enterHighScore);
      break;
    case 1:
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].removeEventListener("click", highScorePage);
      buttonEls[i].setAttribute("style", "visibility: hidden;");
      break;
    case 2:
    case 3:
      buttonEls[i].removeEventListener("click", getPick);
      buttonEls[i].setAttribute("style", "visibility: hidden;");
      break;
    }
  }
}

function endTheGame(wasPlayed) {
  playing=false;
  // get timer to zero out
  secondsLeft=90;
  timeEl.textContent = 0;
  // hide the correct/wrong at bottom
  resultEl.setAttribute("style", "visibility: hidden;");
  // remove the getPick listener
  for (let i=0;i<buttonEls.length;i++) {
    buttonEls[i].removeEventListener("click", getPick);
  }
  // if no game was played
  if (!wasPlayed) {
    questionEl.textContent = "You didn't want to play the game?";
    // keep button0's listener but change text
    buttonEls[0].textContent = "No, I actually want to play.";
    // relink up button1 and text
    buttonEls[1].textContent = "Shut me down?";
    buttonEls[1].addEventListener("click", shutItDown);    
  } else {
    // end game when a game was played
    // button1: want to play again?
    // button2: Enter highScore?
    questionEl.textContent = "Great job!";
    for (let i=0; i<buttonEls.length; i++) {
      buttonEls[i].setAttribute("style", "visibility: visible;");
      switch (i) {
      case 0:
	count = 0;
	secondsLeft = 90 ;
	buttonEls[i].textContent = "Want to play again?";
	buttonEls[i].addEventListener("click", start);
	break;
      case 1:
	buttonEls[i].textContent = "Enter your highScore?";
	buttonEls[i].addEventListener("click", highScorePage);
	break;
      case 2:
      case 3:
	buttonEls[i].setAttribute("style", "visibility: hidden;");
	break;
      }
    }
  }
  return 1;
}

function startTheGame() {
  // remove the two functions added in the start screen
  buttonEls[0].removeEventListener("click", start);
  buttonEls[1].removeEventListener("click", end);
  // unhide timer, highScore anchor, and score
  timerEl.setAttribute("style", "visibility: visible;");
  highScoresEl.setAttribute("style", "visibility: visible;");
  highScoreEl.setAttribute("style", "visibility: visible;");
  // remove possible leftover listners on the buttons
  for (let i=0; i<buttonEls.length; i++) {
    buttonEls[i].removeEventListener("click", highScorePage);
    buttonEls[i].removeEventListener("click", shutItDown);
  }
  playing = true;
  score = 0;
  scoreEl.textContent = score;
  playTheGame();
}

// wrapper for the start of the game
startScreen();

/* JS file for questions and answers
 *--------JSON-Questions-&-Answers------------*/
const QnAs = {
  "questions": [
    {"question": "What is the out put of 'typeof' when given an array?",
     "answers": ["A. Object",
		 "B. Array",
		 "C. String",
		 "D. Funciton"],
      "answer": "A"},
    {"question": "String for the question1?",
     "answers": ["A if you go",
		 "B if you see",
		 "C if you play",
		 "D if your good"],
      "answer": "B"},
    {"question": "String for this question2?",
     "answers": ["A when its dark",
		 "B when its storms",
		 "C when the light is dim",
		 "D when the strong walk no more"],
     "answer": "C"}]}
