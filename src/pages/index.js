import './index.css'
import { config } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from '../components/Api.js';

const popupOpenImage = new PopupWithImage('.popup_card-image');
popupOpenImage.setEventListeners();

// кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonUpdateAvatar = document.querySelector('.profile__overlay-img');

// инпуты попапа редактирования профиля
const inputNameFormProfile = document.querySelector('.popup__input_type_name');
const inputAboutFormProfile = document.querySelector('.popup__input_type_about');

// формы попапов
const popupEditeProfileForm = document.forms['form-profile'];
const popupAddCardForm = document.forms['form-card'];

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '4e9ead22-f0ed-4500-82aa-6e497ff39fc7',
    'Content-Type': 'application/json'
  }
});

// загрузка карточек с сервера
api.getCards()
  .then((cards) => {
    cards.forEach((data) => {
      const newCard = createCardElement(data);
      cardsGrid.addItem(newCard);
    })
  })
  .catch((err) => {
    console.log(err);
  });
// добавление карточек в секцию
const cardsGrid = new Section('.elements', () => {
    cardsGrid.addItem(newCard);
  }
);

// создание карточки из класса
const createCardElement = (item) => {
  const card = new Card (item, '.card-template', (item) => {
    popupOpenImage.open(item.name, item.link);
  });
  const newCard = card.generateCard();
  return newCard;
};

const userInfoFormProfile = new UserInfo({
  profileName: '.profile__username',
  profileBio: '.profile__about',
  profileAvatar: '.profile__img'
});


// получение данных пользователя с сервера
api.getInfoProfile()
  .then((res) => {
    userInfoFormProfile.setUserInfo({
      name: res.name,
      bio: res.about,
      avatar: res.avatar
    })
  })
  .catch((err) => {
    console.log(err);
  });


// сабмит попапа редактирования профиля
const handleSubmitPopupProfile = (data) => {
  api.updateUserInfo(data.username, data.job)
    .then((res)=> {
      userInfoFormProfile.setUserInfo({
        name: res.name,
        bio: res.about,
        avatar: res.avatar
      })
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
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
// установка аватара пользователя
const handleSubmitAvatar = (data) => {
  api.updateAvatar(data.avatar)
    .then((res)=> {
      userInfoFormProfile.setUserInfo({
        name: res.name,
        bio: res.about,
        avatar: res.avatar
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleSubmitPopupProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add-card', handleCardSubmit);
popupAddCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', handleSubmitAvatar);
popupUpdateAvatar.setEventListeners();

// обработчики событий кнопок

buttonUpdateAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

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








