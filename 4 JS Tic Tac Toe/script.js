const div = document.querySelectorAll(".box");
const div2 = document.querySelector(".box");
const buttonAI = document.querySelector("#ai");
const buttonPVP = document.querySelector("#pvp");
const buttonReset = document.querySelector("#reset");
const modal = document.querySelector(".startGameModal");

let symbol = "O"
let playerOne = [];
let playerTwo = [];
let gameMode = "";
let turn = 0;

//game mode
buttonAI.addEventListener("click", () => {
    modal.style.display = "none";

    div.forEach(box => {
      // Player vs AI
      box.addEventListener("click", e => {
        symbol = "O";
            playerOne.push(parseInt(e.currentTarget.dataset.field));

            e.target.textContent = "O";
            e.target.style.pointerEvents = "none";
            e.target.classList.add("glow-circle");
            if(playerOne.length === 5) {
              if(checkWinner(playerOne)) {
                setTimeout(() => alert("p1 winner"), 50);
                return ;
              };
            }
            if (playerOne.length >= 3) {
              if(checkWinner(playerOne)) {
                setTimeout(() => alert("p1 winner"), 50);
                return ; 
              };
            }
            playerAI();
            if (playerTwo.length >= 3) {
              symbol = "X";
              if(checkWinner(playerTwo)) {
                setTimeout(() => alert("p2 winner"), 50);
              };
            }
        });
    });
});

buttonPVP.addEventListener("click", () => {
  modal.style.display = "none";

  div.forEach(box => {
    box.addEventListener("click", e => {
      let symbolClass = "glow-circle";
      if (turn % 2 === 1) {
        symbol = "X";
        symbolClass = "glow-cross";
        turn++;
      } else {
        symbol = "O";
        turn++;
      }
      if (symbol === "O") {
        playerOne.push(parseInt(e.currentTarget.dataset.field));
      } else {
        playerTwo.push(parseInt(e.currentTarget.dataset.field));
      }
      e.target.textContent = symbol;
      e.target.style.pointerEvents = "none";
      e.target.classList.add(symbolClass);
      
      if (playerOne.length >= 3) {
        // debugger;
        if(checkWinner(playerOne)) {
          setTimeout(() => alert("p1 winner"), 50);
        };
      }
      if (playerTwo.length >= 3) {
        if(checkWinner(playerTwo)) {
          setTimeout(() => alert("p2 winner"), 50);
        };
      }
    });
  });
});

buttonReset.addEventListener("click", () => {
  turn = 0;
  playerOne = [];
  playerTwo = [];
  div.forEach(box => {
    // let broj = 1;
    box.textContent = "1";
    box.classList.remove("glow-circle");
    box.classList.remove("glow-cross");
    box.style.pointerEvents = "";
    // broj++; 
  });
});

//ai play logic
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function playerAI() {
  let number = getRandomInt(9);
  if (number === 0) {
    return playerAI();
  }

  const field = document.querySelector(`[data-field="${number}"]`);

  if (playerOne.indexOf(number) === -1 && playerTwo.indexOf(number) === -1) {
    playerTwo.push(number);
    field.textContent = "X";
    field.style.pointerEvents = "none";
    field.classList.add("glow-cross");
  } else {
    if (playerTwo.length === 4) return;
    return playerAI();
  }
}

//check winner
function checkWinner(player) {
  let playerName = "";
  // debugger;
  console.log(symbol)
  symbol === "O" ? playerName = "playerOne" : playerName = "playerTwo";
  const test = player.filter(n => n === 1 || n === 2 || n === 3);
  const test1 = player.filter(n => n === 1 || n === 4 || n === 7);
  const test2 = player.filter(n => n === 1 || n === 5 || n === 9);
  const test3 = player.filter(n => n === 2 || n === 5 || n === 8);
  const test4 = player.filter(n => n === 3 || n === 5 || n === 7);
  const test5 = player.filter(n => n === 3 || n === 6 || n === 9);
  const test6 = player.filter(n => n === 4 || n === 5 || n === 6);
  const test7 = player.filter(n => n === 7 || n === 8 || n === 9);
  if (test.length === 3
    || test1.length === 3
    || test2.length === 3
    || test3.length === 3
    || test4.length === 3
    || test5.length === 3
    || test6.length === 3
    || test7.length === 3) {
    // alert(`${playerName} winner`);
    return true;
  }
}
