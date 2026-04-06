const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");
const newBtn = document.querySelector(".new-btn");
const newModal = document.querySelector(".new-modal-wrapper");
const newModalClose = document.querySelector(".new-modal-toast-close");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const deleteAllModal = document.querySelector(".delete-all-modal-wrapper");
const deleteCloseModal = document.querySelector(
  ".delete-all-modal .delete-modal-toast-close",
);
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