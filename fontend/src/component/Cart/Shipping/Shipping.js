import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../actions/cartAction";
import MetaData from "../../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import { useAlert } from "react-alert";
import CheckoutSteps from "../CheckOutSteps/CheckoutSteps";
import "../Shipping/Shipping.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [ward, setWard] = useState(shippingInfo.ward);
  const [district, setDistrict] = useState(shippingInfo.district);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [listCity, setListCity] = useState();
  const [listDistrict, setListDistrict] = useState();
  const [listWard, setListWard] = useState();
  const [code, setCode] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCity = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://provinces.open-api.vn/api/p?depth=2"
      );
      const data = res.data;
      var lDistrict = [];
      var lWard = [];
      if (city && data) {
        const item = data.find((c) => c.name === city);
        if (item && item.code) {
          const resDistrict = await axios.get(
            `https://provinces.open-api.vn/api/p/${item.code}?depth=2`
          );
          lDistrict = resDistrict.data.districts;
          if (lDistrict.length > 0 && district) {
            const itemDistrict = lDistrict.find((d) => d.name === district);
            if (itemDistrict && itemDistrict.code) {
              const resWard = await axios.get(
                `https://provinces.open-api.vn/api/d/${itemDistrict.code}?depth=2`
              );
              lWard = resWard.data.wards;
            }
          }
        }
      }
      setLoading(false);
      setListCity(data);
      setListDistrict(lDistrict);
      setListWard(lWard);
    };
    getCity();
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${code.city}?depth=2`
      );
      setListDistrict(res.data.districts);
    };
    getDistrict();
  }, [city]);

  useEffect(() => {
    const getWard = async () => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${code.district}?depth=2`
      );
      setListWard(res.data.wards);
    };
    getWard();
  }, [district]);
  const handleChangeCity = (e) => {
    var strCityName = "";
    var strCityCode = "";
    if (e.target.value !== "") {
      const arrValue = e.target.value.split("-");
      strCityName = arrValue[0];
      strCityCode = arrValue[1];
    }
    setCity(strCityName);
    setListDistrict([]);
    setListWard([]);
    setCode((code) => {
      return { ...code, city: strCityCode };
    });
  };
  const handleChangeDistrict = (e) => {
    var strDistrictName = "";
    var strDistrictCode = "";
    if (e.target.value !== "") {
      const arrValue = e.target.value.split("-");
      strDistrictName = arrValue[0];
      strDistrictCode = arrValue[1];
    }
    setDistrict(strDistrictName);
    setCode((code) => {
      return { ...code, district: strDistrictCode };
    });
  };

  const handleChangeWard = (e) => {
    var strWardName = "";
    var strWardCode = "";
    if (e.target.value !== "") {
      const arrValue = e.target.value.split("-");
      strWardName = arrValue[0];
      strWardCode = arrValue[1];
    }
    setWard(strWardName);
  };
  
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (!regex.test(phoneNo)) {
      alert.error(
        "Số điện thoại không hợp lệ (độ dài từ 8 - 11 ký tự, không chứa ký tự đặc biệt và khoảng trắng)"
      );
      return;
    }
    dispatch(saveShippingInfo({ address, city, ward, district, phoneNo }));
    history.push("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Thông tin giao hàng</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Địa chỉ"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              {loading ? (
                <CircularProgress />
              ) : (
                <select name="city" onChange={handleChangeCity} required>
                  <option value={""} selected>
                    Chọn thành phố
                  </option>
                  {listCity?.map((c) => {
                    return (
                      <option
                        value={c.name + "-" + c.code}
                        selected={c.name === city ? true : ""}
                      >
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div>
              <LocationCityIcon />
              {loading ? (
                <CircularProgress />
              ) : (
                <select
                  name="district"
                  onChange={handleChangeDistrict}
                  required
                >
                  <option value={""} selected>
                    Chọn quận huyện
                  </option>
                  {listDistrict?.map((d) => {
                    return (
                      <option
                        value={d.name + "-" + d.code}
                        selected={d.name === district ? true : ""}
                      >
                        {d.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div>
              <LocationCityIcon />
              {loading ? (
                <CircularProgress />
              ) : (
                <select name="ward" onChange={handleChangeWard} required>
                  <option value={""} selected>
                    Chọn phường xã
                  </option>
                  {listWard?.map((w) => {
                    return (
                      <option
                        value={w.name + "-" + w.code}
                        selected={w.name === ward ? true : ""}
                      >
                        {w.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="SĐT"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <input
              type="submit"
              value="Tiếp tục đến phương thức thanh toán"
              className="shippingBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
