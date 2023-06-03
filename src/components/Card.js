class Card {
  constructor(data, templateElement, onClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateElement = templateElement;
    this._onClick = onClick;

    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._like = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete');
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
  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };
  // открытие картинки
  _handleCardClick = () => {
    this._onClick(this._data);
  };

  // метод формирования карточки
  generateCard () {
    this._setEventListeners();

    this._img.src = this._link;
    this._img.alt = this._alt;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  };

  // слушатели
  _setEventListeners() {
    // лайк
    this._like.addEventListener('click', this._handleLikeCard);
    // удаление
    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    this._img.addEventListener('click', this._handleCardClick);
  };

};

export { Card };
