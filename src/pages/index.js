import './index.css'
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
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
let cardsGrid;

// загрузка данных с сервера
Promise.all([api.getInfoProfile(), api.getCards()])
  .then(([userData, cards]) => {
    userInfoFormProfile.setUserInfo({
      name: userData.name,
      bio: userData.about,
      avatar: userData.avatar
    });

    userId = userData._id;

    cardsGrid = new Section('.elements', (data) => {

      const newCard = createCardElement(data);
      cardsGrid.addItem(newCard);
    });

    cardsGrid.renderItems(cards);

  })
  .catch(console.error);

const userInfoFormProfile = new UserInfo({
  profileName: '.profile__username',
  profileBio: '.profile__about',
  profileAvatar: '.profile__img'
});

// сабмит попапа редактирования профиля
const handleSubmitPopupProfile = (data) => {
  function makeRequest() {
    return api.updateUserInfo(data.username, data.job)
    .then((userData)=> {
      userInfoFormProfile.setUserInfo({
        name: userData.name,
        bio: userData.about,
        avatar: userData.avatar
      });
    })
  }
  handleSubmit(makeRequest, popupEditProfile);
};

//сабмит попапа добавления карточки
const handleCardSubmit = (data) => {
  function makeRequest() {
    return api.postNewCard(data.cardname, data.link)
    .then((cardData) => {
      const cardElement = createCardElement(cardData);
      cardsGrid.addItem(cardElement);
    })
  }
  handleSubmit(makeRequest, popupAddCard);
};

// сабмит попапа изменения аватара
const handleSubmitAvatar = (data) => {
  function makeRequest() {
  return api.updateAvatar(data.avatar)
    .then((userData)=> {
      userInfoFormProfile.setUserInfo({
        name: userData.name,
        bio: userData.about,
        avatar: userData.avatar
      })
    })
  }
  handleSubmit(makeRequest, popupUpdateAvatar);
};

// функция удаления карточки
const handleDeleteCard = (card) => {
  api.deleteCard(card.cardId)
    .then(() => {
      card.deleteCard();
      popupToConfirm.close();
    })
    .catch(console.error);
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


// создание карточки из класса
function createCardElement(data) {
  const card = new Card (data,'.card-template',
    (data) => {
    popupOpenImage.open(data.name, data.link);
  }, () => {
    popupToConfirm.open();
    popupToConfirm.getCardData(card);
  }, userId, api);
  const newCard = card.generateCard();
  return newCard;
};

// универсальная функция для сабмита
function handleSubmit(request, popupInstance, loadingText) {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// обработчики событий кнопок

buttonUpdateAvatar.addEventListener('click', () => {
  updateAvatarValidator.toggleButtonValid();
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








