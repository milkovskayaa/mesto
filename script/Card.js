class Card {
  constructor(data, templateElement, onClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateElement = templateElement;
    this._onClick = onClick;
  };

  // метод получения темплейт элемента
  _getTemplate () {
    const cardElement = document
    .querySelector('.card-template')
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  };

  // лайк карточки
  _handleLikeCard = () => {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  };
  // удаление карточки
  _handleDeleteCard = () => {
    this._element.remove();
  };
  // открытие картинки
  _handleCardClick = () => {
    this._onClick(this._data);
  };

  // метод формирования карточки
  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._alt;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  };

  // слушатели
  _setEventListeners() {
    // лайк
    this._element.querySelector('.elements__like').addEventListener('click', this._handleLikeCard);
    // удаление
    this._element.querySelector('.elements__delete').addEventListener('click', this._handleDeleteCard);

    this._element.querySelector('.elements__img').addEventListener('click', this._handleCardClick);
  };

};

export { Card };
