const wrapper = document.querySelector(".wrapper");
const smileys = document.querySelectorAll("i");
const smile = document.querySelector(".fa-smile-o");
const meh = document.querySelector(".fa-meh-o");
const frown = document.querySelector(".fa-frown-o");
let colorValue = "";

// toggle smiley on/off
smileys.forEach( smiley => {
  smiley.addEventListener("click", (e) => {
    if (e.target.classList[1] === "fa-smile-o") {
      e.target.classList.add("fa-smile-o-clicked");
      meh.classList.remove("fa-meh-o-clicked");
      frown.classList.remove("fa-frown-o-clicked");
      colorValue = window.getComputedStyle(e.target).getPropertyValue('color');
    } 
    if (e.target.classList[1] === "fa-frown-o") {
      e.target.classList.add("fa-frown-o-clicked");
      smile.classList.remove("fa-smile-o-clicked");
      meh.classList.remove("fa-meh-o-clicked");
      colorValue = window.getComputedStyle(e.target).getPropertyValue('color');
    }
    if (e.target.classList[1] === "fa-meh-o") {
      e.target.classList.add("fa-meh-o-clicked");
      smile.classList.remove("fa-smile-o-clicked");
      frown.classList.remove("fa-frown-o-clicked");
      colorValue = window.getComputedStyle(e.target).getPropertyValue('color');
    }
  });
});

wrapper.addEventListener("click", e => {
  if(e.target.classList[0] === "day") {
     e.target.style.background = colorValue;
  }
});

// zavrti petlju koliko ima miseci i za svaki misec kreiraj div

for (let month = 0; month < 12; month++) {

  const firstDay = new Date(2020, month, 1); // Sun Nov 01 --> potribno za dohvacanje imena dana i miseca
  const dateArr = firstDay.toString().split(" ");

  const daysInMonth = new Date(2020, month + 1, 0).getDate(); // dohvaca broj dana za zadani misec npr 5 misec, 31 dan

  let day = dateArr[0]; // niz koji dohvaca ime dana jer se ime nalazi na prvoj poziciji str.split metode
  let daysUntil = []; // niz kojin govori koliko ima praznih dana do prvog kojin misec pocinje
  
  switch (day) {
    case "Tue":
      daysUntil = [1];
      break;
    case "Wed":
      daysUntil = [1, 2];
      break;
    case "Thu":
      daysUntil = [1, 2, 3];
      break;
    case "Fri":
      daysUntil = [1, 2, 3, 4];
      break;
    case "Sat":
      daysUntil = [1, 2, 3, 4, 5];
      break;
    case "Sun":
      daysUntil = [1, 2, 3, 4, 5, 6];
      break;
  }

  // kreiranje misec div-a
  const monthDivEx = document.createElement("div");
  monthDivEx.classList.add(`month-div-ex`);
  monthDivEx.innerHTML = `
    <div class="month-name-div">
      <h4 class="month-name">${dateArr[1]} ${dateArr[3]}</h4>
    </div>
    <div class="weekday-div">
      <div class="weekday">Pon</div>
      <div class="weekday">Uto</div>
      <div class="weekday">Sri</div>
      <div class="weekday">Cet</div>
      <div class="weekday">Pet</div>
      <div class="weekday">Sub</div>
      <div class="weekday">Ned</div>
    </div>
    <div class="day-div-${month+1}">
    <!-- day numbers -->
    </div>`;
    
    wrapper.append(monthDivEx);

    //popuni dane u misecu

    let j = 0; //pomocna varijabla koja broji prazne div-ove
    const dayDiv = document.querySelector(`.day-div-${month+1}`);
    for (let i = 1; i <= daysInMonth + daysUntil.length; i++) { //sveukupan broj dana skupa sa praznima
      j++;
      const day = document.createElement("div");
      day.classList.add("day");
      if (j <= daysUntil.length) { //stavljaj prazne ovisno koliki je niz praznih
        day.textContent = "";
        day.classList.add("day-empty");
        dayDiv.append(day);
        i = 0;
      } else { //popunjavaj dane koji se nalaze
        if (i === daysInMonth + 1) {
          break;
        }
        day.textContent = i;
        dayDiv.append(day);
      }
    }
}
