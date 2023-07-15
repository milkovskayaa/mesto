export default class UserInfo {
  constructor({profileName, profileBio, profileAvatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileBio = document.querySelector(profileBio);
    this._profileAvatar = document.querySelector(profileAvatar);
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      bio: this._profileBio.textContent,
      avatar: this._profileAvatar.src
    };
  };

  setUserInfo({name, bio, avatar}) {
    this._profileName.textContent = name;
    this._profileBio.textContent = bio;
    this._profileAvatar.src = avatar;
  };
};


