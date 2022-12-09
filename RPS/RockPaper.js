
// --------------------------------------------//
let selections = document.querySelectorAll(".selections");
let score = document.getElementById("score");
let result = document.getElementById("result");
let restart = document.getElementById("restart");


// ------------------------------------//
// play
function play(e){
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    result.innerHTML = winner;
    getScore(winner);
};


// computer random choice
 function getComputerChoice() { 
    let selectionArr = ["rock", "paper", "scissors"]; 
    let randomAnswer = selectionArr[Math.floor(Math.random() * selectionArr.length)];
    return randomAnswer;
    };


    // winner 
function getWinner(p, c){
  if(p === c){
      return "It is a Draw";
  } else if((p === "rock" && c === "paper") ||(p === "paper" && c === "scissors")
  || (p === "scissors" && c === "rock")){
     return "Computer wins"
  } else if((p === "paper" && c === "rock") ||(p === "scissors" && c === "paper")
  || (p === "rock" && c === "scissors")){
      return "Player wins"
  } else {
      return "Nobody wins"
  }
};


// show winner
function getScore (winner){
    let pScore = 0;
    let cScore = 0;
 if(winner === "Player wins"){
    pScore++;
 }
 else if(winner === "Computer wins"){
     cScore++;
 }

 score.innerHTML = `
 <h2 class="cDisplay">Computer: <span style= color:green>${cScore}</span></h2>
 <h2 class="pDisplay">Player: <span style= color:green>${pScore}</span></h2>
 `
 
}

// restart the game
function restartGame(){
    pScore = 0;
    cScore = 0;
    score.innerHTML = `
 <h2 class="cDisplay">Computer: <span style= color:#333>${cScore}</span></h2>
 <h2 class="pDisplay">Player: <span style= color:#333>${pScore}</span></h2>
 `
 result.innerHTML = `<p>Lets Play!</p>`
}

// click the buttons , trigger the event
selections.forEach(choice => {
    choice.addEventListener("click", play);
});

restart.addEventListener("click", restartGame);
























    


