// open topNav (mobile)
function editNav() {
	var topNav = document.querySelector("#myTopnav");
	topNav.classList.toggle("responsive");
}

// DOM Elements
const modalContainer = document.querySelector(".modal-container");
const openModalBtn = document.querySelectorAll(".open-modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector("#close-modal");

// open modal event listener
openModalBtn.forEach((btn) =>
	btn.addEventListener("click", openModal)
);

// open modal function
function openModal() {
	modalContainer.style.display = "flex";
}

// close modal event listener
closeButton.addEventListener("click",closeModal);

//close modal function
function closeModal() {
  modalContainer.style.display = "none";
}