const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    isAdmin: { type: Boolean },
    isSuperUser: { type: Boolean },
    license: { type: Boolean },
    avatarImage: { type: String },
    password: { type: String, require: true },
    shippingAddress: { type: String },
    mobilePhoneNumber: { type: String }
  },
  { timestamps: true }
);

module.exports = model('User', schema);
