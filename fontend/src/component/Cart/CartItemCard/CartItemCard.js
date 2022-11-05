import React from "react";
import { Link } from "react-router-dom";
import "../CartItemCard/CartItemCard.css";
import { AiFillDelete } from "react-icons/ai";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Giá: ${item.price} đ`}</span>
        <p onClick={() => deleteCartItems(item.product)}>
          <AiFillDelete />
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
