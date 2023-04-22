// const formPopup = document.querySelector('.popup__form');
// // console.log(formPopup)
// функция проверки валидности инпутов
function checkingValidity(input) {
  if (input.checkValidity()){
    input.classList.remove('popup__input_invalid');
  }
  else {
    input.classList.add('popup__input_invalid');
  }
};


function setEventListeners(formPopup) {
  const inputsList = Array.from(formPopup.querySelectorAll('.popup__input'));

  inputsList.forEach(function(input){
    input.addEventListener('input', () => {
      checkingValidity(input);
    });
    console.log(input)
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




