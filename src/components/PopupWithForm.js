import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputArray = document.querySelectorAll('.popup__input');
    this._popupSubmitButton = document.querySelector('.popup__submit');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputArray.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  close() {
    super.close();
    this._popupForm.reset();
  };

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  };


};
