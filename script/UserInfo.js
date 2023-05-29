export default class UserInfo {
  constructor({profileName, profileBio}) {
    this._profileName = document.querySelector(profileName);
    this._profileBio = document.querySelector(profileBio);
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      bio: this._profileBio.textContent
    };
  };

  setUserInfo({name, bio}) {
    this._profileName.textContent = name;
    this._profileBio.textContent = bio;
  };
};


