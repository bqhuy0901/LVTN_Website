import React, { Fragment, useEffect } from "react";

import Product from "./ProductCard";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import Slider from "../Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from '../layout/Loader/Loader'
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

 
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {
        loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData tilte="HOME PAGE IS WORKING" />
            <Slider />

            <h2 className="homeHeading">sản phẩm nổi bật</h2>
            <div className="container" id="container">
              {products && products.map((product) => <Product product={product} />)}
            </div>

            <h2 className="homeHeading">sản phẩm Sales</h2>
            <div className="container" id="container">
              {products && products.map((product) => <Product product={product} />)}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

export default Home;
