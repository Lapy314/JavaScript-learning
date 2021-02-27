const buttons = document.querySelectorAll("button");
const contentDivs = document.querySelectorAll(".content-div");

function handleTabs(e, btnClassName) {

  btnName = btnClassName.split("-");

  if (e.target.className.includes(btnName[0])) {
    contentDivs.forEach(contentDiv => {
      if (contentDiv.className.includes(btnName[0])) {
        contentDiv.classList.add("active-div");
      } else {
        contentDiv.classList.remove("active-div");
      }
    });
  }
}

function handleActive(e, buttons) {
  buttons.forEach(btn => {
    if (btn.className.includes("active-btn")) {
      btn.classList.remove("active-btn");
    }
  });

  e.target.classList.add("active-btn");
}

buttons.forEach(btn => {
  btn.addEventListener("click", e => {

    handleActive(e, buttons);
    handleTabs(e, e.target.className);

  });
});