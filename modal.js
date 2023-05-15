//***** Header navigation bar *****//
function openNav() {
	document.querySelector("#header-navbar").classList.toggle("open");
	document.querySelector("#header-navbar").classList.toggle("close");
}

//*************** Modal display ***************//
const openModalButton = document.querySelector("#open-modal-button");
const closeModalButton = document.querySelector("#close-modal-button");
const modalContainer = document.querySelector("#modal-container");
const modal = document.querySelector("#modal");

//Close modal
function closeModal() {
	modalContainer.classList.remove("open");
	modalContainer.classList.add("close");
}

//Open modal
function openModal() {
	modalContainer.classList.add("open");
	modalContainer.classList.remove("close");
}

//Close modal (outside click)
modalContainer.addEventListener("click", closeModal);
//Stop event propagation to prevent the form from closing itself when clicking inside
modal.addEventListener("click", (e) => {e.stopPropagation();});


//*************** Get form data ***************//
//RegEx for form validation
const nameRegex = /^[a-z,A-Z]+(([\-,', ])?[a-z,A-Z])*$/;
const emailRegex = /^[a-z,A-Z,0-9]+([\-,.,_]?[a-z,A-Z,0-9]+)*@{1}[a-z,A-Z]{2,}\.{1}[a-z,A-Z]{2,}$/;
const birthdateRegex = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/;
const quantityRegex = /^[0-9]{1,2}$/;

const form = document.querySelector("#reservation-form");
const confirmationMessage = document.querySelector("#confirmation-message");

//Object containing the user informations upon registration
const userRegistration = {};

//Validate the text input (for CSS) and add its value to userRegistration
function validateTextInput(element) {
	element.classList.add("valid");
	element.classList.remove("invalid");
	userRegistration[element.name] = element.value;
}

//Invalidate the text input (for CSS) and remove its value from userRegistration
function invalidateTextInput(element) {
	element.classList.add("invalid");
	element.classList.remove("valid");
	delete userRegistration[element.name];
}

//Additional verification on birthdate : age between 0 and maxAge
function dateVerification(birthdate) {
	const birthdateObject = new Date(birthdate.value);
	const actualDateObject = new Date(Date.now());
	const currentAge = actualDateObject.getFullYear() - birthdateObject.getFullYear();
	const maxAge = 120;

	(currentAge > 0 && currentAge <= maxAge)
	? validateTextInput(birthdate)
	: invalidateTextInput(birthdate);
}

//Validate the radio input (for CSS) and add the selected value to userRegistration
function validateRadioInput(radioInputSection, radioInput) {
	radioInputSection.classList.add("valid");
	radioInputSection.classList.remove("invalid");
	userRegistration[radioInput.name] = radioInput.value;
}

//Invalidate the radio input (for CSS)
function invalidateRadioInput(radioInputSection) {
	radioInputSection.classList.add("invalid");
	radioInputSection.classList.remove("valid");
}

function displayConfirmationMessage () {
	form.style.display = ("none");
	confirmationMessage.style.display = ("flex")
}

function validateFormData() {
	const firstname = document.querySelector("#firstname");
	const lastname = document.querySelector("#lastname");
	const email = document.querySelector("#email");
	const birthdate = document.querySelector("#birthdate");
	const quantity = document.querySelector("#quantity");
	const radioInput = document.querySelector(".radio-input[name='location']:checked");
	const radioInputSection = document.querySelector("#form-data-radio");
	const conditions = document.querySelector("#conditions");
	const newsletter = document.querySelector("#newsletter");

	//Verify if each text input is valid (with RegEx)
	//Additional verification is performed for birthdate
	nameRegex.test(firstname.value)
		? validateTextInput(firstname)
		: invalidateTextInput(firstname);

	nameRegex.test(lastname.value)
		? validateTextInput(lastname)
		: invalidateTextInput(lastname);

	emailRegex.test(email.value)
		? validateTextInput(email)
		: invalidateTextInput(email);

	birthdateRegex.test(birthdate.value)
		? dateVerification(birthdate)
		: invalidateTextInput(birthdate);

	quantityRegex.test(quantity.value)
		? validateTextInput(quantity)
		: invalidateTextInput(quantity);

	//Verify if a radioInput has been selected
	radioInput
		? validateRadioInput(radioInputSection, radioInput)
		: invalidateRadioInput(radioInputSection);

	//Add the state of the checkboxes to userRegistration
	userRegistration[conditions.name] = conditions.checked;
	userRegistration[newsletter.name] = newsletter.checked;

	//if all the required fields are filled, output userRegistration
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
		displayConfirmationMessage();
	}
}
