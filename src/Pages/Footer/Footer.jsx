import React from "react";
import "../Styles/Footer.css";
function Footer() {
  return (
    <div className="Footer">
      <div className="Footer-first-box">
        <div className="Footer-first">123 Anywhere St., Any City, ST 12345</div>
      </div>
      <div className="middle">
        <div className="middle-data">
          <div className="Middle-data-main">
            <div>About Us</div>
            <div>How It Works</div>
            <div>Contact Us</div>
            <div>Blog & News</div>
          </div>
          <div className="Middle-data-main">
            <div>Terms</div>
            <div>How It Works</div>
            <div>Contact Us</div>
            <div>Blog & News</div>
          </div>
          <div className="Middle-data-main">
            <div>Social Media</div>
            <div>How It Works</div>
            <div>Contact Us</div>
            <div>Blog & News</div>
          </div>
        </div>
        <div>@2024 Hanenova. All Rights Reserved</div>
      </div>
      <div className="Footer-last-box">
        <div className="Footer-last">
          We are ready to <span> help you</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
