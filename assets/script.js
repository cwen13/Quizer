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

function startTheGame() {
  tearDownStart()

  highscoresEl.setAttribute("visibility", "visible");
  timerEl.setAttribute("visibility", "visible");
 
}


function endTheGame() {
}


let answersList = document.createElement("ul");
let answerEl1 = document.createElement("li");
let answerEl2 = document.createElement("li");
let answerEl3 = document.createElement("li");
let answerEl4 = document.createElement("li");
let buttonEl1 = document.createElement("button");
let buttonEl2 = document.createElement("button");

function tearDownStart() {
  answerEl1.removeChild(buttonEl1);
  answerEl2.removeChild(buttonEl2);
  answersList.removeChild(answerEl1);
  answersList.removeChild(answerEl2);
  document.querySelector("main").removeChild(answersList);
  
}

function buildStartScreen() {
  answersEl.appendChild(answersList);

  buttonEl1.textContent = "1. Yes I do.";
  answerEl1.appendChild(buttonEl1);
  buttonEl1.setAttribute("class","yes");
  buttonEl1.setAttribute("style","visibility: visible;");
  answersList.appendChild(answerEl1);
  buttonEl1.addEventListener("click", startTheGame);
  
  
  buttonEl2.textContent = "2. No, don't bother me.";
  answerEl2.appendChild(buttonEl2);
  buttonEl1.setAttribute("class","no");
  buttonEl2.setAttribute("style","visibility: visible;");
  answersList.appendChild(answerEl2);
  buttonEl2.addEventListener("click", endTheGame);
  
  answersEl.appendChild(answersList);
  
  answersEl.setAttribute("style","display: flex; flex-direction: column;\
                          justify-content: center; font-size: 3rem;");
}
  
function startScreen() {
  questionEl.textContent = "Do you want to play a game?";
  questionEl.setAttribute("style","font-size: 4rem;")
  buildStartScreen()
  
}


startScreen();

