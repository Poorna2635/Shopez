const Cart = require('../models/Cart');

// @desc  Get cart items for logged-in user
// @route GET /api/cart
const getCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user._id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Add item to cart
// @route POST /api/cart
const addToCart = async (req, res) => {
  try {
    const item = await Cart.create({ ...req.body, userId: req.user._id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Remove item from cart
// @route DELETE /api/cart/:id
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Clear entire cart
// @route DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
