const submit = document.querySelector(".submit-btn");
const pwField = document.querySelector(".pw-field");
const clipboard = document.querySelector(".fa-clipboard");
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+={}";

function upper() {
  return upperLetters[Math.floor(Math.random() * Math.floor(upperLetters.length))];
}
function lower() {
  return lowerLetters[Math.floor(Math.random() * Math.floor(lowerLetters.length))];
}
function rand_number() {
  return numbers[Math.floor(Math.random() * Math.floor(numbers.length))];
}
function rand_symbol() {
  return symbols[Math.floor(Math.random() * Math.floor(symbols.length))];
}

function handleGenerator(e) {

  let passwordArr = [];

  const upperCheck = document.querySelector(".check-upper");
  const lowerCheck = document.querySelector(".check-lower");
  const numbersCheck = document.querySelector(".check-number");
  const symbolsCheck = document.querySelector(".check-symbol");
  const pwLength = document.querySelector("#pwLength");

  while (passwordArr.length < pwLength.value) {
    if (upperCheck.checked) {
      passwordArr.push(upper());
    }
    if (lowerCheck.checked) {
      passwordArr.push(lower());
    }
    if (numbersCheck.checked) {
      passwordArr.push(rand_number());
    }
    if (symbolsCheck.checked) {
      passwordArr.push(rand_symbol());
    }
  }

  passwordArr.splice(pwLength.value);

  pwField.value = passwordArr.join("");

}

clipboard.addEventListener("click", () => {
  pwField.select();
  document.execCommand("copy");
  alert("kopirano: " + pwField.value);
});
submit.addEventListener("click", handleGenerator);

 