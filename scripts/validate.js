const showInputError = (formElement, inputElement, errorMessage, validForm) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(validForm.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement,validForm) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(validForm.inputErrorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,validForm) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validForm);
    } else {
        hideInputError(formElement, inputElement, validForm);
    }
};

const setEventListeners = (formElement, validForm) => {
    const inputList = Array.from(formElement.querySelectorAll(validForm.inputSelector));
    const buttonElement = formElement.querySelector(validForm.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validForm.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement,validForm);
            toggleButtonState(inputList, buttonElement, validForm.inactiveButtonClass);
        });
    });
};

const enableValidation = (validForm) => {
    const formList = Array.from(document.querySelectorAll(validForm.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, validForm);
    })
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, inactiveButtonClass);
    } else {
        enabledButton(buttonElement, inactiveButtonClass);
    }
}

function disabledButton (buttonElement, inactiveButtonClass){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = 'disabled'; 
}

function enabledButton (buttonElement, inactiveButtonClass){
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = '';
}


const validForm = {
    formSelector: '.form',
    inputSelector: '.form__data',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_type_disabled',
    inputErrorClass: 'form__data_type_error',
}

enableValidation(validForm);