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

//close the modal when clicking outside of it
modalContainer.addEventListener("click", closeModal);

//Stop event propagation of the modal to prevent it from closing itself when clicking inside of it
modal.addEventListener("click", (e) => {
	e.stopPropagation();
});


//*************** Get form data ***************//
//regular expression fo form validation
const nameRegex = /^[a-z,A-Z]+(([\-,', ])?[a-z,A-Z])*$/;
const emailRegex =
	/^[a-z,A-Z,0-9]+([\-,.,_]?[a-z,A-Z,0-9]+)*@{1}[a-z,A-Z]{2,}\.{1}[a-z,A-Z]{2,}$/;
const birthdateRegex = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/;
const quantityRegex = /^[0-9]{1,2}$/;

const userRegistration = {};

function validateTextInput(element) {
	element.classList.add("valid");
	element.classList.remove("invalid");
	userRegistration[element.name] = element.value;
}

function invalidateTextInput(element) {
	element.classList.add("invalid");
	element.classList.remove("valid");
	delete userRegistration[element.name];
}

//Check that the user age is below the maxAge (based on the current time)
function dateVerification(birthdate) {
	const birthdateObject = new Date(birthdate.value);
	const actualDateObject = new Date(Date.now());
	const maxAge = 120;

	if (birthdateObject > actualDateObject) {
		invalidateTextInput(birthdate);
	} else if (
		actualDateObject.getFullYear() - birthdateObject.getFullYear() <=
		maxAge
	) {
		validateTextInput(birthdate);
	} else {
		invalidateTextInput(birthdate);
	}
}

function validateRadioInput(radioInputSection, radioInput) {
	radioInputSection.classList.add("valid");
	radioInputSection.classList.remove("invalid");
	userRegistration[radioInput.name] = radioInput.value;
}

function invalidateRadioInput(radioInputSection) {
	radioInputSection.classList.add("invalid");
	radioInputSection.classList.remove("valid");
}

//Verification of each input with regular expression
//if valid : add a valid class to the input, otherwise add invalid class
function validateFormData() {
	const firstname = document.querySelector("#firstname");
	const lastname = document.querySelector("#lastname");
	const email = document.querySelector("#email");
	const birthdate = document.querySelector("#birthdate");
	const quantity = document.querySelector("#quantity");
	const radioInput = document.querySelector(
		".radio-input[name='location']:checked"
	);
	const radioInputSection = document.querySelector("#form-data-radio");
	const conditions = document.querySelector("#conditions");
	const newsletter = document.querySelector("#newsletter");

	nameRegex.test(firstname.value)
		? validateTextInput(firstname)
		: invalidateTextInput(firstname);

	nameRegex.test(lastname.value)
		? validateTextInput(lastname)
		: invalidateTextInput(lastname);

	emailRegex.test(email.value)
		? validateTextInput(email)
		: invalidateTextInput(email);

	//additional verification to check the age of the user
	birthdateRegex.test(birthdate.value)
		? dateVerification(birthdate)
		: invalidateTextInput(birthdate);

	quantityRegex.test(quantity.value)
		? validateTextInput(quantity)
		: invalidateTextInput(quantity);

	//check that at least one location is selected
	radioInput
		? validateRadioInput(radioInputSection, radioInput)
		: invalidateRadioInput(radioInputSection);

	userRegistration[conditions.name] = conditions.checked;
	userRegistration[newsletter.name] = newsletter.checked;

	if (
		userRegistration.firstname &&
		userRegistration.lastname &&
		userRegistration.email &&
		userRegistration.birthdate &&
		userRegistration.quantity &&
		userRegistration.location &&
		userRegistration.conditions
	) {
		console.log(userRegistration);
	}
}
