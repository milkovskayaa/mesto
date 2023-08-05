export default class Card {
  constructor(data, userData, templateElement, onClick, handleDeleteIcon, userId, api) {
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
    this._api = api;

    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._likeButton = this._element.querySelector('.elements__like');
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
    if (this._likeButton.classList.contains('elements__like_active')) {
      this._api.deleteLikeCard(this._cardId)
        .then((res) => {
          this._likeButton.classList.remove('elements__like_active');
          this._likesCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
      }
    else {
      this._api.onLikeCard(this._cardId)
        .then((res) => {
          this._likesCounter.textContent = res.likes.length;
          this._likeButton.classList.add('elements__like_active');
        })
        .catch((err) => {
          console.log(err);
        })
    }
    }


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
    this._updateLikesCount(this.likes);

    const checkLike = this._likes.some((like) => {
      like._id === this._userId;
    });
    if (checkLike) {
      this._likeButton.classList.toggle('elements__like_active');
    }

    return this._element;

  };

  delete = () => {
    this._element.remove();
  }


  // слушатели
  _setEventListeners() {
    // лайк
    this._likeButton.addEventListener('click', this._handleLikeCard);
    // удаление
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIcon(this);
    });

    this._img.addEventListener('click', this._handleCardClick);
  };

};


