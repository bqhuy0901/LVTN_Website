import React from "react";
import { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "../Cart/CartItemCard/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);


  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };


  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };


  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });


  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>Không có sản phẩm nào trong giỏ hàng của bạn</Typography>
          <Link to="/products">Xem Sản phẩm</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Sản Phẩm</p>
              <p>Số Lượng</p>
              <p>Tổng phụ</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${formatter.format(
                    item.price * item.quantity
                  )} `}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Tổng Tiền</p>
                <p style={{ color: "red" }}>{`${formatter.format(
                  cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )
                )} `}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Thanh Toán</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
