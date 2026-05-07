import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar   from './components/Navbar/Navbar';
import Footer   from './components/Footer/Footer';
import Home     from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart     from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Profile  from './pages/Profile/Profile';
import Admin    from './pages/Admin/Admin';
import Login    from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.usertype === 'ADMIN' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/products"       element={<Products />} />
        <Route path="/products/:id"   element={<ProductDetail />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/cart"           element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout"       element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/profile"        element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin"          element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="*"               element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
