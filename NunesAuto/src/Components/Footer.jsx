import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section footer-info">
        <h3>NunesAuto</h3>
        <p>Your one-stop shop for affordable and reliable car parts. We've got you covered.</p>
        <p>&copy; 2025 NunesAuto. All rights reserved.</p>
      </div>
      
      {/* Quick Links section has been removed */}

      <div className="footer-section footer-contact">
        <h4>Contact Us</h4>
        <p>Email: <a href="#">info@nunesauto.com</a></p>
        <p>Phone: +27 098 1234</p>
      </div>

      <div className="footer-section footer-social">
        <h4>Follow Us</h4>
        <div className="social-icons">
          {/* Replace with actual icons or SVGs */}
          <a href="#"><i className="fab fa-facebook-f"></i>Facebook</a>
          <a href="#"><i className="fab fa-twitter"></i>Twitter</a>
          <a href="#"><i className="fab fa-instagram"></i>Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;