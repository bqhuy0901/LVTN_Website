import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import SidebarSeller from "../SidebarSeller/SidebarSeller";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DELETE_ORDER_RESET } from "../../../constans/orderConstain";
import {
  deleteOrderSeller,
  getAllOrdersSeller,
  clearErrors,
} from "../../../actions/orderAction";

const OrderListSeller = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderSeller(id));
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const columns = [
    { field: "id", headerName: "ID Đơn Hàng", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Trạng Thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: Number,
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Total Price",
      type: Number,
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
      type: Date,
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/seller/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      let today = new Date(item.createdAt);
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: formatter.format(item.totalPrice),
        date: today.toLocaleDateString("vi-VN", options),
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Đơn Hàng đã được xóa thành công !!!");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrdersSeller());
  }, [dispatch, alert, error, history, deleteError, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`TẤT CẢ CÁC ĐƠN HÀNG - Admin`} />

      <div className="dashboard">
        <SidebarSeller />
        <div className="productListContainer">
          <h1 id="productListHeading">TẤT CẢ CÁC ĐƠN HÀNG</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderListSeller;
