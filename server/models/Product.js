const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  mainImg:     { type: String, default: '' },
  carousel:    { type: Array, default: [] },
  sizes:       { type: Array, default: [] },
  category:    { type: String, required: true },
  gender:      { type: String, enum: ['Men', 'Women', 'Unisex'], default: 'Unisex' },
  price:       { type: Number, required: true },
  discount:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);
