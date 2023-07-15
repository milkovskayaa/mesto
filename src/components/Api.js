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
  }

  getInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }


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

  // updateAvatar(avatar) {
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({avatar: avatar.link}),
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-type': 'application/json'
  //     },

  //   })
  //   .then(this._handleResponse);

  // updateUserInfo(userData) {
  //   return fetch(`${this._url}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: userData.name,
  //       about: userData.about
  //     })
  // })
  //   .then(this._handleResponse);
  // }

}



