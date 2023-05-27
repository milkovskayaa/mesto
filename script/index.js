import { arrayCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

// попапы
const popupEditProfile = new Popup('.popup_edit-profile');
popupEditProfile.setEventListeners();

const popupAddCard = new Popup('.popup_add-card');
popupAddCard.setEventListeners();

const popupOpenImage = new PopupWithImage('.popup_card-image');
popupOpenImage.setEventListeners();

// кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAddCard = document.querySelector('.profile__button_type_add');
// const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__button-close');
// const buttonClosePopupAdd = popupAddCard.querySelector('.popup__button-close');
// const buttonCloseImagePopup = popupOpenImage.querySelector('.popup__button-close');
// const buttonCreateCard = popupAddCard.querySelector('.popup__submit_type_add');

// инпуты попапа редактирования профиля
const inputNameFormProfile = document.querySelector('.popup__input_type_name');
const inputAboutFormProfile = document.querySelector('.popup__input_type_about');

// формы попапов
const popupEditeProfileForm = document.querySelector('.popup__form_type_edit');
const popupAddCardForm = document.querySelector('.popup__form_type_add');

const cardsGrid = document.querySelector('.elements');

const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-name');

// элементы профиля пользователя
const userName = document.querySelector('.profile__username');
const userAbout = document.querySelector('.profile__about');

const inputNameFormAddNewCard = popupAddCardForm.querySelector('.popup__input_type_card-name');
const inputLinkFormAddNewCard = popupAddCardForm.querySelector('.popup__input_type_link');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'error-message_visible'
};

// функции

// функция сохранения измененных данных, введенных пользователем
function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = inputNameFormProfile.value;
  userAbout.textContent = inputAboutFormProfile.value;
  popupEditProfile.close();
};

// функция открытия картинки
// const openZoomImage = (cardItem) => {
//   image.src = cardItem.link;
//   image.alt = cardItem.name;
//   caption.textContent = cardItem.name;
//   popupOpenImage.open();
// };
// создание карточки из класса
const createCardElement = (item) => {
  const card = new Card (item, '.card-template', (item) => {
    popupOpenImage.open(item.name, item.link);
  });
  const newCard = card.generateCard();
  return newCard;
}
// функция добавления карточек в секцию
function addCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

// перебор массива карточек
arrayCards.forEach((item) => {
  const card = createCardElement(item);
  addCardElement(card);
});

// функция добавления карточки из попапа
function handleCardSubmit(event) {
  event.preventDefault();

  const name = inputNameFormAddNewCard.value;
  const link = inputLinkFormAddNewCard.value;

  const cardData = {
    name,
    link
  };

  addCardElement(createCardElement(cardData));
  popupAddCard.close();

};

// функция сохранения данных о пользователе
function saveProfileInfo() {
  inputNameFormProfile.value = userName.textContent;
  inputAboutFormProfile.value = userAbout.textContent;
};


// обработчики событий кнопок

// нажатие на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
  saveProfileInfo();
  popupEditProfile.open();
});

// взаимодействия пользователя с формами попапов
popupEditeProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

popupAddCardForm.addEventListener('submit', handleCardSubmit);

// нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();
  // cardValidator.toggleButtonValid(buttonCreateCard);
  // setDisabledButton(buttonCreateCard);
  popupAddCard.open();
});

const profileValidator = new FormValidator(config, popupEditeProfileForm);
const cardValidator = new FormValidator(config, popupAddCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();







