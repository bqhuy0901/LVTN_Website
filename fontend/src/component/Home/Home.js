import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Product from "./Product";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <Fragment>
        <MetaData tilte="HOME PAGE IS WORKING" />
        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
          {products && products.map((product) => <Product product={product} />)}
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Home;
