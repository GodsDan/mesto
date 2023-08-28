const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add('form__data_type_error');
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove('form__data_type_error');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, validForm) => {
    const inputList = Array.from(formElement.querySelectorAll(validForm.inputSelector));
    const buttonElement = formElement.querySelector(validForm.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validForm.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
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
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const validForm = {
    formSelector: '.form',
    inputSelector: '.form__data',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_type_disabled',
    inputErrorClass: 'form__data_type_error',
}

enableValidation(validForm);