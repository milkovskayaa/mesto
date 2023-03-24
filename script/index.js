const editButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__button-close');
let nameInputPopup = popup.querySelector('.popup__input_type_name');
let aboutInputPopup = popup.querySelector('.popup__input_type_about');
let userName = document.querySelector('.profile__username');
let userAbout = document.querySelector('.profile__about');
let formElement = popup.querySelector('.popup__container');

function popupOpen() {
  nameInputPopup.value = userName.textContent;
  aboutInputPopup.value = userAbout.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameInputPopup = nameInputPopup.value;
  userName.textContent = nameInputPopup;
  aboutInputPopup = aboutInputPopup.value;
  userAbout.textContent = aboutInputPopup;
  popupClose();
}


editButton.addEventListener('click', popupOpen);

closePopupButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', handleFormSubmit);
