const { Schema, model } = require('mongoose');
const constants = require('../utils/constants');

const schema = new Schema({
  name: {
    type: String,
    enum: [
      constants.USER_ROLE_ADMIN,
      constants.USER_ROLE_SUPER_USER,
      constants.USER_ROLE_USER
    ],
    required: true,
    unique: true
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('UserRole', schema);
