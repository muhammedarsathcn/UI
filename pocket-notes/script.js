const notesContainer = document.querySelector(".notes-container");
const newBtn = document.querySelector(".new-btn");
const newModal = document.querySelector(".new-modal-wrapper");
const newModalClose = document.querySelector(".new-modal-toast-close");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const deleteAllModal = document.querySelector(".delete-all-modal-wrapper");
const deleteCloseModal = document.querySelector(
  ".delete-all-modal .delete-modal-toast-close",
);
const deleteAllModalBtn = document.querySelector(
  ".delete-all-modal-wrapper .delete-modal-btn",
);
const addNewNoteBtn = document.querySelector(".modal-add-btn");
const notesTitle = document.querySelector(".title");
const notesImg = document.querySelector(".imageUrl");
const notesDescription = document.querySelector(".content");
const colors = document.querySelectorAll(".background-colors .color ");
const loadMoreBtn = document.querySelector(".load-more-btn");
const emptySection = document.querySelector(".empty-section");
const bgColors = {
  "bubblegum-crisis": "#e6cdeb",
  emptiness: "#fcfcfc",
  "banana-bread": " #f7cc7f",
  "pineapple-perfume": "#e7ee9b",
  "peach-fizz": "#f2ab90",
};
let selectedBgColor = "";
let title = "";
let imgUrl = "";
let description = "";
let notesData = JSON.parse(localStorage.getItem("notes")) || [];
let notesPerLoad = 10;
let currentIndex = 0;
const notes = document.querySelectorAll(".notes");

loadMoreBtn.addEventListener("click", () => {
  fetchAllNotes();
});

function fetchAllNotes() {
  if (notesData.length === 0) {
    emptySection.style.display = "block";
    loadMoreBtn.style.display = "none";
    deleteAllBtn.style.display = "none";
    return;
  }

  emptySection.style.display = "none";
  deleteAllBtn.style.display = "block";

  if (notesData.length > notesPerLoad) {
    loadMoreBtn.style.display = "block";
  }
  const notesFragment = document.createDocumentFragment();
  const nextNotes = notesData.slice(currentIndex, currentIndex + notesPerLoad);
  nextNotes.forEach((note) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <article class="notes"
               style="background:${note.bgColor}"
               data-id="${note.id}">

        <p class="notes-title">${note.title}</p>

        <p class="notes-createdAt">
          ${convertDate(note.id)}
        </p>

        ${
          note.imgUrl
            ? `
            <figure class="note-cover-img">
              <img src="${note.imgUrl}" alt="" />
            </figure>
          `
            : ""
        }

        <p class="notes-description">
          ${note.description}
        </p>

      </article>
    `;

    notesFragment.append(wrapper.firstElementChild);
  });

  notesContainer.append(notesFragment);

  currentIndex += notesPerLoad;

  // hide button if all notes loaded
  if (currentIndex >= notesData.length) {
    loadMoreBtn.style.display = "none";
  }
}
fetchAllNotes();
newBtn.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  newModal.classList.remove("new-modal-close");
  newModal.classList.add("new-modal-open");
});

newModalClose.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  newModal.classList.remove("new-modal-open");
  newModal.classList.add("new-modal-close");
});

deleteAllBtn.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  deleteAllModal.classList.remove("close");
  deleteAllModal.classList.add("open");
});
deleteCloseModal.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  deleteAllModal.classList.remove("open");
  deleteAllModal.classList.add("close");
});

notesContainer.addEventListener("click", (e) => {
  const noteElement = e.target.closest(".notes");
  if (!noteElement) return;
  const noteId = noteElement.dataset.id;
  window.location.href = `note.html?id=${noteId}`;
});
notesTitle.addEventListener("input", () => {
  title = notesTitle.value;
  validateInputs();
});

notesImg.addEventListener("input", () => {
  imgUrl = notesImg.value;
});

notesDescription.addEventListener("input", () => {
  description = notesDescription.value;
  validateInputs();
});

colors.forEach((color) => {
  color.addEventListener("click", () => {
    colors.forEach((color) =>
      color.firstElementChild.classList.remove("selected"),
    );
    selectedBgColor = bgColors[color.classList[1]];
    color.firstElementChild.classList.add("selected");
    validateInputs();
  });
});
addNewNoteBtn.addEventListener("click", () => {
  if (!title || !description || !selectedBgColor) {
    alert("Title, description and background color cant be empty");
    return;
  }
  const newNote = {
    id: Date.now(),
    title: title,
    imgUrl: imgUrl,
    description: description,
    bgColor: selectedBgColor,
  };

  notesData.push(newNote);

  localStorage.setItem("notes", JSON.stringify(notesData));
  document.body.style.overflow = "auto";
  newModal.classList.remove("new-modal-open");
  newModal.classList.add("new-modal-close");
  notesContainer.innerHTML = "";
  currentIndex = 0;
  fetchAllNotes();
  notesTitle.value = "";
  notesImg.value = "";
  notesDescription.value = "";
  title = "";
  imgUrl = "";
  description = "";
  colors.forEach((color) =>
    color.firstElementChild.classList.remove("selected"),
  );
  selectedBgColor = "";
});

deleteAllModalBtn.addEventListener("click", () => {
  localStorage.removeItem("notes");
  notesData = [];
  notesContainer.innerHTML = "";
  currentIndex = 0;
  fetchAllNotes();
  deleteAllModal.style.opacity = 0;
  deleteAllModal.style.visibility = "hidden";
});

function convertDate(stringDate) {
  const date = new Date(stringDate);
  const day = date.toLocaleString("en-IN", { day: "2-digit" });
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.toLocaleString("en-IN", { year: "numeric" });
  return `${day} ${month}, ${year}`;
}

function validateInputs() {
  if (title.trim() && description.trim() && selectedBgColor) {
    addNewNoteBtn.disabled = false;
  } else {
    addNewNoteBtn.disabled = true;
  }
}
