import { arrayCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupOpenImage = document.querySelector('.popup_card-image');

// кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__button-close');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__button-close');
const buttonCloseImagePopup = popupOpenImage.querySelector('.popup__button-close');
const buttonCreateCard = popupAddCard.querySelector('.popup__submit_type_add');

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

// закрытие попапа клавишей Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

// закрытие попапа на оверлей
function closePopupByOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.currentTarget === evt.target) {
    closePopup(popupOpened);
  };
}

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByOverlay);
};

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlay);
}

// функция сохранения измененных данных, введенных пользователем
function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = inputNameFormProfile.value;
  userAbout.textContent = inputAboutFormProfile.value;
  closePopup(popupEditProfile);
};

// функция открытия картинки
const openZoomImage = (cardItem) => {
  image.src = cardItem.link;
  image.alt = cardItem.name;
  caption.textContent = cardItem.name;
  openPopup(popupOpenImage);
};
// создание карточки из класса
const createCardElement = (item) => {
  const card = new Card (item, '.card-template', openZoomImage);
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
  closePopup(popupAddCard);

};

// function setDisabledButton(button) {
//   button.classList.add('popup__submit_disabled');
//   button.setAttribute('disabled', true);
// };

// функция сохранения данных о пользователе
function saveProfileInfo() {
  inputNameFormProfile.value = userName.textContent;
  inputAboutFormProfile.value = userAbout.textContent;
};


// обработчики событий кнопок

// нажатие на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
  saveProfileInfo();
  openPopup(popupEditProfile);
});

// взаимодействия пользователя с формами попапов
popupEditeProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

popupAddCardForm.addEventListener('submit', handleCardSubmit);

// нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();
  cardValidator.toggleButtonValid(buttonCreateCard);
  // setDisabledButton(buttonCreateCard);
  openPopup(popupAddCard);
});

// закрытие попапа редактирования профиля
buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// закрытие попапа добавления карточки
buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// закрытие попапа с картинкой
buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(popupOpenImage);
});

const profileValidator = new FormValidator(config, popupEditeProfileForm);
const cardValidator = new FormValidator(config, popupAddCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();







