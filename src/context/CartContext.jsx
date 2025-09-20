import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, quantity);

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        const newQty = existingProduct.quantity + qtyToAdd;

        
        if (newQty > product.stock) {
          alert("Out of stock");
          return prevCart; 
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      }

    
      if (qtyToAdd > product.stock) {
        alert("Out of stock");
        return prevCart;
      }

      return [...prevCart, { ...product, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    const qty = Math.max(1, quantity);

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
         
          if (qty > item.stock) {
            alert("Out of Stock");
            return item; 
          }
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const emptyCart = () => {
    setCart([]);
  };

  const checkout = () => {
    const orderId = `ORD-${Date.now()}`;
    console.log(`Order ID: ${orderId}`);
    emptyCart();
    return orderId;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        emptyCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
