import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constans/userConstans";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const columns = [
    { field: "id", headerName: "Users ID", minWidth: 200, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      let today = new Date(item.createAt);
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
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
      alert.success(message);
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, history, message]);

  return (
    <Fragment>
      <MetaData title={`TẤT CẢ CÁC USERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">TẤT CẢ CÁC USERS</h1>

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

export default UsersList;
