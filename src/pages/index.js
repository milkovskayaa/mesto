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
import PopupWithConfirmation from '../components/PopupWithConfirmation';

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
const popupUpdateAvatarForm = document.forms['form-avatar'];


const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '9b32332c-f0f6-42bc-b5ec-b67db254adaa',
    'Content-Type': 'application/json'
  }
});



let userId = null;

// загрузка данных с сервера
Promise.all([api.getInfoProfile(), api.getCards()])
  .then(([res, cards]) => {
    userInfoFormProfile.setUserInfo({
      name: res.name,
      bio: res.about,
      avatar: res.avatar
    });

    userId = res._id;
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

const userInfoFormProfile = new UserInfo({
  profileName: '.profile__username',
  profileBio: '.profile__about',
  profileAvatar: '.profile__img'
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
  Promise.all([api.postNewCard(data.cardname, data.link), api.getInfoProfile()])
    .then(([res, userData]) => {
      cardId = res._id;
      const cardElement = createCardElement(res, userData);
      cardsGrid.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
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
};

const handleDeleteCard = (data) => {

};

// создание карточки из класса
function createCardElement(data, userData) {
  const card = new Card (data, userData,'.card-template',
    (data) => {
    popupOpenImage.open(data.name, data.link);
  }, () => {
    popupToConfirm.open();
    popupToConfirm.getCardData(data);
    handleDeleteCard(data)
  }, userId);
  const newCard = card.generateCard();
  return newCard;
};


const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleSubmitPopupProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add-card', handleCardSubmit);
popupAddCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', handleSubmitAvatar);
popupUpdateAvatar.setEventListeners();

const popupOpenImage = new PopupWithImage('.popup_card-image');
popupOpenImage.setEventListeners();

const popupToConfirm = new PopupWithConfirmation('.popup_confirm', handleDeleteCard);
popupToConfirm.setEventListeners();


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
const updateAvatarValidator = new FormValidator(config, popupUpdateAvatarForm);

profileValidator.enableValidation();
cardValidator.enableValidation();
updateAvatarValidator.enableValidation();








