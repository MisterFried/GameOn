//***** Header navigation bar *****//
function openNav() {
	document.querySelector("#header-navbar").classList.toggle("open");
	document.querySelector("#header-navbar").classList.toggle("close");
}

//*************** Modal display ***************//

// DOM Elements
const modalContainer = document.querySelector("#modal-container");
const modal = document.querySelector("#modal");

//Open modal
document.querySelector("#open-modal-button").addEventListener("click", () => {
	modalContainer.classList.add("open");
	modalContainer.classList.remove("close");
});

//Close modal (button / outside click)
function closeModal() {
	modalContainer.classList.remove("open");
	modalContainer.classList.add("close");
}

document
	.querySelector("#close-modal-button")
	.addEventListener("click", closeModal);

modalContainer.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
	e.stopPropagation();
});


//*************** Get form data ***************//

//name regex ^[a-z,A-Z]+(([\-,', ])?[a-z,A-Z])*$
//email regex ^[a-z,A-Z,0-9]+([\-,.,_]?[a-z,A-Z,0-9]+)*@{1}[a-z,A-Z]{2,}\.{1}[a-z,A-Z]{2,}$
//date regex ^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[1-2]{1}[0-9]{3}$
//number regex ^[0-9]{1,2}$
