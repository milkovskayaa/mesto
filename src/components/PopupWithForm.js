import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputArray = this._popupForm.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._popupForm.querySelector('.popup__submit');

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

  async handleSubmitButton(evt) {
    evt.preventDefault();
    const buttonText = this._popupSubmitButton.textContent;
    try {
      this._popupSubmitButton.textContent = 'Сохранение...';
      await this._handleSubmit(this._getInputValues());
      this.close();
    }
    finally {
      this._popupSubmitButton.textContent = buttonText;
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this.handleSubmitButton.bind(this));
    super.setEventListeners();
  };
};
