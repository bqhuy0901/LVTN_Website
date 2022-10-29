import React, { Fragment, useEffect } from "react";
import Slider from "../Slider/Slider"
import Product from "./Product";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData tilte="Shoes Shop" />
         <Slider />
          <h2 className="homeHeading">sản phẩm nổi bật</h2>
          <div className="container" id="container">
            {products && products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>

  );
};

export default Home;
