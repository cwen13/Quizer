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
let timerEl = document.querySelector(".timer");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");
let resultEl = document.querySelector("#result");
let answersEls = document.querySelectorAll("li");
let buttonEls = document.querySelectorAll("button");
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

function endTheGame() {

}



//let answers = [answerEl1,answerEl2,answerEl3,answerEl4,];
//let buttons = [buttonEl1,buttonEl2,buttonEl3,buttonEl4,];


function endGame() {

}

function tearDown() {

}

function buildStartScreen() {


}
  
function startScreen() {


  
}

function startTheGame(QnAs) {
  
}


startScreen();

