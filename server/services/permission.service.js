const UserRole = require('../models/UserRole');
const constants = require('../utils/constants');

class PermissionService {
  async isAdmin(userId) {
    const admin = await UserRole.findOne({ name: constants.USER_ROLE_ADMIN });
    return admin.members.includes(userId);
  }

  async isSuperUser(userId) {
    const superUsers = await UserRole.findOne({
      name: constants.USER_ROLE_SUPER_USER
    });
    return superUsers.includes(userId);
  }
}

module.exports = new PermissionService();
