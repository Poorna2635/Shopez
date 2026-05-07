const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
require('dotenv').config();

const User    = require('./models/User');
const Product = require('./models/Product');

const PRODUCTS = [
  { title: 'iPhone 12',        description: 'Apple silicon with 6GB RAM and A14 Bionic chip. 12MP dual camera.', mainImg: '📱', category: 'Mobiles',          gender: 'Unisex', price: 79999,  discount: 15, sizes: ['64GB','128GB','256GB'] },
  { title: 'Realme Buds',      description: 'TWS buds with 10.2mm drivers, 30hr battery life, instant connect.', mainImg: '🎧', category: 'Electronics',      gender: 'Unisex', price: 3999,   discount: 35, sizes: ['One Size'] },
  { title: 'MRF Cricket Bat',  description: 'Popular willow wood cricket bat, professional series grade 1.',    mainImg: '🏏', category: 'Sports-Equipment', gender: 'Men',    price: 1699,   discount: 23, sizes: ['Short Handle','Long Handle'] },
  { title: 'Nike Running Shoes', description: 'Lightweight breathable mesh upper, React foam cushioning.',      mainImg: '👟', category: 'Fashion',          gender: 'Men',    price: 7999,   discount: 37, sizes: ['7','8','9','10','11'] },
  { title: 'Samsung Galaxy Tab', description: '10.4 inch display, 6000mAh battery, 64GB storage, WiFi.',       mainImg: '📟', category: 'Electronics',      gender: 'Unisex', price: 29999,  discount: 23, sizes: ['64GB','128GB'] },
  { title: 'Silk Saree',        description: 'Pure silk saree with golden zari border, Kanchipuram style.',     mainImg: '👗', category: 'Fashion',          gender: 'Women',  price: 5999,   discount: 42, sizes: ['Free Size'] },
  { title: 'Whey Protein 1kg',  description: 'Whey protein isolate, 25g protein per serving, chocolate flavor.', mainImg: '🥛', category: 'Groceries',       gender: 'Unisex', price: 3499,   discount: 37, sizes: ['1kg','2kg','5kg'] },
  { title: 'OnePlus Nord CE',   description: '5G smartphone, 64MP triple camera, 4500mAh, 65W fast charge.',   mainImg: '📱', category: 'Mobiles',          gender: 'Unisex', price: 24999,  discount: 20, sizes: ['64GB','128GB'] },
  { title: 'Yoga Mat Pro',      description: 'Non-slip premium TPE yoga mat, 6mm thick with carry strap.',     mainImg: '🧘', category: 'Sports-Equipment', gender: 'Women',  price: 1299,   discount: 38, sizes: ['Standard','Large'] },
  { title: "Men's Formal Shirt", description: '100% cotton slim fit formal shirt, wrinkle resistant.',         mainImg: '👔', category: 'Fashion',          gender: 'Men',    price: 1999,   discount: 35, sizes: ['S','M','L','XL','XXL'] },
  { title: 'Basmati Rice 5kg',  description: 'Premium aged basmati rice, long grain aromatic, restaurant quality.', mainImg: '🍚', category: 'Groceries',   gender: 'Unisex', price: 599,    discount: 25, sizes: ['5kg','10kg','25kg'] },
  { title: 'JBL Speaker',       description: '360° surround sound, IPX7 waterproof, 12hr playtime, JBL bass.',  mainImg: '🔊', category: 'Electronics',     gender: 'Unisex', price: 5499,   discount: 36, sizes: ['One Size'] },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    await Product.insertMany(PRODUCTS);
    console.log(`Inserted ${PRODUCTS.length} products`);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'Admin',
      email: 'admin@shopez.com',
      password: adminPassword,
      usertype: 'ADMIN',
    });
    console.log('Created admin user: admin@gmail.com / admin123');

    // Create test user
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      username: 'ramg',
      email: 'ramg@gmail.com',
      password: userPassword,
      usertype: 'USER',
    });
    console.log('Created test user: ramg@gmail.com / user123');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDB();
