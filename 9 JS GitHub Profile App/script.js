let reposArr = [];
const imgDiv = document.querySelector(".img-div");
const ul = document.querySelector("ul");
const name = document.querySelector("#name");
const about = document.querySelector("#about");
const noFollowers = document.querySelector("#no-followers");
const noFollowing = document.querySelector("#no-following");
const noRepos = document.querySelector("#no-repos");
const form = document.querySelector("form");
let searchFlag = false;

async function getUser(input = "lapy314") {
  const endpoint = `https://api.github.com/users/${input}`;
  const response = await fetch(endpoint);
  const data = response.json();

  return data;
}

async function getRepos(input = "lapy314") {
  const repos = `https://api.github.com/users/${input}/repos`;
  const response = await fetch(repos);
  const data = response.json();

  return data;
}

function handleUserContent(data) {
  if(searchFlag) {
    const img = document.createElement("img");
    imgDiv.innerHTML = ``;
    img.setAttribute("src", `${data.avatar_url}`);
    imgDiv.append(img);
    name.textContent = data.name;
    about.textContent = data.bio;
    noFollowers.textContent = data.followers;
    noFollowing.textContent = data.following;
    noRepos.textContent = data.public_repos;
  } else {
    const img = document.createElement("img");
    img.setAttribute("src", `${data.avatar_url}`);
    imgDiv.append(img)
    name.textContent = data.name;
    about.textContent = data.bio;
    noFollowers.textContent = data.followers;
    noFollowing.textContent = data.following;
    noRepos.textContent = data.public_repos;
  }
}

function handleUserRepos(data) {
  if (searchFlag) {
    reposArr = [];
    ul.innerHTML = ``;
  }

  reposArr.push(...data);
  const repos = reposArr.slice(0, 10);

  repos.forEach(repo => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", `${repo.html_url}`)
    a.innerHTML = repo.name;
    li.append(a);
    ul.append(li);
  });
}

getUser().then(data => {
  handleUserContent(data);
});

getRepos().then(data => {
  handleUserRepos(data);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const searchInput = form.querySelector(".search-input");

  getUser(searchInput.value).then(data => {
    handleUserContent(data);
  });
  
  getRepos(searchInput.value).then(data => {
    handleUserRepos(data);
  });

  searchFlag = true;
});


