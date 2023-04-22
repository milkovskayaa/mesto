// функция проверки валидности инпутов
function checkingValidity(input, formPopup) {

const inputError = formPopup.querySelector(`#error-${input.id}`);

  if (input.checkValidity()){
    input.classList.remove('popup__input_invalid');
    inputError.textContent = '';
  }
  else {
    input.classList.add('popup__input_invalid');
    inputError.textContent = input.validationMessage;
  }
};


function setEventListeners(formPopup) {
  const inputsList = Array.from(formPopup.querySelectorAll('.popup__input'));

  inputsList.forEach(function(input){
    input.addEventListener('input', () => {
      checkingValidity(input, formPopup);
    });
  });

};




function enableValidation() {
  const arrPopups = Array.from(document.querySelectorAll('.popup__form'));

  arrPopups.forEach((formPopup) => {
    formPopup.addEventListener('submit', function(evt){
    evt.preventDefault();
  });
  setEventListeners(formPopup);
});
}

enableValidation();




