import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'orders';

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusClass = (s) => {
    if (s === 'delivered') return 'status-delivered';
    if (s === 'shipped')   return 'status-shipped';
    if (s === 'cancelled') return 'status-cancelled';
    return 'status-placed';
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 p-4 text-center">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: 72, height: 72, fontSize: 28, fontWeight: 700 }}
            >
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <h6 className="fw-bold mb-0">{user?.username}</h6>
            <p className="text-muted small mb-3">{user?.email}</p>
            <span className={`badge ${user?.usertype === 'ADMIN' ? 'bg-danger' : 'bg-primary'} mb-4`}>
              {user?.usertype}
            </span>
            <div className="d-flex flex-column gap-1">
              {[
                { key: 'orders',   icon: 'bi-bag-check',     label: 'My Orders' },
                { key: 'settings', icon: 'bi-gear',           label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.key}
                  className={`btn btn-sm text-start ${tab === item.key ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setSearchParams({ tab: item.key })}
                >
                  <i className={`bi ${item.icon} me-2`}></i>{item.label}
                </button>
              ))}
              <button className="btn btn-sm btn-outline-danger text-start" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            {tab === 'orders' && (
              <>
                <h5 className="fw-bold mb-4">My Orders</h5>
                {loading ? (
                  <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-bag-x fs-1"></i>
                    <p className="mt-3">No orders placed yet.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="border rounded-3 p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold small">#{order._id.slice(-8).toUpperCase()}</span>
                        <span className={`badge rounded-pill px-3 ${statusClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="mb-1 fw-semibold">{order.title}</p>
                      <p className="text-muted small mb-1">
                        Size: {order.size} | Qty: {order.quantity} | Payment: {order.paymentMethod}
                      </p>
                      <p className="text-muted small mb-1">
                        <i className="bi bi-geo-alt me-1"></i>{order.address}, {order.pincode}
                      </p>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="text-muted small">
                          <i className="bi bi-calendar me-1"></i>{order.orderDate}
                          {order.deliveryDate && ` → ${order.deliveryDate}`}
                        </span>
                        <span className="price-current fw-bold">₹{order.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {tab === 'settings' && (
              <>
                <h5 className="fw-bold mb-4">Account Settings</h5>
                <div className="row g-3" style={{ maxWidth: 480 }}>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Username</label>
                    <input className="form-control" defaultValue={user?.username} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Email</label>
                    <input className="form-control" defaultValue={user?.email} readOnly />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">New Password</label>
                    <input className="form-control" type="password" placeholder="••••••••" />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" onClick={() => alert('Settings saved!')}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
