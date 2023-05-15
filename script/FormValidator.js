class FormValidator {
  constructor (config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;

    this._inputsList = this._getInputsList();
    this._buttonElement = this._getFormButton();
  };

  // функция валидного состояния инпута
  _setInputValid = (inputElement) => {
    const inputError = this._formElement.querySelector(`.error-${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = '';
  };

// функция невалидного состояния инпута
  _setInputInvalid = (inputElement) => {
    const inputError = this._formElement.querySelector(`.error-${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.classList.add(this._errorClass);
    inputError.textContent = inputElement.validationMessage;
  };

// функция проверки валидности инпутов
  _checkingValidity = (inputElement) => {

    if (inputElement.checkValidity()) {
      this._setInputValid(inputElement);
    }
    else {
      this._setInputInvalid(inputElement);
  }
  };

// функция переключения кнопки
  _toggleButtonValid = () => {
    const formButton = this._formElement.querySelector(this._submitButtonSelector);

    if (this._formElement.checkValidity()) {
      this._setEnabledButton(formButton);
    }
    else {
      this._setDisabledButton(formButton);
    };
  };

// функция блокировки кнопки
  _setDisabledButton = (button) => {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute('disabled', true);
  };

// функция разблокировки кнопки
  _setEnabledButton = (button) => {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute('disabled');
  };

  _getInputsList() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector));
  };

  _getFormButton() {
    return this._formElement.querySelector(this._submitButtonSelector);
  };

  _setEventListeners = () => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._toggleButtonValid();

      this._inputsList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkingValidity(input);
          this._toggleButtonValid(this._buttonElement);
        });
      });
    };

  enableValidation = () => {
    this._setEventListeners();
  };
};

export { FormValidator };
