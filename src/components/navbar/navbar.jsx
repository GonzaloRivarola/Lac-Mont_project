import { useState, useEffect } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_black.png";

import "./Navbar.css";

function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      const timeout = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  return (
    <header className="navbar-container">
      
      <nav className="navbar1">
        <ul className="nav-options1">
          <li><Link to="/about">About Lac&Mont</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/">Z&M Corporate</Link></li>
        </ul>
      </nav>

      
      <nav className="navbar2">
        
        <div className="logo_container">
          <Link to="/"><img src={logo} alt="Logo" className="navbar-logo" /></Link>
        </div>

        
        <ul className="nav-options2">
          <li><Link to="/products/Zermatt">Zermatt Colection</Link></li>
          <li><Link to="/products/s-watches">S-Watches</Link></li>
          <li><Link to="/products/diamond">Diamond</Link></li>
          <li><Link to="/products/white-gold">White Gold</Link></li>
        </ul>

       
        <div className="cart-desktop cart-wrapper">
          <Link to="/cart" className={`cart-link ${animateCart ? "cart-animate" : ""}`} aria-label="Ir al carrito">
            <BsCartPlusFill className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>

          {cart.length > 0 && (
            <div className="cart-dropdown">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="cart-item-preview">
                  <span>{item.name}</span>
                  <span>{item.quantity} × ${item.price}</span>
                </div>
              ))}
              {cart.length > 3 && <p className="ver-mas">+{cart.length - 3} más...</p>}
              <Link to="/cart" className="ver-carrito-btn">Ver carrito</Link>
            </div>
          )}
        </div>

        
        <div className="cart-menu-mobile">
          <div className="cart-icon">
            <Link to="/cart" className={`${animateCart ? "cart-animate" : ""}`}>
              <BsCartPlusFill />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>

       
        <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu}>
          <ul className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <li><Link to="/products/Zermatt" onClick={closeMenu}>Zermatt Colection</Link></li>
            <li><Link to="/products/s_watches" onClick={closeMenu}>S-Watches</Link></li>
            <li><Link to="/products/diamond" onClick={closeMenu}>Diamond</Link></li>
            <li><Link to="/products/white_gold" onClick={closeMenu}>White Gold</Link></li>
          </ul>
        </div>
      </nav>

     
      <div className="navbar3">
        <p className="header-add">Perfect solution for everyone</p>
      </div>
    </header>
  );
}

export default Navbar;
