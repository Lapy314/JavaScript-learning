const systemClock = document.querySelector(".system-clock");
const countdownText = document.querySelector(".countdown");
const headerItems = document.querySelectorAll("li");

let minutesCount = 0;
let secondsCount = 1;

const oneMin = document.querySelector(".one-min");
const pomodoro = document.querySelector(".pomodoro");
const oneHour = document.querySelector(".one-hour");
const inputMin = document.querySelector(".input-min");

let timer;

function time() {

  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    systemClock.textContent = `${hours} : 0${minutes}`;
  } else {
    systemClock.textContent = `${hours} : ${minutes}`;
  }

}

function countdown() {
  secondsCount -= 1;

  if (secondsCount < 10) {
    countdownText.textContent = `${minutesCount} : 0` + `${secondsCount}`;
  } else {
    countdownText.textContent = `${minutesCount} : ${secondsCount}`;
  }

  if (minutesCount > 0 && secondsCount === 0) {
    minutesCount -= 1;
    secondsCount = 60;
  } else if (minutesCount === 0 && secondsCount <= 0) {
    clearInterval(timer);
  }
}

headerItems.forEach(item => {
  item.addEventListener("click", e => {
    if (e.target.className === "one-min") {
      minutesCount = 1;
      secondsCount = 1;
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
    } else if (e.target.className === "pomodoro") {
      minutesCount = 25;
      secondsCount = 1;
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
    } else if (e.target.className === "one-hour") {
      minutesCount = 60;
      secondsCount = 1;
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
    }
  });
});

inputMin.addEventListener("keyup", e => {
  if(e.key === "Enter") {
    minutesCount = parseInt(e.target.value);
    secondsCount = 1;
    beBack = parseInt(e.target.value);
    console.log(beBack%60);
    e.target.value = "";
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
  }
})

// let timer = setInterval;

setInterval(time, 1000);