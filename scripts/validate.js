function enableValidation(validationOptions) {
  const forms = Array.from(
    document.querySelectorAll(validationOptions.formSelector) // specifying object's property to select
  );

  // using spread operator ... instead of Array.from() - 'Could be improved' from code review...
  //const spreadForms = [
  //  ...document.querySelectorAll(validationOptions.formSelector),
  //]; // spreadForms is an array

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // to prevent page refresh...
    });

    setEventListeners(formElement, validationOptions); // sets EventListeners for all specified options in the object: validationOptions
  });
}

// showInputError() function
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass } // properties of validationOptions object loc:73/74
) {
  const errorSpanElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass); // styles the input w/red border
  errorSpanElement.textContent = inputElement.validationMessage;
  errorSpanElement.classList.add(errorClass);
}

// hideInputError() function
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorSpanElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass); // styles the input w/red border
  errorSpanElement.textContent = inputElement.validationMessage;
  errorSpanElement.classList.remove(errorClass);
}

//function checkInputValidity(formElement, inputElement, validationOptions) {
//  if (!inputElement.validity.valid) {
//    return showInputError(formElement, inputElement, validationOptions);
//  }

//  hideInputError(formElement, inputElement, validationOptions);
//}

// per code review 'Could be improved'
function checkInputValidity(formElement, inputElement, validationOptions) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableSubmitButton(submitButton, { inactiveButtonClass });
  } else {
    enableSubmitButton(submitButton, { inactiveButtonClass });
  }
}

function setEventListeners(formElement, validationOptions) {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationOptions.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationOptions.submitButtonSelector
  );

  // call toggleButtonState() which calls hasInvalidInput() and sets button state
  toggleButtonState(inputElements, submitButton, validationOptions);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputElements, submitButton, validationOptions);
    });
  });
}

// object that contains the validation options...(all key : value pairs)
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// calling enableValidation() function to enable all the validationOptions...
enableValidation(validationOptions); // passing variable which is an object reference
