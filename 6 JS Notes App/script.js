const note = document.querySelector(".note-row");
const addBtn = document.querySelector(".add-btn");
const noteRow = document.querySelector(".note-row");
let i=0;
function handleNote() {
  const newNote = document.createElement("div");
  newNote.classList.add("col-12", "note-div");
  newNote.setAttribute("data-note", `${i}`);
  newNote.innerHTML = `
                        <div class="note-header text-right">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                        <div class="note-text">
                          <textarea class="form-control textarea-${i}" rows="12"></textarea>
                        </div>`;

  noteRow.append(newNote);

  const deleteBtns = document.querySelectorAll(".fa-trash-o");

  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", (e) => {
      e.target.closest(".note-div").remove();
    });
  });

  i++;
}

function addNote (e) {
  if(!e.target.matches('i')) {
    return;
  }
  
  const noteNo = e.target.closest(".note-div").dataset.note;
  const textarea = document.querySelector(`.textarea-${noteNo}`);
  if(textarea.getAttribute("disabled")) {
    textarea.removeAttribute("disabled");
  } else {
    textarea.setAttribute("disabled", "true");
  }
}

handleNote();

noteRow.addEventListener("click", addNote)
addBtn.addEventListener("click", handleNote);
