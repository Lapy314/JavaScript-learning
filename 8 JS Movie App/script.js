const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=2d9b2decd0de0d1ea98065eb71c2fafb";
const movieTitle = document.querySelector(".movie-card-title");
const cardImg = document.querySelector(".movie-card-img");
const movieRow = document.querySelector(".movie-row");
let movies = [];
const search = document.querySelector(".search-input");
const form = document.querySelector("form");
let search_flag = false;
const genre = document.querySelector("#kat");

function handleMovies() {
  if(search_flag) {
    movieRow.innerHTML = ``;
  }

  movies.forEach((movie, i) => {
    const card_html = document.createElement("div");
    card_html.classList.add("col-4", "mt-4");
    card_html.innerHTML = `
    <div class="card movie-card" style="width: 18rem;">
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-card-img" alt="...">
    <div class="card-body movie-card-body">
    <h5 class="card-title movie-card-title">${movie.title} <span class="movie-${i}" style="color:orange;">${movie.vote_average}</span> </h5>
    </div>
    </div>`;
    movieRow.append(card_html);
    if (movie.vote_average < 5) {//ako je neki manji on ode zavrti sve 
      const rating = document.querySelector(`.movie-${i}`);
      rating.style.color = "red";
    } else if (movie.vote_average >= 8) {
      const rating = document.querySelector(`.movie-${i}`);
      rating.style.color = "green";
    }

  });
}

async function handleMovieSearch(searchName) {

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=2d9b2decd0de0d1ea98065eb71c2fafb&language=en-US&query=${searchName}&page=1&include_adult=false`;

  const response = await fetch(searchUrl);
  const data = response.json();

  return data;
}

async function getMovie() {
  const repsonse = await fetch(apiUrl);
  const data = await repsonse.json();
  
  return data;
}

getMovie().then(data => {
  movies.push(...data.results);
  handleMovies();
});

//ili mozda keyup na inputu
form.addEventListener("submit", e => {
  e.preventDefault();

  //novi async request
  handleMovieSearch(search.value)
  .then(data => {
    search_flag = true;
    movies = [];
    movies.push(...data.results);
    handleMovies();
  });
});