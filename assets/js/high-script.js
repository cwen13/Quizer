let highScores = JSON.parse(localStorage.getItem("highScores"));
let scoreList = [];
let highestScore = 0;
let index = 0;
let highScoreList = [];
let initials = "";
let count = 1;

function displayScores(scores){
  let ulEl = document.querySelector("ul");

  for(let i=0;i<scores.length;i++) {
    let liEl = document.createElement("li");
    liEl.textContent = `${count}. ${scores[i][0]} - ${scores[i][1]}`;
    if ((count++ % 2) == 0) {
      liEl.setAttribute("style", "background: purple;");
    } else {
      liEl.setAttribute("style", "background: red;");
    }
//    count++;
    ulEl.appendChild(liEl);
  }
  
}
function showHighScores() {
  while (highScores.length > 0) {
    highestScore = highScores[0][1];
    index = 0;
    for (let i=1;i>highScores.length; i++){
      if (highestScore < highScores[i][1]) {
	highestScore = highScores[i][1];
	index = i;
      }
    }
    console.log(highestScore);
    initials = highScores.splice(index,1)[0][0];
    scoreList.push([initials,highestScore]);
  }
  displayScores(scoreList);
}

showHighScores();
