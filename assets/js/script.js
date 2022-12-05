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
let guess = true;
let isCorrect = false;
let highScore = [];
let selection = "";
let playing = true;
// Questions and answers are in JSON at the bottom of file

function timer () {
  let countDown = setInterval(function(){
    timeEl.textContent = secondsLeft;
      if (secondsLeft <= 0){
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
    secondsLeft--;
  },1000);
}

/*------------------------------------------------*
 *-------------------Game-play--------------------*
 *------------------------------------------------*/

// startTheGame wrapper
let start = function startGame(event){
  timer(); 
  startTheGame();
  return 1;
}

// endTheGame wrapper
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

// check answer and progress to the next question
function checkAnswer(guess,qID) {
  count++;
  if (count >= QnAs['questions'].length) {
    playing = false;
    endTheGame(true);
  } else {
    displayQuestion(QnAs["questions"], count);    
  }
  if (guess == qID) {
    isCorrect = true;
    score += 10;
    scoreEl.textContent = score;
  } else {
    isCorrect = false;
    secondsLeft -= 15;
  }
  showResult(isCorrect);
  return isCorrect;
}

// retriveing pick from the player
let getPick = function pick(event) {
  selection = event.currentTarget.textContent.charAt(0);
  guess = checkAnswer(selection,QnAs['questions'][count]['answer']);
  return 1;
}

// flash if the prevvious quesiton is correct or wrong
function showResult(result) {  
  function ResultsTimer (sec) {
    let resultCountDown = setInterval(function(){
      sec--;
      timeEl.textContent = sec;
      if (sec <= 0){
	clearInterval(resultCountDown);
	resultEl.setAttribute("style","visibility: hidden");
      }
    },250);
  }
  let answerCheck;
  // show if choice is correct/wrong and add solid overline to display
  if (result) {
    answerCheck = "Correct";
  } else {
    answerCheck = "Wrong";
  }
  //  resultEl.textContent = result ? "Correct" : "Wrong";
  resultEl.textContent = answerCheck;
  resultEl.setAttribute("style", "border-style: solid none none none; border-width: 0.25rem; width: 50%; font-size: 2rem; visibility: visible;");
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

// game play
function playTheGame() {
  score = 0;
  setUpTearDown(true);
  displayQuestion(QnAs["questions"], count);
  setUpTearDown();
  return 1;
}

/*------------------------------------------------
 *----------------End-Game-track------------------
 *------------------------------------------------*/

// shutItDown wrapper
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
	blackLink.textContent = "Click to leave this quiz.";
	blackLink.setAttribute("href", "./blackOut.html");
	buttonEls[i].textContent = "";
	buttonEls[i].setAttribute("style", "background-color: black;");
	buttonEls[i].appendChild(blackLink);
      }
    }
  return 1;
}

// high score enter wrapper
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
  scoreList.push([initialsEl.value, scoreEl.textContent]);
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
  return 1;
}

function endTheGame(wasPlayed) {
  playing=false;
  // get timer to zero out
  timeEl.textContent = 0;
  // hide the correct/wrong at bottom
  resultEl.setAttribute("style", "visibility: hidden;");
  // remove the getPick listener
  for (let i=0;i<buttonEls.length;i++) {
    buttonEls[i].removeEventListener("click", getPick);
  }
  // if no game was played
  if (!wasPlayed) {
    questionEl.textContent = "You didn't want to play the quiz game?";
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
  count = 0;
  secondsLeft = 90;
  playing = true;
  scoreEl.textContent = score;
  playTheGame();
  return 1;
}

// wrapper for the start of the game
startScreen();

/* JSON for questions and answers
 *--------JSON-Questions-&-Answers------------*/
const QnAs = {
  "questions": [
    {"question": "What is the out put of 'typeof' when given an array?",
     "answers": ["A. Object",
		 "B. Array",
		 "C. String",
		 "D. Funciton"],
      "answer": "A"},
    {"question": "Given an array what is the index of the first element?",
     "answers": ["A. 1",
		 "B. 0",
		 "C. A",
		 "D. a"],
      "answer": "B"},
    {"question": "What is it called when a function calls it self?",
     "answers": ["A. Reflection",
		 "B. Refraction",
		 "C. Recursive",
		 "D. Retrograde"],
     "answer": "C"},
    {"question": "Is a semi-colon required at the end of every line of JS code?",
     "answers": ["A. Yes",
		 "B. No",
		 "C. Inside of a loop body",
		 "D. Inside of an if body"],
     "answer": "B"},
    {"question": "How is JS typed?",
     "answers": ["A. Dynamic",
		 "B. Static",
		 "C. Inferred",
		 "D. Linear"],
     "answer": "A"},
    {"question": "JavaScript is a sub set of Java?",
     "answers": ["A. Yes",
		 "B. No",
		 "C. Everybit",
		 "D. Everybyte"],
     "answer": "A"},
    {"question": "JavaScript was created in?",
     "answers": ["A. 1984",
		 "B. 1993",
		 "C. 1954",
		 "D. 1995"],
     "answer": "D"},
    {"question": "How many threads does JavaScript have?",
     "answers": ["A. One",
		 "B. Two",
		 "C. Multi-threads",
		 "D. Three"],
     "answer": "A"},
    {"question": "JSON stands for",
     "answers": ["A. Just Store Objects Now",
		 "B. JavaScript Object Notation",
		 "C. Java Scan Object Notation",
		 "D. JSON Style Of Notation"],
     "answer": "B"},
    {"question": "Typscript is what?",
     "answers": ["A. JavaScript with capital letters.",
		 "B. Strict syntactical superset of JavaScript.",
		 "C. Type based JavaScript.",
		 "D. Javascript with a fancy name."],
     "answer": "B"}
  ]
}
