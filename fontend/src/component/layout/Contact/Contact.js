import React, { Fragment } from "react";
import "./Contact.css";
import { Typography } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="contactSection">
      <div></div>
      <div className="contactSectionGradient"></div>
      <div className="contactSectionContainer">
        <Typography component="h1">Connect with Us</Typography>
        <div>
          <div>
            <LocationOnIcon />
            <p>LOCATION</p>
            <span>180 Cao Lỗ, Phường 4,Quận 8,Thành Phố Hồ Chí Minh.</span>
            <br></br>
            <p>CONNECT US</p>
            <span className="icons">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </span>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15679.817641153899!2d106.6778321!3d10.7379972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1668074788149!5m2!1svi!2s"
              width="600"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Dia chi Cua hang"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
