const foods = document.querySelectorAll(".food-name");
const search = document.querySelector("#searchInput");
const hearts = document.querySelectorAll(".fa-heart-o");
const favoritesLink = document.querySelector("#favorites");

search.addEventListener("keyup", (e) => {
  const searchText = e.currentTarget.value.toLowerCase();
  foods.forEach(food => {
    if (!food.textContent.toLowerCase().includes(searchText)) {
      food.closest(".row").style.display = "none";
    } else {
      food.closest(".row").style.display = "flex";
    }
  });
});

hearts.forEach(heart => {
  heart.addEventListener("click", e => {
    heart.classList.toggle("fa-heart-o-like");
    heart.closest(".row").classList.toggle("favorite");
  });
});

favoritesLink.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");

  rows.forEach(row => {
    if (!row.classList.value.includes("favorite") && !row.classList.value.includes("nav-row")) {
      row.style.display = "none";
    }
  });
});