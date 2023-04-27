// open topNav (mobile)
function editNav() {
	var topNav = document.querySelector("#myTopnav");
	topNav.classList.toggle("responsive");
}

// DOM Elements
const modalContainer = document.querySelector(".modal-container");
const openModalBtn = document.querySelectorAll(".open-modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
openModalBtn.forEach((btn) =>
	btn.addEventListener("click", launchModal)
);

// launch modal form
function launchModal() {
	modalContainer.style.display = "block";
}
