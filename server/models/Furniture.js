const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, require: true },
    index: { type: String, require: true, unique: true },
    price: { type: String, require: true },
    quantity: { type: String, require: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    about: { type: String, require: true },
    picture: { type: String }
  },
  { timestamps: true }
);

module.exports = model('Furniture', schema);
