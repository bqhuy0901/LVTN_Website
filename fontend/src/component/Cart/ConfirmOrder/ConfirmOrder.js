import React, { Fragment } from "react";
import CheckoutSteps from "../CheckOutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../layout/MetaData";
import "../ConfirmOrder/ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 5000000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.ward}, ${shippingInfo.district}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  return (
    <Fragment>
      <MetaData title="Xác Nhận Đơn Hàng" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin Vận chuyển</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên Khách Hàng:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Các mặt hàng trong giỏ hàng của bạn:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {formatter.format(item.price)} ={" "}
                      <b>{formatter.format(item.price * item.quantity)}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Chi Tiết Hóa Đơn</Typography>
            <div>
              <div>
                <p>Tổng Phụ:</p>
                <span>{subtotal} đ</span>
              </div>
              <div>
                <p>Chi Phí Vận Chuyển:</p>
                <span>{shippingCharges} đ</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>{tax} đ</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Toàn Bộ:</b>
              </p>
              <span>{totalPrice} đ</span>
            </div>

            <button onClick={proceedToPayment}>Tiến Trình Thanh Toán</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
