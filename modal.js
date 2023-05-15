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

//Close modal (via button / outside click)
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

//regular expression fo form validation
const nameRegex = /^[a-z,A-Z]+(([\-,', ])?[a-z,A-Z])*$/;
const emailRegex = /^[a-z,A-Z,0-9]+([\-,.,_]?[a-z,A-Z,0-9]+)*@{1}[a-z,A-Z]{2,}\.{1}[a-z,A-Z]{2,}$/;
const birthdateRegex = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/;
const numberRegex = /^[0-9]{1,2}$/;

const userRegistration = {};

function validateInput (element) {
	element.classList.add("valid");
	element.classList.remove("invalid");
}

function invalidateInput(element) {
	element.classList.add("invalid");
	element.classList.remove("valid");
}

//Check that the user age is below the maxAge (based on the current time)
function dateVerification (birthdate){
	const birthdateObject = new Date(birthdate.value);
	const actualDateObject = new Date(Date.now());
	const maxAge = 120;

	if (actualDateObject.getFullYear() - birthdateObject.getFullYear() <= maxAge) {
		validateInput(birthdate);
	}
	else {
		invalidateInput (birthdate);
	}
}

//Verification of each input with regular expression
//if valid : add a valid class to the input, otherwise add invalid class
function validateFormData () {
	const firstname = document.querySelector("#firstname");
	const lastname = document.querySelector("#lastname");
	const email = document.querySelector("#email");
	const birthdate = document.querySelector("#birthdate");
	const quantity = document.querySelector("#quantity");
	const radioInput = document.querySelectorAll(".radio-input[name='location']:checked");
	const radioInputSection = document.querySelector("#form-data-radio");
	const conditionsUtilisations = document.querySelector("#conditions-utilisations");
	const newsletter = document.querySelector("#newsletter");

	(nameRegex.test(firstname.value))
	? validateInput(firstname) : invalidateInput(firstname);

	(nameRegex.test(lastname.value))
	? validateInput(lastname) : invalidateInput(lastname);

	(emailRegex.test(email.value))
	? validateInput(email) : invalidateInput(email);

	//additional verification to check the age of the user
	birthdateRegex.test(birthdate.value)
	? dateVerification(birthdate) : invalidateInput(birthdate);

	(numberRegex.test(quantity.value))
	? validateInput(quantity) : invalidateInput(quantity);	

	//check that at least one option is selected
	(radioInput.length === 0)
	? invalidateInput(radioInputSection) : validateInput(radioInputSection);
}