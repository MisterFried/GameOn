// open topNav (mobile)
function editNav() {
	var topNav = document.querySelector("#topnav");
	topNav.classList.toggle("opened");
}

// DOM Elements
const modalContainer = document.querySelector(
	".modal-container"
);
const openModalButton = document.querySelectorAll(
	".open-modal-button"
);
const closeButton = document.querySelector("#close-modal");
const reservationForm = document.querySelector(
	"#reservation-form"
);


// open modal event listener
openModalButton.forEach((button) =>
	button.addEventListener("click", openModal)
);

// open modal function
function openModal() {
	modalContainer.style.display = "flex";
}

// close modal event listener
closeButton.addEventListener("click", closeModal);

//close modal function
function closeModal() {
	modalContainer.style.display = "none";
}

//send a confirmation to the user that the form has been send
reservationForm.onsubmit = confirmation = () => {
	alert("Merci ! Votre réservation a été reçue.");
};
