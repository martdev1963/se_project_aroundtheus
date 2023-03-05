function enableValidation(validationOptions) {
  const forms = Array.from(
    document.querySelectorAll(validationOptions.formSelector) // specifying object's property to select
  );
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationOptions); // sets EventListeners for all specified options in the object
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

function checkInputValidity(formElement, inputElement, validationOptions) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, validationOptions);
  }

  hideInputError(formElement, inputElement, validationOptions);
}

// arrow function that checks for validity of inputs... assigned to a variable...
//const hasInvalidInput = (inputList) => {
//  return inputList.some((inputElement) => {
//    return !inputElement.validity.valid;
//  });
//};

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}


function enableSubmitButton(submitButton, { inactiveButtonClass }) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled;
}

function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputElements)) {
        disableSubmitButton(submitButton, { inactiveButtonClass };)
    } else {
        enableSubmitButton(submitButton, {inactiveButtonClass});
    }
}


// arrow function that toggles the button state, assigned to a variable...
//const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//  if (hasInvalidInput(inputList)) {
//    buttonElement.classList.add(inactiveButtonClass);
//    buttonElement.disabled = true;
//  } else {
//    buttonElement.classList.remove(inactiveButtonClass);
//    buttonElement.classList.disabled = false;
//  }
//};

function setEventListeners(formElement, validationOptions) {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationOptions.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationOptions.submitButtonSelector
  );

  // call toggle ButtonState() which calls hasInvalidInput() and sets button state
  toggleButtonState(inputElements, submitButton, validationOptions);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputElements, submitButton, validationOptions);
    });
  });

  // resets form validation...
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputElements, submitButton, validationOptions);
    }, 0);
  });
}

// object that contains the validation options...
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// calling enableValidation() function to enable all the validationOptions...
enableValidation(validationOptions);
