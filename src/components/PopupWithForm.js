import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputArray = this._popupForm.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._popupForm.querySelector('.popup__submit');

    this._submitButtonText = this._popupSubmitButton.textContent;
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

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._popupSubmitButton.textContent = loadingText;
    } else {
      this._popupSubmitButton.textContent = this._submitButtonText;
    }
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

