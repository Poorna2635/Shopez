import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../utils/api';
import ProductCard from '../../components/ProductCard/ProductCard';

const CATEGORIES = [
  { name: 'Mobiles',          icon: '📱' },
  { name: 'Electronics',      icon: '💻' },
  { name: 'Fashion',          icon: '👗' },
  { name: 'Sports-Equipment', icon: '⚽' },
  { name: 'Groceries',        icon: '🛒' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts({})
      .then(({ data }) => setFeatured(data.slice(0, 8)))
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="hero-section">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Shop and save, Shop EZ 🛍️</h1>
          <p className="lead mb-4 opacity-75">
            Discover amazing products at unbeatable prices. Fast delivery, secure checkout.
          </p>
          <Link to="/products" className="btn btn-warning btn-lg fw-bold text-dark px-5 rounded-pill">
            Shop Now →
          </Link>
        </div>
      </div>

      <div className="container py-5">
        {/* Categories */}
        <h4 className="fw-bold mb-4">Shop by Category</h4>
        <div className="row g-3 mb-5">
          {CATEGORIES.map((cat) => (
            <div className="col-6 col-md-4 col-lg-2" key={cat.name}>
              <div
                className="category-card"
                onClick={() => navigate(`/products?category=${cat.name}`)}
              >
                <div className="category-icon">{cat.icon}</div>
                <div className="fw-semibold small">{cat.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Featured Products</h4>
          <Link to="/products" className="btn btn-outline-primary btn-sm">View All</Link>
        </div>
        <div className="row g-3">
          {featured.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
          {featured.length === 0 && (
            <p className="text-muted">Loading products...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
