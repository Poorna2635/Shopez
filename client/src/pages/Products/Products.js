import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../utils/api';
import ProductCard from '../../components/ProductCard/ProductCard';

const CATEGORIES = ['Mobiles', 'Electronics', 'Fashion', 'Sports-Equipment', 'Groceries'];

const Products = () => {
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search   = searchParams.get('search')   || '';
  const category = searchParams.get('category') || '';
  const gender   = searchParams.get('gender')   || '';
  const sort     = searchParams.get('sort')     || '';

  useEffect(() => {
    setLoading(true);
    fetchProducts({ search, category, gender, sort })
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, gender, sort]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    setSearchParams(p);
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar Filters */}
        <div className="col-lg-3">
          <div className="filter-sidebar">
            <h6 className="fw-bold mb-3">Sort By</h6>
            {[
              { val: '',        label: 'Popular' },
              { val: 'low',     label: 'Price: Low to High' },
              { val: 'high',    label: 'Price: High to Low' },
              { val: 'discount',label: 'Discount' },
            ].map((s) => (
              <div className="form-check mb-1" key={s.val}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  id={`sort-${s.val}`}
                  checked={sort === s.val}
                  onChange={() => setParam('sort', s.val)}
                />
                <label className="form-check-label small" htmlFor={`sort-${s.val}`}>{s.label}</label>
              </div>
            ))}

            <hr />
            <h6 className="fw-bold mb-3">Categories</h6>
            <div
              className={`form-check mb-1`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="cat"
                id="cat-all"
                checked={!category}
                onChange={() => setParam('category', '')}
              />
              <label className="form-check-label small" htmlFor="cat-all">All</label>
            </div>
            {CATEGORIES.map((c) => (
              <div className="form-check mb-1" key={c}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="cat"
                  id={`cat-${c}`}
                  checked={category === c}
                  onChange={() => setParam('category', c)}
                />
                <label className="form-check-label small" htmlFor={`cat-${c}`}>{c}</label>
              </div>
            ))}

            <hr />
            <h6 className="fw-bold mb-3">Gender</h6>
            {['Men', 'Women', 'Unisex'].map((g) => (
              <div className="form-check mb-1" key={g}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`gender-${g}`}
                  checked={gender === g}
                  onChange={(e) => setParam('gender', e.target.checked ? g : '')}
                />
                <label className="form-check-label small" htmlFor={`gender-${g}`}>{g}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              {category || 'All Products'}
              <span className="text-muted fs-6 ms-2">({products.length} results)</span>
            </h5>
            {search && <span className="badge bg-secondary">Search: "{search}"</span>}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-search fs-1"></i>
              <p className="mt-3">No products found.</p>
            </div>
          ) : (
            <div className="row g-3">
              {products.map((p) => (
                <div className="col-6 col-md-4 col-xl-3" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
