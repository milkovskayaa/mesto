import './index.css'
import { arrayCards, config } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const popupOpenImage = new PopupWithImage('.popup_card-image');
popupOpenImage.setEventListeners();

// кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAddCard = document.querySelector('.profile__button_type_add');

// инпуты попапа редактирования профиля
const inputNameFormProfile = document.querySelector('.popup__input_type_name');
const inputAboutFormProfile = document.querySelector('.popup__input_type_about');

// формы попапов
const popupEditeProfileForm = document.forms['form-profile'];
const popupAddCardForm = document.forms['form-card'];

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

const handleSubmitPopupProfile = (data) => {
  userInfoFormProfile.setUserInfo({
    name: data.username,
    bio: data.job
  });

};

// функция добавления карточки из попапа
const handleCardSubmit = (data) => {
  cardsGrid.addItem(
    createCardElement({
    name: data.cardname,
    link: data.link
  })
  );
};

const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleSubmitPopupProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add-card', handleCardSubmit);
popupAddCard.setEventListeners();

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
  cardValidator.toggleButtonValid();
  popupAddCard.open();
});

const profileValidator = new FormValidator(config, popupEditeProfileForm);
const cardValidator = new FormValidator(config, popupAddCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();







