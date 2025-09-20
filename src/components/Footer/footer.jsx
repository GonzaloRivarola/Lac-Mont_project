import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Lac&Mont</h3>
          <p>
            Timeless luxury watches crafted for those who appreciate perfection.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@lacandmont.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>742 Evergreen Terrace, Springfield</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://X.com" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lac&Mont. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
