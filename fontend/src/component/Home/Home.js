import React, { Fragment, useEffect } from "react";
import Product from "./Product";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import Slider from "../Slider/Slider";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

 
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Home;
