import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const EMOJI_MAP = {
  Mobiles: '📱', Electronics: '💻', Fashion: '👗',
  'Sports-Equipment': '⚽', Groceries: '🛒',
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const icon = EMOJI_MAP[product.category] || '📦';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      productId: product._id,
      title: product.title,
      description: product.description,
      mainImg: product.mainImg || icon,
      size: product.sizes?.[0] || 'One Size',
      quantity: 1,
      price: discountedPrice,
      discount: product.discount,
    });
    alert('Added to cart!');
  };

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
      <div className="product-img-wrapper">
        <span>{product.mainImg || icon}</span>
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </div>
      <div className="p-3">
        <h6 className="fw-bold mb-1 text-truncate">{product.title}</h6>
        <p className="text-muted small mb-2 text-truncate">{product.description}</p>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="price-current">₹{discountedPrice.toLocaleString('en-IN')}</span>
          {product.discount > 0 && (
            <>
              <span className="price-original">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="price-off">{product.discount}% off</span>
            </>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm w-100"
          onClick={handleAddToCart}
        >
          <i className="bi bi-cart-plus me-1"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
