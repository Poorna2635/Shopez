const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  banner:     { type: String, default: '' },
  categories: { type: Array, default: ['Mobiles', 'Electronics', 'Fashion', 'Sports-Equipment', 'Groceries'] },
}, { timestamps: true });

module.exports = mongoose.model('admin', adminSchema);
