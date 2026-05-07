import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addCartItem, removeCartItem, clearCartItems } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) { setCartItems([]); return; }
    try {
      const { data } = await getCartItems();
      setCartItems(data);
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (item) => {
    if (!user) return alert('Please login to add items to cart');
    try {
      const { data } = await addCartItem(item);
      setCartItems((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartItems();
      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
