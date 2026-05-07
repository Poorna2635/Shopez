import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../utils/api';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.username || '', email: user?.email || '',
    mobile: '', address: '', pincode: '', paymentMethod: 'COD',
  });
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 999 ? 0 : 99;
  const discount = Math.round(cartTotal * 0.05);
  const total    = cartTotal - discount + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.address || !form.pincode)
      return alert('Please fill all required fields');

    setLoading(true);
    try {
      for (const item of cartItems) {
        await placeOrder({
          userId:        user._id,
          name:          form.name,
          email:         form.email,
          mobile:        form.mobile,
          address:       form.address,
          pincode:       form.pincode,
          title:         item.title,
          description:   item.description,
          mainImg:       item.mainImg,
          size:          item.size,
          quantity:      item.quantity,
          price:         item.price * item.quantity,
          discount:      item.discount,
          paymentMethod: form.paymentMethod,
        });
      }
      await clearCart();
      navigate('/profile?tab=orders');
      alert('🎉 Order placed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Checkout</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-3 p-4 mb-3">
              <h5 className="fw-bold mb-4">Shipping Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Full Name *</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Nand Kishor" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Email *</label>
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Mobile *</label>
                  <input className="form-control" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 9876543210" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Pincode *</label>
                  <input className="form-control" name="pincode" value={form.pincode} onChange={handleChange} placeholder="826001" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold small">Full Address *</label>
                  <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="123 Street, City, State" required />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card border-0 shadow-sm rounded-3 p-4">
              <h5 className="fw-bold mb-4">Payment Method</h5>
              {[
                { val: 'COD',  label: '💵 Cash on Delivery' },
                { val: 'Card', label: '💳 Credit / Debit Card' },
                { val: 'UPI',  label: '📲 UPI Payment' },
              ].map((pm) => (
                <div
                  key={pm.val}
                  className={`p-3 rounded-3 border mb-2 d-flex align-items-center gap-3 ${form.paymentMethod === pm.val ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setForm({ ...form, paymentMethod: pm.val })}
                >
                  <input
                    type="radio"
                    className="form-check-input mt-0"
                    name="payment"
                    checked={form.paymentMethod === pm.val}
                    onChange={() => setForm({ ...form, paymentMethod: pm.val })}
                  />
                  <span className="fw-semibold">{pm.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="col-lg-4">
            <div className="order-summary-card">
              <h6 className="fw-bold mb-3">Order Summary</h6>
              {cartItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between small mb-1">
                  <span className="text-muted text-truncate" style={{ maxWidth: '60%' }}>{item.title} ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Discount (5%)</span>
                <span className="text-success">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span className="text-muted">Delivery</span>
                <span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span className="price-current">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : '✅ '}
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
