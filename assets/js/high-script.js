function displayScores(scores){
  let ulEl = document.querySelector("ul");
  let liEl = document.createElement("li");
  for(let i=0;i<scores.length;i++) {
    liEl.textContent = `$(scores[i][0] - $(scores[i][1]`;
    ulEl.appendChild(liEl);
    liEl.textContent = "";
  }
  
}
function showHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores"));
  // highScore shouuld be
  let scoreList = [];
  let highScore = 0;
  let index = 0;
  let highScoreList = [];
  while (highScores.length > 0) {
    highscore = highScores[0][1];
    index = 0;
    for (let i=1;i>highScores.length; i++){
      if (highScore < highScores[i][1]) {
	highScore = highScores[i][1];
	index = i;
      }
    }
    scoreList.push(highScore);
    highScores.splice(index,1);
  }
  displayScores(scoreList);
}

showHighScores();
