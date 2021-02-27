const itemsDiv = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let startPosition;
let scrollStop = 0;
let isDown = 0;
let mouseEnter = 0; // detekcija jeli mis unutar

// itemsDiv.addEventListener("mousedown", e => {
//   isDown = 1;
//   startPosition = e.clientX;
// });

// itemsDiv.addEventListener("mouseup", e => {
//   isDown = 0;
//   scrollStop = e.target.scrollLeft;
// });


// itemsDiv.addEventListener("mousemove", e => {
//   if (!isDown) {
//     return;
//   }

//   let move;

//   move = (startPosition + scrollStop) - e.clientX;
//   e.target.scrollLeft = move;

// });


items.forEach(item => {

  item.addEventListener("mousedown", e => {
    // e.stopPropagation();
    isDown = 1;
    startPosition = e.clientX;
  });

  item.addEventListener("mouseup", e => {
    // e.stopPropagation();
    isDown = 0;
    scrollStop = e.target.parentElement.scrollLeft;
  });

  item.addEventListener("mousemove", e => {
    // e.stopPropagation();

    if (!isDown) {
      return;
    }

    let move;
    move = (startPosition + scrollStop) - e.clientX;
    e.target.parentElement.scrollLeft = move;

  });

});


