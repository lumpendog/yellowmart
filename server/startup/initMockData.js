const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const categoryMock = require('../mock/categories');
const UserRole = require('../models/UserRole');
const userRoleMock = require('../mock/userRoles');
const User = require('../models/User');
const constants = require('../utils/constants');
const config = require('config');

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }
  const userRoles = await UserRole.find();
  if (userRoles.length !== userRoleMock.length) {
    await createInitialEntity(UserRole, userRoleMock);
  }
  const defaultAdmin = await User.findOne({
    email: config.get('adminDefaultEmail')
  });
  if (!defaultAdmin) {
    const hashedPassword = await bcrypt.hash(
      config.get('adminDefaultPassword'),
      constants.BCRYPT_SALT_ROUNDS
    );

    const newAdmin = await User.create({
      email: config.get('adminDefaultEmail'),
      firstName: 'admin',
      lastName: 'admin',
      license: true,
      password: hashedPassword,
      isAdmin: true,
      isSuperUser: true
    });

    const adminRole = await UserRole.findOne({
      name: constants.USER_ROLE_ADMIN
    });
    adminRole.members = [...adminRole.members, newAdmin._id];
    await adminRole.save();

    const superUserRole = await UserRole.findOne({
      name: constants.USER_ROLE_SUPER_USER
    });
    superUserRole.members = [...superUserRole.members, newAdmin._id];
    await superUserRole.save();
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
