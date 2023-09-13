class FormValidator {
    constructor(validSetting, form) {
        this._validSetting = validSetting;
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(validSetting.inputSelector));
        this._button = form.querySelector(validSetting.submitButtonSelector);
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._form.addEventListener('reset', () => {
            this._disabledButton();
        });
        this._setEventListeners();
    }
    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disabledButton();
        } else {
            this._enabledButton();
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }
    _disabledButton() {
        this._button.classList.add(this._validSetting.inactiveButtonClass);
        this._button.disabled = 'disabled';
    }
    _enabledButton() {
        this._button.classList.remove(this._validSetting.inactiveButtonClass);
        this._button.disabled = '';
    }
    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }
    _showInputError = (input) => {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
        input.classList.add(this._validSetting.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
    _hideInputError = (input) => {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
        input.classList.remove(this._validSetting.inputErrorClass);
        errorElement.textContent = '';
    }
}

export { FormValidator }