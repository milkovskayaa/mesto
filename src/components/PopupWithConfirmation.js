import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;

    this._popupSubmitButton = this._popup.querySelector('.popup__submit');
  }

getCardData(cardData) {
  this._cardId = cardData._id;
}

setEventListeners() {
  this._popupSubmitButton.addEventListener('click', () => {
    console.log('клик')
    this._handleSubmit();
    this.close();
  })
}

}


