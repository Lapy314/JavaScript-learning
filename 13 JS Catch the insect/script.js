const playScreen = document.querySelector(".play-screen");
const mainLogo = document.querySelector(".logo");
const scoreSpan = document.querySelector(".score");
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
let logoCoord = mainLogo.getBoundingClientRect();
let countLogo = 1;
let score = 0;
const pslogo = "images/ps.png";


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomLogoPosition(logo) {
  let randomWidth = getRandomInt(viewportWidth);
  let randomHeight = getRandomInt(viewportHeight);
  logo.style.position = "absolute";
  if ((viewportHeight - randomHeight) < 80) {
    logo.style.top = `${viewportHeight - 80}px`;
  } else {
    logo.style.top = `${randomHeight}px`;
  }

  if ((viewportWidth - randomWidth) < 100) {
    logo.style.left = `${viewportWidth - 100}px`;
  } else {
    logo.style.left = `${randomWidth}px`;
  }
}

function createLogo() {
  const newLogo = document.createElement("img");
  newLogo.classList.add("logo", `logo-${countLogo}`);
  newLogo.setAttribute("src", `${pslogo}`);
  newLogo.setAttribute("width", `${100}px`);

  // debugger
  randomLogoPosition(newLogo);

  playScreen.append(newLogo);

  countLogo++;
}

playScreen.addEventListener("click", e => {
  console.log(e);
  if (e.target.localName === "img") {
    e.target.remove();
    scoreSpan.textContent = ++score;
  }

  createLogo();
  createLogo();

});

setTimeout(randomLogoPosition(mainLogo), 100);