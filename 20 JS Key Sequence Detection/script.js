const body = document.querySelector("body");

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let code = [];
let i = 0;
window.addEventListener("keyup", e => {

  code.push(e.key);
   
  if(code[i] === konami[i]) {
    i++;
  } else {
    code = [];
    i = 0;
  }

  
    console.log(i);
    console.log(code);

  if(i === 10) {
    body.style.backgroundImage = "url('secret.jpg')";
    code = []
    i = 0;
  }
});

