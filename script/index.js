const buttonEdit = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__button-close');
let nameInputPopup = popup.querySelector('.popup__input_type_name');
let aboutInputPopup = popup.querySelector('.popup__input_type_about');
let userName = document.querySelector('.profile__username');
let userAbout = document.querySelector('.profile__about');
let formElement = popup.querySelector('.popup__container');

// функция открытия попапа
function openPopup() {
  nameInputPopup.value = userName.textContent;
  aboutInputPopup.value = userAbout.textContent;
  popup.classList.add('popup_opened');
}
// функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}
// функция сохранения измененных данных, введенных пользователем
function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInputPopup.value;
  userAbout.textContent = aboutInputPopup.value;
  closePopup();
}


buttonEdit.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
