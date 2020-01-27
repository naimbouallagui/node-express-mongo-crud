const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// =======
// Schemas
// =======
const productSchema = new Schema({
  name: String,
  price: Number,
  created: { type: Date, default: Date.now() }
}
);

module.exports = { ProductModel: mongoose.model('products', productSchema), productSchema: productSchema };