import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const shipping  = cartTotal > 999 ? 0 : 99;
  const discount  = Math.round(cartTotal * 0.05);
  const total     = cartTotal - discount + shipping;

  if (cartItems.length === 0) return (
    <div className="container py-5 text-center">
      <div style={{ fontSize: 80 }}>🛒</div>
      <h4 className="mt-3 fw-bold">Your cart is empty</h4>
      <p className="text-muted">Add some products to continue shopping</p>
      <Link to="/products" className="btn btn-primary mt-3 px-5">Shop Now</Link>
    </div>
  );

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">🛒 My Cart ({cartItems.length} items)</h4>
      <div className="row g-4">
        {/* Items */}
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item._id}>
              <div className="cart-item-icon">{item.mainImg || '📦'}</div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-1">Size: {item.size} | Qty: {item.quantity}</p>
                <span className="price-current">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="order-summary-card">
            <h6 className="fw-bold mb-3">Order Summary</h6>
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-muted">Subtotal ({cartItems.length} items)</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-muted">Discount (5%)</span>
              <span className="text-success">-₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-muted">Delivery</span>
              <span className={shipping === 0 ? 'text-success fw-bold' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span className="price-current">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              className="btn btn-primary w-100 fw-bold"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
