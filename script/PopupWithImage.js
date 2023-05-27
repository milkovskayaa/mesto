import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-name');
  };

  open(text,link) {
    this._image.src = link;
    this._image.alt = text;
    this._caption.textContent = text;
    super.open();
  };
};

