import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-dark text-white mt-5 py-4">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4">
          <h5 className="fw-bold">Shop<span className="text-warning">EZ</span></h5>
          <p className="text-secondary small">Your one-stop destination for effortless online shopping.</p>
        </div>
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">Quick Links</h6>
          <ul className="list-unstyled small">
            <li><Link to="/"         className="text-secondary text-decoration-none">Home</Link></li>
            <li><Link to="/products" className="text-secondary text-decoration-none">Products</Link></li>
            <li><Link to="/cart"     className="text-secondary text-decoration-none">Cart</Link></li>
            <li><Link to="/profile"  className="text-secondary text-decoration-none">Profile</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">Categories</h6>
          <ul className="list-unstyled small">
            {['Mobiles', 'Electronics', 'Fashion', 'Sports-Equipment', 'Groceries'].map((c) => (
              <li key={c}>
                <Link to={`/products?category=${c}`} className="text-secondary text-decoration-none">{c}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="border-secondary" />
      <p className="text-center text-secondary small mb-0">
        © {new Date().getFullYear()} ShopEZ. Built with MERN Stack.
      </p>
    </div>
  </footer>
);

export default Footer;
