const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'error-message_visible'
};

// функция валидного состояния инпута
function setInputValid(input, config, inputError) {
  input.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
  inputError.textContent = '';
};

// функция невалидного состояния инпута
function setInputInvalid(input, config, inputError) {
  input.classList.add(config.inputErrorClass);
  inputError.classList.add(config.errorClass);
  inputError.textContent = input.validationMessage;
};


// функция проверки валидности инпутов
function checkingValidity(input, formPopup, config) {
  const inputError = formPopup.querySelector(`.error-${input.id}`);
  if (input.checkValidity()) {
    setInputValid(input, config, inputError);
  }
  else {
    setInputInvalid(input, config, inputError);
  }
};

// функция обработчика инпута
function setEventListeners(formPopup, config, input) {
  const inputsList = Array.from(formPopup.querySelectorAll(config.inputSelector));

  toggleButtonValid(formPopup, config);

  inputsList.forEach(function(input) {
    input.addEventListener('input', () => {
      checkingValidity(input, formPopup, config);
      toggleButtonValid(formPopup, config);
    });
  });
};

// функция переключения кнопки
function toggleButtonValid(formPopup, config) {
  const formButton = formPopup.querySelector(config.submitButtonSelector);

  if (formPopup.checkValidity()) {
    setEnabledButton(config, formButton);
  }
  else {
    setDisabledButton(config, formButton);
  };
};

// функция блокировки кнопки
function setDisabledButton(config, button) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', true);
};

// функция разблокировки кнопки
function setEnabledButton(config, button) {
  button.classList.remove(config.inactiveButtonClass);
  button.removeAttribute('disabled');
};


// функция включения валидации всех форм
function enableValidation(config) {
  const arrPopups = Array.from(document.querySelectorAll(config.formSelector));

  arrPopups.forEach((formPopup) => {
    formPopup.addEventListener('submit', function(evt){
    evt.preventDefault();
  });
  setEventListeners(formPopup, config);
});
};

enableValidation(config);




