import React from "react";
import "./OrderSuccess.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Đơn hàng của bạn đã được đặt thành công</Typography>
      <Link to="/orders">Xem đơn đặt hàng</Link>
    </div>
  );
};

export default OrderSuccess;
