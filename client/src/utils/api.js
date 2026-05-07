import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach token to every request if present
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser  = (data) => API.post('/auth/register', data);
export const loginUser     = (data) => API.post('/auth/login', data);
export const getProfile    = ()     => API.get('/auth/profile');

// Products
export const fetchProducts    = (params) => API.get('/products', { params });
export const fetchProductById = (id)     => API.get(`/products/${id}`);
export const createProduct    = (data)   => API.post('/products', data);
export const updateProduct    = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct    = (id)     => API.delete(`/products/${id}`);

// Cart
export const getCartItems    = ()     => API.get('/cart');
export const addCartItem     = (data) => API.post('/cart', data);
export const removeCartItem  = (id)   => API.delete(`/cart/${id}`);
export const clearCartItems  = ()     => API.delete('/cart/clear');

// Orders
export const placeOrder          = (data) => API.post('/orders', data);
export const getMyOrders         = ()     => API.get('/orders/myorders');
export const getAllOrders         = ()     => API.get('/orders');
export const updateOrderStatus   = (id, status) => API.put(`/orders/${id}`, { orderStatus: status });

// Admin
export const getDashboardStats = () => API.get('/admin/stats');
export const getAllUsers        = () => API.get('/admin/users');
export const deleteUser        = (id) => API.delete(`/admin/users/${id}`);
