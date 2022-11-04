import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../assets/images/logo.png";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      BurgerIcon={true}
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      logoHeight="unset"
      navColor1="white"
      logoHoverSize="15px"
      logoHoverColor="#eb4034"
      link1Text="Trang Chủ"
      link2Text="Sản Phẩm"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.2vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      link1Family="Roboto"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      searchIcon={true}
      SearchIconElement={FaSearch}
      searchIconColor="rgba(35, 35, 35,0.8)"
      searchIconUrl="/search"
      searchIconMargin="2"
      searchIconColorHover="#eb4034"
      cartIcon={true}
      CartIconElement={FaShoppingCart}
      cartIconColor="rgba(35, 35, 35,0.8)"
      cartIconUrl="/cart"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      profileIcon={true}
      ProfileIconElement={FaUserCircle}
      profileIconUrl="/login"
      profileIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
    />
  );
};

export default Header;
