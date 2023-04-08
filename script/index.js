import { arrayCards } from "./constants.js";

// попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
// const cardImage = document.querySelector('.elements__img');
const popupOpenImage = document.querySelector('.popup__card-image');

// кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonClosePopupEdit = popupEditProfile.querySelector('.popup__button-close');
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__button-close');
const buttonCloseImagePopup = popupOpenImage.querySelector('.popup__button-close');

// инпуты попапа редактирования профиля
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');

// формы попапов
const popupEditeProfileForm = document.querySelector('.popup__form_type_edit');
const popupAddCardForm = document.querySelector('.popup__form_type_add');

const cardTemplate = document.getElementById('template-card');
const cardsGrid = document.querySelector('.elements');

const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-name');
// элементы профиля пользователя
let userName = document.querySelector('.profile__username');
let userAbout = document.querySelector('.profile__about');

// функции

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция сохранения измененных данных, введенных пользователем
function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userAbout.textContent = inputAbout.value;
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

  deleteCardButton.addEventListener('click', handleDeleteCard);

  likeButton.addEventListener('click', handleLikeCard);

// открытие попапа с картинкой
  cardImage.addEventListener('click', () => {
    image.src = cardItem.link;
    image.alt = cardItem.name;
    caption.textContent = cardItem.name;
    openPopup(popupOpenImage);
  });

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

  const nameCard = popupAddCardForm.querySelector('.popup__input_type_card-name');
  const linkCard = popupAddCardForm.querySelector('.popup__input_type_link');

  const name = nameCard.value;
  const link = linkCard.value;

  const cardData = {
    name,
    link
  };

  addCardElement(createCardElement(cardData));
  closePopup(popupAddCard);
};

// обработчики событий кнопок

// нажатие на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
  inputName.value = userName.textContent;
  inputAbout.value = userAbout.textContent;
  openPopup(popupEditProfile);
});

// взаимодействия пользователя с формами попапов
popupEditeProfileForm.addEventListener('submit', handleFormSubmit);

popupAddCardForm.addEventListener('submit', handleCardSubmit);

// нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard)
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







