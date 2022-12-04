let highScores = [];
let scoreList = [];
let highestScore = 0;
let index = 0;
let highScoreList = [];
let initials = "";
let ulEl = document.querySelector("ul");


function displayScores(scores){
  if (scores[0][0] === "This could"){
    let liEl = document.createElement("li");
    liEl.textContent = scores[0][0] + scores[0][1];
    liEl.setAttribute("style", "background: gold;");
    ulEl.appendChild(liEl);
  } else {
    for(let i=0;i<scores.length;i++) {
      let liEl = document.createElement("li");
      liEl.textContent = `${i+1}. ${scores[i][0]} - ${scores[i][1]}`;
      if ((i % 2) == 0) {
	liEl.setAttribute("style", "background: #fc0025;");
      } else {
	liEl.setAttribute("style", "background: #fc7b8f;");
      }
      ulEl.appendChild(liEl);
    }
  }
  return 1
}

function showHighScores() {
  try {
    highScores = JSON.parse(localStorage.getItem("highScores"));
  } catch (e) {
    highScores.push(['This could', ' be you']);
  }
  if (highScores[0][0] == "This could"){
    displayScores(highScores);
    return;
  } else {
    while (highScores.length > 0) {
      highestScore = 0;
      for (let i=0;i<highScores.length; i++){
	if (highestScore <  highScores[i][1]) {
	  highestScore = highScores[i][1];
	  index = i;
	  console.log(highestScore);
	}
      }
      initials = highScores.splice(index,1)[0][0];
      scoreList.push([initials,highestScore]);
    }
    displayScores(scoreList);
  }
  return 1;
}

showHighScores();
