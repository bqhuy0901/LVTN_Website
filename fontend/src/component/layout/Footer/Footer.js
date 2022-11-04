import React from "react";
import {
  FaPhoneAlt,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaEnvelope,
  FaMapMarkedAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          SN3AKER<span>VIBES</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">SN3AKER VIBES © 2022</p>
      </div>

      <div className="footer-center">
        <div>
          <FaMapMarkedAlt />
          <p>
            <span>180 Cao Lỗ</span> Phường 4, Quận 8, Thành phố Hồ Chí Minh
          </p>
        </div>

        <div>
          <FaPhoneAlt />
          <p>090xxxxxx</p>
        </div>

        <div>
          <FaEnvelope />
          <p>
            <a href="mailto:support@company.com">support@company.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About </span>
          Được ra đời từ năm 2013 với mong muốn đem lại cho các bạn đam mê túc
          cầu giáo những đôi giày bóng đá chính hãng “CHẤT NHẤT” với giá cả “TỐT
          NHẤT” thị trường, từ những thương hiệu hàng đầu thế giới như NIKE,
          ADIDAS, PUMA, MIZUNO, ASICS, DESPORTE, JOMA, ATHLETA, X-MUNICH, GRAND
          SPORT, KAMITO v.v…
        </p>

        <div className="footer-icons">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
