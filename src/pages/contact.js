import React from "react";
import "../styles/style.css"; // Use your styles or add new

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach us using the details below:</p>

      <div className="contact-box">
        <div>
          <h4>📍 Address</h4>
          <p>123 Maple Street<br />Springfield, 12345</p>
        </div>
        <div>
          <h4>📧 Email</h4>
          <p>support@example.com</p>
        </div>
        <div>
          <h4>📞 Phone</h4>
          <p>1234567890</p>
        </div>
        <div>
          <h4>Follow us</h4>
          <p>
            <a href="#">Instagram</a> | <a href="#">YouTube</a> | <a href="#">TikTok</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
