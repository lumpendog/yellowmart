const { USER_DEFAULT_AVATAR } = require('./constants');

function generateDefaultUserData() {
  const data = {
    avatarImage: USER_DEFAULT_AVATAR,
    isAdmin: false,
    isSuperUser: false
  };
  return data;
}

module.exports = {
  generateDefaultUserData
};
