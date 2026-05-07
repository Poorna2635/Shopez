import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${search.trim()}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid px-3">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4 me-3" to="/">
          ShopEZ
        </Link>

        {/* Search */}
        <form className="d-flex flex-grow-1 me-3 search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products etc."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="d-flex align-items-center gap-2">
          {/* Cart */}
          <Link to="/cart" className="btn btn-outline-light btn-sm position-relative">
            <i className="bi bi-cart3"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
                  {user.usertype === 'ADMIN' && (
                    <li><Link className="dropdown-item" to="/admin"><i className="bi bi-gear me-2"></i>Admin Panel</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-outline-light btn-sm">Login</Link>
              <Link to="/register" className="btn btn-warning btn-sm fw-bold text-dark">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
