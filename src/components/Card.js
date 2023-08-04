class Card {
  constructor(data, userData, templateElement, onClick, handleDeleteIcon, userId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._ownerId = data.owner._id;
    this._templateElement = templateElement;
    this._onClick = onClick;
    this._userId = userId;
    this._handleDeleteIcon = handleDeleteIcon;
    this._userData = userData;
    this._cardId = data._id;
    this._likes = data.likes;


    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._like = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete');
    this._likesCounter = this._element.querySelector('.elements__like-count');

  };

  // метод получения темплейт элемента
  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateElement)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  };

  // лайк карточки
  _handleLikeCard = () => {
    this._like.classList.toggle('elements__like_active');
  };

  // удаление карточки
  deleteCard() {
    this._element.remove();
  };

  // открытие картинки
  _handleCardClick = () => {
    this._onClick(this._data);
  };
// проверка владельца карточки и скрытие кнопки удаления
  _checkOwnerCard() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  };

// обновление количества лайков на карточке
  _updateLikesCount() {
    this._likesCounter.textContent = this._likes.length;
  }

  // метод формирования карточки
  generateCard () {
    this._setEventListeners();
    this._img.src = this._link;
    this._img.alt = this._alt;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._checkOwnerCard();
    this._updateLikesCount();

    return this._element;

  };

  // слушатели
  _setEventListeners() {
    // лайк
    this._like.addEventListener('click', this._handleLikeCard);
    // удаление
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIcon(this._cardId);
    });

    this._img.addEventListener('click', this._handleCardClick);
  };

};

export { Card };
