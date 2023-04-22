// функция валидного состояния инпута
function setInputValid(input, inputError) {
  input.classList.remove('popup__input_invalid');
  inputError.textContent = '';
};

// функция невалидного состояния инпута
function setInputInvalid(input, inputError) {
  input.classList.add('popup__input_invalid');
  inputError.textContent = input.validationMessage;
};


// функция проверки валидности инпутов
function checkingValidity(input, formPopup) {
  const inputError = formPopup.querySelector(`#error-${input.id}`);

  if (input.checkValidity()){
    setInputValid(input, inputError);
  }
  else {
    setInputInvalid(input, inputError);
  }
};

// функция обработчика инпута
function setEventListeners(formPopup) {
  const inputsList = Array.from(formPopup.querySelectorAll('.popup__input'));

  inputsList.forEach(function(input){
    input.addEventListener('input', () => {
      checkingValidity(input, formPopup);
      toggleButtonValid(formPopup);
    });
  });
};

// функция блокировки кнопки
function setDisabledButton(button) {
  button.setAttribute('disabled', '');
  button.classList.add('popup__submit_disabled');
};
// функция разблокировки кнопки
function setEnabledButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__submit_disabled');
};

// функция переключения кнопки
function toggleButtonValid(formPopup) {
  const formButton = formPopup.querySelector('.popup__submit');

  if (formPopup.checkValidity()) {
    setEnabledButton(formButton);
  }
  else {
    setDisabledButton(formButton);
  };
};

function enableValidation() {
  const arrPopups = Array.from(document.querySelectorAll('.popup__form'));

  arrPopups.forEach((formPopup) => {
    formPopup.addEventListener('submit', function(evt){
    evt.preventDefault();
  });
  setEventListeners(formPopup);
});
};

enableValidation();




