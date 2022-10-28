import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Product from "./Product";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
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
          <p>Chào mừng bạn đến với Huy Khôi Shoes</p>
          <h1>TÌM HIỂU SẢN PHẨM TUYỆT VỜI DƯỚI ĐÂY</h1>

          <a href="#container">
            <button>
              Tìm hiểu <CgMouse />
            </button>
          </a>
        </div>

        <h2 className="homeHeading">sản phẩm nổi bật</h2>
        <div className="container" id="container">
          {products && products.map((product) => <Product product={product} />)}
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Home;
