import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;

    this._popupSubmitButton = this._popup.querySelector('.popup__submit');
  }

getCardData(cardData) {
  this._cardId = cardData._id;
  this._card = cardData;
}

close() {
  super.close()
}

setEventListeners() {
  this._popupSubmitButton.addEventListener('click', () => {
    this._handleSubmit(this._card);

    this.close();
  })
}


}


