import React from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Cart.css";

const CartPage = ({ recommendedProducts }) => {
  const { cart, updateQuantity, removeFromCart, emptyCart, checkout } = useCart();

  const handleQuantityChange = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty > 0) updateQuantity(id, newQty);
  };

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const orderId = checkout();
    alert(`Purchase completed. Order ID: ${orderId}`);
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <img src="https://res.cloudinary.com/duyofvkt2/image/upload/v1758029064/cart_xz4yug.png" alt="Empty cart" />

        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => {
              const price = Number(item.price) || 0;
              return (
                <div key={item.id} className="cart-item">
                  {item.image && <img src={item.image} alt={item.name} />}
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">Price: ${price.toFixed(2)}</p>
                    <div className="quantity-wrapper">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <p className="item-subtotal">Subtotal: ${(price * item.quantity).toFixed(2)}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total: <strong>${total.toFixed(2)}</strong></p>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            <button className="empty-btn" onClick={emptyCart}>Empty Cart</button>
          </div>
        </div>
      )}

      {recommendedProducts && recommendedProducts.length > 0 && (
        <div className="recommended-section">
          <h2>Recommended Products</h2>
          <div className="recommended-grid">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
