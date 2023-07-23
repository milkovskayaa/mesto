export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

// получение информации о пользователе с сервера
  getInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
    .then(this._handleResponse);
  };

// получение карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
    .then(this._handleResponse);
  };
// добавление новой карточки
  postNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleResponse);
  }

// обновление аватара пользователя
  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._handleResponse);
  }
// обновление информации о пользователе
  updateUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
  })
    .then(this._handleResponse);
  }


}


