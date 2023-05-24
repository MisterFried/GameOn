//RegEx for form validation
const nameRegex = /^[a-z,A-Z]+(([\-,', ])?[a-z,A-Z])*$/;
const emailRegex = /^[a-z,A-Z,0-9]+([\-,.,_]?[a-z,A-Z,0-9]+)*@{1}[a-z,A-Z]{2,}\.{1}[a-z,A-Z]{2,}$/;
const birthdateRegex = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/;
const quantityRegex = /^[0-9]{1,2}$/;

//Array containing all the input elements
const fields = [
	...document.querySelectorAll(".text-input"),
	document.querySelector("#form-data-radio"),
	...document.querySelectorAll(".checkbox-input"),
];

//Object containing the user informations upon registration
let userRegistration = {};

//Validate the text input (CSS) and add its value to userRegistration
function validateTextInput(element) {
	element.classList.add("valid");
	element.classList.remove("invalid");
	userRegistration[element.name] = element.value;
}

//Invalidate the text input (CSS) and remove its value from userRegistration
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

	if (currentAge > 0 && currentAge <= maxAge) {
		validateTextInput(birthdate);
		return true;
	}
	else {
		invalidateTextInput(birthdate);
		return false;
	}
}

//Validate the radio input (CSS) and add the selected value to userRegistration
function validateRadioInput(radioInputSection, radioInput) {
	radioInputSection.classList.add("valid");
	radioInputSection.classList.remove("invalid");
	userRegistration[radioInput.name] = radioInput.value;
}

//Invalidate the radio input (CSS)
function invalidateRadioInput(radioInputSection) {
	radioInputSection.classList.add("invalid");
	radioInputSection.classList.remove("valid");
}

//Validate the checkbox input (CSS) and add its value to userRegistration
function validateCheckboxInput (element) {
	element.classList.add("valid");
	element.classList.remove("invalid");
	userRegistration[element.name] = element.checked;
}

//Invalidate the checkbox input (CSS) and add its value to userRegistration
function invalidateCheckboxInput(element) {
	element.classList.add("invalid");
	element.classList.remove("valid");
	userRegistration[element.name] = element.checked;
}

//Handle form submission
function handleForm () {
	validateFormData();

	//Verify is one of the inputs are not valid (has invalid class)
	const isInvalidData = fields.map((element) => element.classList.contains("invalid"))
	.includes(true);

	if (!isInvalidData) {
		console.log(userRegistration);
		displayConfirmationMessage();
	}
}

//Validate form data
function validateFormData() {
	//Get the selected radio input when form is submitted
	const radioInput = document.querySelector(".radio-input[name='location']:checked");

	//Loop on each input to test its value
	//Text input --> RegEx
	//Radio / Checkbox --> Check if a value has been selected
	fields.forEach((element) => {
		let valid;
		switch (element.name) {
			case "firstname":
			case "lastname":
				valid = nameRegex.test(element.value);
				break;

			case "email":
				valid = emailRegex.test(element.value);
				break;

			//Additional verification on the birthdate
			case "birthdate":
				birthdateRegex.test(element.value)
					? valid = dateVerification(element)
					: valid = false;
				break;

			case "quantity":
				valid = quantityRegex.test(element.value);
				break;

			case "location":
				valid = radioInput ? true : false;
				break;

			case "conditions":
				valid = element.checked;
				break;
		}
		if (element.type === "text" ||	element.type === "email" ||
				element.type === "date" || element.type === "number") {
			valid ? validateTextInput(element) : invalidateTextInput(element);
		}
		else if (element.name === "location") {
			valid ? validateRadioInput(element, radioInput) : invalidateRadioInput(element);
		}
		else if (element.name === "conditions") {
			valid ? validateCheckboxInput(element) : invalidateCheckboxInput(element);
		}
		//No verification on the newsletter input (not mandatory)
		else if (element.name === "newsletter") {
			userRegistration[element.name] = element.checked;
		}
	});
}

//DOM elements
const form = document.querySelector("#reservation-form");
const confirmationMessage = document.querySelector("#confirmation-message");

//Replace the form with a confirmation message
function displayConfirmationMessage() {
	form.style.display = "none";
	confirmationMessage.style.display = "flex";
}

//Close and reset the form
function resetForm () {
	closeModal();
	//Delay to avoid seeing the form coming back during the slide-out animation
	setTimeout(() => {
		document.querySelectorAll(".text-input").forEach((element) => (element.value = ""));
		document.querySelectorAll(".radio-input").forEach((element) => (element.checked = false));
		document.querySelector("#newsletter").checked = false;
		fields.forEach((element) => element.classList.remove("valid"));
		form.style.display = "flex";
		confirmationMessage.style.display = "none";
	},300);
}