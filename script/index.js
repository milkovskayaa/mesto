import { arrayCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

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
const buttonCreateCard = document.querySelector('.popup__submit_type_add');

// инпуты попапа редактирования профиля
const inputNameFormProfile = document.querySelector('.popup__input_type_name');
const inputAboutFormProfile = document.querySelector('.popup__input_type_about');

// формы попапов
const popupEditeProfileForm = document.querySelector('.popup__form_type_edit');
const popupAddCardForm = document.querySelector('.popup__form_type_add');

// создание карточки из класса
const createCardElement = (item) => {
  const card = new Card (item, '.card-template', (item) => {
    popupOpenImage.open(item.name, item.link);
  });
  const newCard = card.generateCard();
  return newCard;
};

const cardsGrid = new Section('.elements', {
  renderer: (item) => {
    const newCard = createCardElement(item);
    cardsGrid.addItem(newCard);
  }
});

cardsGrid.renderItems(arrayCards);


const userInfoFormProfile = new UserInfo({
  profileName: '.profile__username',
  profileBio: '.profile__about'
});

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

const handleSubmitPopupProfile = () => {
  userInfoFormProfile.setUserInfo({
    name: inputNameFormProfile.value,
    bio: inputAboutFormProfile.value
  });
};

// функция добавления карточки из попапа
const handleCardSubmit = () => {

  cardsGrid.addItem(
    createCardElement({
    name: inputNameFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value
  })
  );
};

const popupEditProfileSubmit = new PopupWithForm('.popup_edit-profile', handleSubmitPopupProfile);
popupEditProfileSubmit.setEventListeners();

const popupAddCardSubmit = new PopupWithForm('.popup_add-card', handleCardSubmit);
popupAddCardSubmit.setEventListeners();

// обработчики событий кнопок

// нажатие на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
  const profileData = userInfoFormProfile.getUserInfo();
  inputNameFormProfile.value = profileData.name;
  inputAboutFormProfile.value = profileData.bio;
  popupEditProfile.open();
});


// нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();
  cardValidator.toggleButtonValid(buttonCreateCard);

  popupAddCard.open();
});

const profileValidator = new FormValidator(config, popupEditeProfileForm);
const cardValidator = new FormValidator(config, popupAddCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();







