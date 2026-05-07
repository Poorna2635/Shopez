import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../utils/api';
import { useCart } from '../../context/CartContext';

const EMOJI_MAP = {
  Mobiles: '📱', Electronics: '💻', Fashion: '👗',
  'Sports-Equipment': '⚽', Groceries: '🛒',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product,  setProduct]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [selSize,  setSelSize]  = useState('');
  const [qty,      setQty]      = useState(1);

  useEffect(() => {
    fetchProductById(id)
      .then(({ data }) => { setProduct(data); setSelSize(data.sizes?.[0] || ''); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary"></div>
    </div>
  );
  if (!product) return <div className="container py-5 text-muted">Product not found.</div>;

  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const savedAmount     = product.price - discountedPrice;
  const icon = product.mainImg || EMOJI_MAP[product.category] || '📦';

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      title: product.title,
      description: product.description,
      mainImg: icon,
      size: selSize,
      quantity: qty,
      price: discountedPrice,
      discount: product.discount,
    });
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary btn-sm mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-1"></i> Back
      </button>

      <div className="row g-4">
        {/* Image */}
        <div className="col-md-5">
          <div className="product-img-wrapper rounded-3" style={{ height: 380, fontSize: 140 }}>
            <span>{icon}</span>
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="col-md-7">
          <span className="badge bg-light text-primary border border-primary mb-2">{product.category}</span>
          <h2 className="fw-bold mb-2">{product.title}</h2>
          <p className="text-muted mb-3">{product.description}</p>

          {/* Price */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="price-current fs-3">₹{discountedPrice.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <>
                <span className="price-original fs-5">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="badge bg-success">Save ₹{savedAmount.toLocaleString('en-IN')} ({product.discount}%)</span>
              </>
            )}
          </div>

          {/* Size */}
          {product.sizes?.length > 0 && (
            <div className="mb-3">
              <label className="fw-semibold small d-block mb-2">Select Size / Variant</label>
              <div className="d-flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selSize === s ? 'active' : ''}`}
                    onClick={() => setSelSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <label className="fw-semibold small">Quantity</label>
            <div className="d-flex">
              <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="px-4 py-1 border-top border-bottom d-flex align-items-center fw-bold">{qty}</span>
              <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex gap-3">
            <button className="btn btn-primary btn-lg flex-fill" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus me-2"></i>Add to Cart
            </button>
            <button className="btn btn-warning btn-lg flex-fill fw-bold text-dark" onClick={handleBuyNow}>
              <i className="bi bi-lightning-fill me-2"></i>Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-4 p-3 bg-light rounded-3 small text-muted">
            <i className="bi bi-truck me-2 text-success"></i>Free delivery on orders above ₹999
            <br />
            <i className="bi bi-arrow-return-left me-2 text-info"></i>Easy 7-day returns
            <br />
            <i className="bi bi-shield-check me-2 text-warning"></i>Secure checkout & payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
