// JS file for questions and answers
//--------JSON-Questions-&-Answers------------>
const QnAs = {
  "questions": [
    {"question0": "String for a question0?",
      "Answers": ["A","B","C","D"],
      "Answer": "A"},
    {"question1": "String for a question1?",
      "Answers": ["A","B","C","D"],
      "Answer": "B"},
    {"question2": "String for a question3?",
      "Answers": ["A","B","C","D"],
      "Answer": "C"}]}
//-------------------------------------------->
let highscoresEl = document.querySelector("#highscores");
let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");
let resultEl = document.querySelector("#result");

let timeEl = document.querySelector("#time");
let secondsLeft = 90;
timeEl.textContent = secondsLeft

function timer () {
  let countDown = setInterval(function(){
    secondsLeft--;
    timeEl.textContent = secondsLeft.toString();
    if (secondsLeft === 0){
      clearInterval(countDown);
    } },1000);
}

let answersList = document.createElement("ul");
let answerEl1 = document.createElement("li");
let answerEl2 = document.createElement("li");

function startScreen() {
  questionEl.textContent = "Do you want to play a game?";
  questionEl.setAttribute("style","font-size: 4rem;")

  answersEl.appendChild(answersList);
  answerEl1.textContent = "1. Yes I do.";
  answersList.appendChild(answerEl1);
  answerEl2.textContent = "2. No, don't bother me.";
  answersList.appendChild(answerEl2);
  answersEl.appendChild(answersList);
  
  answersEl.setAttribute("style","display: flex; flex-direction: column; justify-");
  answersEl.setAttribute("style","font-size: 3rem;");
  
}

function startTheGame() {
  highscoreEl.setAttribute("visibility", "visible");
  timerEl.setAttribute("visibility", "visible");
 
}

//startScreen();

