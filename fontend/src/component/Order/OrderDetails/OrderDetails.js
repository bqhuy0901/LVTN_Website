import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../../layout/MetaData";
import { getOrderDetails, clearErrors } from "../../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../../../component/layout/Loader/Loader";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Đơn Hàng #{order && order._id}
              </Typography>
              <Typography>Thông Tin Vận Chuyển</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Họ và Tên:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>SĐT:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa Chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}`}
                  </span>
                </div>
              </div>
              <Typography>Thanh Toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Tổng Tiền:</p>
                  <span className="price">
                    {formatter.format(order.totalPrice && order.totalPrice)}
                  </span>
                </div>
              </div>

              <Typography>Tình Trạng Đặt Hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Các Sản Phẩm Đặt Hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span className="price">
                        {item.quantity} X {formatter.format(item.price)} ={" "}
                        <b>{formatter.format(item.price * item.quantity)}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
