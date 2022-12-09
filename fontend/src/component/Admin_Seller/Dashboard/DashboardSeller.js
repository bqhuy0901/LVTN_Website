import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import SidebarSeller from "../SidebarSeller/SidebarSeller";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSellerProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";

const DashboardSeller = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getSellerProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  return (
    <div className="dashboard">
      <SidebarSeller />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              TOTAL SALES: <span>{formatter.format(totalAmount)}</span>{" "}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/seller/products">
              <p>PRODUCTS</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/seller/orders">
              <p>ORDERS</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <h2>SALES STATISTAC</h2>
          <iframe
            style={{
              backgroundColor: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-ecomerce-rypfr/embed/charts?id=638ebaa3-fcb6-4c9f-8d3f-cb3645d4fb8f&maxDataAge=3600&theme=light&autoRefresh=true"
            title="SALES STATISTAC"
          ></iframe>
        </div>
        <div className="doughnutChart">
          <h2>PRODUCTS STATISTAC</h2>
          <iframe
            style={{
              backgroundColor: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-ecomerce-rypfr/embed/charts?id=638ebc63-a857-47a1-8763-3c86e4314fdb&maxDataAge=3600&theme=light&autoRefresh=true"
            title="PRODUCTS STATISTAC"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DashboardSeller;
