import React from "react";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

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

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">SN3AKER VIBES © 2022</p>
      </div>

      <div className="footer-center">
        <div>
          <AddLocationAltIcon />
          <p>
            <span>180 Cao Lỗ</span> Phường 4, Quận 8, Thành phố Hồ Chí Minh
          </p>
        </div>

        <div>
          <PhoneIcon />
          <p>090xxxxxx</p>
        </div>

        <div>
          <MailOutlineIcon />
          <p>
            <a href="mailto:shoeshop@gmail.com">shoeshop@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About </span>
          Được ra đời từ năm 2022 với mong muốn đem lại cho các bạn đam mê túc
          cầu giáo những đôi giày bóng đá chính hãng “CHẤT NHẤT” với giá cả “TỐT
          NHẤT” thị trường, từ những thương hiệu hàng đầu thế giới như NIKE,
          ADIDAS, PUMA, MIZUNO, ASICS, DESPORTE, JOMA, ATHLETA, X-MUNICH, GRAND
          SPORT, KAMITO v.v…
        </p>

        <div className="footer-icons">
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <TwitterIcon />
          </a>
          <a href="#">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
