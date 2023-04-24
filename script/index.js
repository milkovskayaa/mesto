import { arrayCards } from "./constants.js";

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

const cardTemplate = document.getElementById('template-card');
const cardsGrid = document.querySelector('.elements');

const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-name');

// элементы профиля пользователя
const userName = document.querySelector('.profile__username');
const userAbout = document.querySelector('.profile__about');

const inputNameFormAddNewCard = popupAddCardForm.querySelector('.popup__input_type_card-name');
const inputLinkFormAddNewCard = popupAddCardForm.querySelector('.popup__input_type_link');


// функции

// закрытие попапа клавишей Esc
function closePopupByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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

// функция создания карточки и действий в ней
function createCardElement (cardItem) {
  const cardElement = cardTemplate.content.querySelector('.elements__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.elements__img');
  const cardName = cardElement.querySelector('.elements__name');
  const likeButton = cardElement.querySelector('.elements__like');
  const deleteCardButton = cardElement.querySelector('.elements__delete');

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardName.textContent = cardItem.name;

  const handleDeleteCard = () => {
    cardElement.remove();
  };

  const handleLikeCard = () => {
    likeButton.classList.toggle('elements__like_active');
  };

  const openZoomImage = () => {
    image.src = cardItem.link;
    image.alt = cardItem.name;
    caption.textContent = cardItem.name;
    openPopup(popupOpenImage);
  };

  deleteCardButton.addEventListener('click', handleDeleteCard);

  likeButton.addEventListener('click', handleLikeCard);

  cardImage.addEventListener('click', openZoomImage);

  return cardElement;
};

// функция добавления карточек в секцию
function addCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

arrayCards.forEach((card) => {
  const element = createCardElement(card);
  addCardElement(element);
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

function setDisabledButton(button) {
  button.classList.add('popup__submit_disabled');
  button.setAttribute('disabled', true);
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
  openPopup(popupEditProfile);
});

// взаимодействия пользователя с формами попапов
popupEditeProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

popupAddCardForm.addEventListener('submit', handleCardSubmit);

// нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();
  setDisabledButton(buttonCreateCard);
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







