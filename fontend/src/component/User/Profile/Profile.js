import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../layout/MetaData";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var today = new Date(user.createAt);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name} Profile`} />
          <div className="profileContainer">
            <div>
              <h1>HỒ SƠ</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Sửa Thông Tin</Link>
            </div>
            <div>
              <div>
                <h4>Tên Đầy Đủ</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Đã tham gia</h4>
                <p>{today.toLocaleDateString("vi-VN", options)}</p>
              </div>

              <div>
                <Link to="/orders">Đơn Hàng Của Tôi</Link>
                <Link to="/password/update">Thay Đổi Mật Khẩu</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
