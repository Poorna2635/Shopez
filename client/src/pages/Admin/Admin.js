import React, { useEffect, useState } from 'react';
import {
  getDashboardStats, getAllOrders, getAllUsers,
  fetchProducts, deleteProduct, updateOrderStatus, deleteUser,
} from '../../utils/api';

const TABS = [
  { key: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { key: 'products',  icon: 'bi-box-seam',     label: 'Products'  },
  { key: 'orders',    icon: 'bi-cart-check',    label: 'Orders'    },
  { key: 'users',     icon: 'bi-people',        label: 'Users'     },
];

const Admin = () => {
  const [tab,      setTab]      = useState('dashboard');
  const [stats,    setStats]    = useState({});
  const [orders,   setOrders]   = useState([]);
  const [users,    setUsers]    = useState([]);
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(false);

  const load = async (t) => {
    setLoading(true);
    try {
      if (t === 'dashboard') {
        const { data } = await getDashboardStats();
        setStats(data);
      } else if (t === 'orders') {
        const { data } = await getAllOrders();
        setOrders(data);
      } else if (t === 'users') {
        const { data } = await getAllUsers();
        setUsers(data);
      } else if (t === 'products') {
        const { data } = await fetchProducts({});
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(tab); }, [tab]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) { alert('Failed to delete'); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, orderStatus: status } : o));
    } catch (err) { alert('Failed to update'); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) { alert('Failed to delete'); }
  };

  const statusClass = (s) => {
    if (s === 'delivered') return 'status-delivered';
    if (s === 'shipped')   return 'status-shipped';
    if (s === 'cancelled') return 'status-cancelled';
    return 'status-placed';
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <p className="text-secondary small px-3 mb-2 text-uppercase fw-bold" style={{ letterSpacing: '0.5px' }}>
          Admin Panel
        </p>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`nav-link border-0 w-100 text-start ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <i className={`bi ${t.icon}`}></i> {t.label}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-grow-1 p-4" style={{ background: '#f8fafc', minHeight: 'calc(100vh - 56px)' }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        )}

        {/* DASHBOARD */}
        {!loading && tab === 'dashboard' && (
          <>
            <h5 className="fw-bold mb-4">Dashboard Overview</h5>
            <div className="row g-3 mb-4">
              {[
                { icon: '📦', label: 'Total Products', value: stats.totalProducts ?? '-' },
                { icon: '🛒', label: 'Total Orders',   value: stats.totalOrders   ?? '-' },
                { icon: '👥', label: 'Total Users',    value: stats.totalUsers    ?? '-' },
                { icon: '💰', label: 'Revenue',        value: stats.revenue ? `₹${(stats.revenue/1000).toFixed(1)}K` : '-' },
              ].map((s) => (
                <div className="col-6 col-lg-3" key={s.label}>
                  <div className="stat-card">
                    <div style={{ fontSize: 32 }}>{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="text-muted small mt-1">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card border-0 shadow-sm rounded-3 p-4">
              <h6 className="fw-bold mb-3">Quick Actions</h6>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-primary btn-sm"   onClick={() => setTab('products')}>Manage Products</button>
                <button className="btn btn-warning btn-sm"   onClick={() => setTab('orders')}>View Orders</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setTab('users')}>Manage Users</button>
              </div>
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {!loading && tab === 'products' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Products ({products.length})</h5>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Add product form — connect to POST /api/products')}>
                <i className="bi bi-plus-lg me-1"></i> Add Product
              </button>
            </div>
            <div className="card border-0 shadow-sm rounded-3">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Icon</th><th>Title</th><th>Category</th>
                      <th>Price (₹)</th><th>Discount</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id}>
                        <td style={{ fontSize: 24 }}>{p.mainImg || '📦'}</td>
                        <td className="fw-semibold">{p.title}</td>
                        <td><span className="badge bg-light text-dark border">{p.category}</span></td>
                        <td className="fw-bold text-primary">₹{p.price.toLocaleString('en-IN')}</td>
                        <td><span className="text-success fw-bold">{p.discount}%</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p._id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan="6" className="text-center text-muted py-4">No products found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ORDERS */}
        {!loading && tab === 'orders' && (
          <>
            <h5 className="fw-bold mb-4">All Orders ({orders.length})</h5>
            <div className="card border-0 shadow-sm rounded-3">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th><th>Customer</th><th>Product</th>
                      <th>Amount</th><th>Status</th><th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id}>
                        <td className="fw-bold small">#{o._id.slice(-8).toUpperCase()}</td>
                        <td>
                          <div className="fw-semibold small">{o.name}</div>
                          <div className="text-muted" style={{ fontSize: 11 }}>{o.email}</div>
                        </td>
                        <td className="small">{o.title}</td>
                        <td className="fw-bold text-primary">₹{o.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`badge rounded-pill px-3 ${statusClass(o.orderStatus)}`}>
                            {o.orderStatus}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={o.orderStatus}
                            onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                            style={{ minWidth: 130 }}
                          >
                            <option value="order placed">Order Placed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr><td colSpan="6" className="text-center text-muted py-4">No orders found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* USERS */}
        {!loading && tab === 'users' && (
          <>
            <h5 className="fw-bold mb-4">All Users ({users.length})</h5>
            <div className="card border-0 shadow-sm rounded-3">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Avatar</th><th>Username</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td>
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                            style={{ width: 36, height: 36, fontSize: 14 }}
                          >
                            {u.username?.[0]?.toUpperCase()}
                          </div>
                        </td>
                        <td className="fw-semibold">{u.username}</td>
                        <td className="text-muted small">{u.email}</td>
                        <td>
                          <span className={`badge ${u.usertype === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                            {u.usertype}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {new Date(u.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td>
                          {u.usertype !== 'ADMIN' && (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(u._id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan="6" className="text-center text-muted py-4">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
