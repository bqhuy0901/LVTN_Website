import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { Line, Doughnut } from "react-chartjs-2";
import { getAllUsers } from "../../../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Số tiền ban đầu", "Số tiền kiếm được"],
    datasets: [
      {
        label: "TỔNG CỘNG",
        backgroundColor: ["rgba(255, 82, 82,1.0)"],
        hoverBackgroundColor: ["rgba(255, 82, 82,1.0)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#e74c3c", "#2ecc71"],
        hoverBackgroundColor: ["#e74c3c", "#2ecc71"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng cộng: <span>{formatter.format(totalAmount)}</span>{" "}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>PRODUCTS</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>ORDERS</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>USERS</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
