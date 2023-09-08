class FormValidator {
    constructor(validSetting, form) {
        this._validSetting = validSetting;
        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const buttonElement = this._form.querySelector(this._validSetting.submitButtonSelector);
            this._disabledButton(buttonElement, this._validSetting.inactiveButtonClass);
        });
        this._setEventListeners(this._form, this._validSetting);
    }
    _setEventListeners = (formItem, validForm) => {
        const inputList = Array.from(formItem.querySelectorAll(validForm.inputSelector));
        const buttonElement = formItem.querySelector(validForm.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, validForm.inactiveButtonClass);
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(formItem, input, validForm);
                this._toggleButtonState(inputList, buttonElement, validForm.inactiveButtonClass);
            });
        });
    }
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            this._disabledButton(buttonElement, inactiveButtonClass);
        } else {
            this._enabledButton(buttonElement, inactiveButtonClass);
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _disabledButton(buttonElement, inactiveButtonClass) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = 'disabled';
    }
    _enabledButton(buttonElement, inactiveButtonClass) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = '';
    }
    _checkInputValidity = (form, input, validForm) => {
        if (!input.validity.valid) {
            this._showInputError(form, input, input.validationMessage, validForm);
        } else {
            this._hideInputError(form, input, validForm);
        }
    }
    _showInputError = (formElement, inputElement, errorMessage, validForm) => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(validForm.inputErrorClass);
        errorElement.textContent = errorMessage;
    }
    _hideInputError = (formElement, inputElement, validForm) => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(validForm.inputErrorClass);
        errorElement.textContent = '';
    }
}

export { FormValidator }