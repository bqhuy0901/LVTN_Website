import React from "react";
import { Link } from "react-router-dom";
import "../CartItemCard/CartItemCard.css";
import ClearIcon from "@mui/icons-material/Clear";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 9,
});

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Cart Images" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`${formatter.format(item.price)}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>
          <ClearIcon fontSize="large" />
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
