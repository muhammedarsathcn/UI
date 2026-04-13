

// get note id from url
const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");

// modal buttons
const newBtn = document.querySelector(".new-btn");
const newModal = document.querySelector(".new-modal-wrapper");
const newModalClose = document.querySelector(".new-modal-toast-close");
const deleteBtn = document.querySelector(".delete-all-btn");
const deleteModal = document.querySelector(".delete.modal-wrapper");
const deleteCloseModal = document.querySelector(
  ".modal .modal-toast-close",
);
const confirmDeleteBtn = document.querySelector(".delete .modal-btn");
const unsavedModal = document.querySelector(".unsaved.modal-wrapper")
const unsavedCloseBtn=document.querySelector(".unsaved .toast-close");
const unsavedConfirmBtn=document.querySelector(".unsaved .modal-btn");

// note display elements
const heading = document.querySelector(".heading");
const description = document.querySelector(".note-description");
const createdAt = document.querySelector(".notes-createdAt");
const coverImgContainer = document.querySelector(".note-cover-img");
const colorIndicator = document.querySelector(".note-description-title .color");

// edit modal inputs
const titleInput = document.querySelector(".title");
const imageInput = document.querySelector(".imageUrl");
const contentInput = document.querySelector(".content");
const colorOptions = document.querySelectorAll(".background-colors .color");
const editSaveBtn = document.querySelector(".modal-add-btn");

// get notes
const notes = JSON.parse(localStorage.getItem("notes")) || [];
const selectedNote = notes.find((note) => note.id == noteId);

// render note
if (!selectedNote) {
  window.location.href = "404.html";
  
} else {
  heading.textContent = selectedNote.title;
  description.textContent = selectedNote.description;
  // const date = new Date(selectedNote.updatedAt || selectedNote.id);
  createdAt.textContent = convertDate(selectedNote.id);
  if (selectedNote.imgUrl) {
    const img = document.createElement("img");
    img.src = selectedNote.imgUrl;
    img.alt = "cover_img";
    coverImgContainer.appendChild(img);
    coverImgContainer.style.display = "block";
  } else {
    coverImgContainer.style.display = "none";
  }
  if (selectedNote.bgColor) {
    colorIndicator.classList.add(selectedNote.bgColor);
  }
}

// selected color variable
let selectedColor = selectedNote?.bgColor || "banana-bread";

// open edit modal
newBtn.addEventListener("click", () => {
  if (!selectedNote) return;
  document.body.style.overflow = "hidden";
  newModal.classList.remove("new-modal-close");
  newModal.classList.add("new-modal-open");
  titleInput.value = selectedNote.title || "";
  imageInput.value = selectedNote.imgUrl || "";
  contentInput.value = selectedNote.description || "";
  colorOptions.forEach((color) => {
    color.classList.remove("selected");
    if (color.classList.contains(selectedColor)) {
      color.classList.add("selected");
    }
  });
});

// close edit modal
newModalClose.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  unsavedModal.classList.add("open")
  
});

unsavedCloseBtn.addEventListener("click", () => {
  unsavedModal.classList.remove("open")
  unsavedModal.classList.add("close")
})

unsavedConfirmBtn.addEventListener("click", () => {
  newModal.classList.add("new-modal-close")
  unsavedModal.classList.add("close")
})

// color selection handler
colorOptions.forEach((color) => {
  color.addEventListener("click", () => {
    colorOptions.forEach((c) => c.classList.remove("selected"));
    selectedColor = color.classList[1];
    color.classList.add("selected");
  });
});

// save edited note
editSaveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const descriptionValue = contentInput.value.trim();
  const imgUrl = imageInput.value.trim();
  if (!title || !descriptionValue) {
    alert("Title and description required");
    return;
  }
  const updatedNotes = notes.map((note) => {
    if (note.id == noteId) {
      return {
        ...note,
        title,
        description: descriptionValue,
        imgUrl,
        bgColor: selectedColor,
        updatedAt: Date.now(),
      };
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  location.reload();
});

// open delete modal
deleteBtn.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  deleteModal.classList.remove("close");
  deleteModal.classList.add("open");
});

// close delete modal
deleteCloseModal.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  deleteModal.classList.remove("open");
  deleteModal.classList.add("close");
});

// delete note
confirmDeleteBtn.addEventListener("click", () => {
  const updatedNotes = notes.filter((note) => note.id != noteId);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  window.location.href = "index.html";
});
