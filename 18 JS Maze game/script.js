// get dom elements
const gameBoard = document.querySelector(".game-board");
const playerName = document.querySelector(".name");
const playerScore = document.querySelector(".score");

let scoreCounter = 0;

// create player, opponent divs and append to gameboard
const createPlayer = document.createElement("div");
createPlayer.classList.add("player");
gameBoard.append(createPlayer);
const playerDiv = document.querySelector(".player");

const createOpponent = document.createElement("div");
createOpponent.classList.add("opponent");
gameBoard.append(createOpponent);

//get player position 
let playerPositionTop = getComputedStyle(playerDiv).top;
let playerPositionLeft = getComputedStyle(playerDiv).left;
let moveR = 0;
let moveL = 0;
let moveU = 0;
let moveD = 0;

// player class 
class Player {

  //add color or similar properties that can be tied to object

  constructor(name, height, width) {
    this.name = name;
    this.height = `${height}px`;
    this.width = `${width}px`;
  }

  move_up() {
    if (topToInt(createPlayer) === 0) {
      moveU = 0;
      createPlayer.style.top = moveU;
    } else {
      createPlayer.style.top = moveU - 50;
    }
    moveU = topToInt(createPlayer);
    moveD = moveU;
    console.log({ moveU });
  }

  move_down() {
    if (topToInt(createPlayer) === 650) {
      moveD = 650;
      createPlayer.style.top = moveU;
    } else {
      createPlayer.style.top = moveU + 50;
    }
    moveD = topToInt(createPlayer);
    moveU = moveD;
    console.log({ moveD });
  }

  move_left() {
    if (leftToInt(createPlayer) === 0) {
      moveL = 0;
      createPlayer.style.left = moveL;
    } else {
      createPlayer.style.left = moveL - 50;
    }
    moveL = leftToInt(createPlayer);
    moveR = moveL;
  }

  move_right() {
    if (leftToInt(createPlayer) === 650) {
      moveR = 650;
      createPlayer.style.left = moveR;
    } else {
      createPlayer.style.left = moveR + 50;
    }
    moveR = leftToInt(createPlayer);
    moveL = moveR;
  }
}

let player1 = new Player("toni", 50, 50);
let opponent1 = new Player("mate", 50, 50);

playerName.textContent = player1.name;
createPlayer.style.height = player1.height;
createPlayer.style.width = player1.width;

createOpponent.style.height = opponent1.height;
createOpponent.style.width = opponent1.width;


// generate random coords according to player size
let coord = [];

function randomCoord() {
  coord = [];

  for (let i = 50; i < 700; i += 50) {
    coord.push(i);
  }
  createOpponent.style.left = coord[getRandomIntInclusive(0, coord.length)];
  createOpponent.style.top = coord[getRandomIntInclusive(0, coord.length)];
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

randomCoord();

function checkOverlap(player, opponent) {
  if (player.getBoundingClientRect().x === opponent.getBoundingClientRect().x
    && player.getBoundingClientRect().y === opponent.getBoundingClientRect().y) {
    randomCoord();
    scoreCounter++;
    playerScore.textContent = scoreCounter;
  }
}

function checkOutOfBounds(player) {
  if (parseInt(player.style.top.split("px"[0])) < 0) {
    console.log("top minus");
    player.style.top = 0;
    console.log(player.style.top);
  }
  if (parseInt(player.style.left.split("px"[0])) < 0) {
    console.log("left minus");
    player.style.left = 0;
  }
}

window.addEventListener("keyup", e => {
  if (e.key === "ArrowUp") player1.move_up();
  if (e.key === "ArrowDown") player1.move_down();
  if (e.key === "ArrowLeft") player1.move_left();
  if (e.key === "ArrowRight") player1.move_right();
  checkOverlap(createPlayer, createOpponent);
  checkOutOfBounds(createPlayer);
});

createPlayer.addEventListener("click", e => {
  console.log(playerPositionTop);
  console.log(playerPositionLeft);
  console.log(e.target.getBoundingClientRect().x);
  console.log(e.target.getBoundingClientRect().y);
});


function topToInt(player) {
  return parseInt(player.style.top.split("px"[0]));
}

function leftToInt(player) {
  return parseInt(player.style.left.split("px"[0]));
}
