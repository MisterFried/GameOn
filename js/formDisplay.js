//Open modal
function openModal() {
	modalContainer.classList.add("open");
	modalContainer.classList.remove("close");
}

//Close modal
function closeModal() {
	modalContainer.classList.remove("open");
	modalContainer.classList.add("close");
}

//Close modal (outside click)
const modalContainer = document.querySelector("#modal-container");
const modal = document.querySelector("#modal");
modalContainer.addEventListener("click", closeModal);
//Stop event propagation to prevent the form from closing itself when clicking inside
modal.addEventListener("click", (e) => e.stopPropagation());
