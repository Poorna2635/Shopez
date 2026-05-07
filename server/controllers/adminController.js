const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc  Get all users (Admin)
// @route GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Delete user (Admin)
// @route DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Get dashboard stats (Admin)
// @route GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const revenue = revenueData[0]?.total || 0;
    res.json({ totalProducts, totalOrders, totalUsers, revenue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, deleteUser, getDashboardStats };
