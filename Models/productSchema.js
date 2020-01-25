const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// =======
// Schemas
// =======
const productSchema = new Schema({
    content: String,
    created: { type: Date, default: Date.now() }
  }
);

module.exports = mongoose.model('products', productSchema);