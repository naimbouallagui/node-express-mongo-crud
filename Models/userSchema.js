const mongoose = require('mongoose');
const {productSchema} = require('../Models/productSchema');

const Schema = mongoose.Schema;
// =======
// Schemas
// =======

const userSchema = new Schema({
    email: String,
    password: String,
    products: [productSchema],
    created: { type: Date, default: Date.now() }
  }
);

module.exports = mongoose.model('users', userSchema);