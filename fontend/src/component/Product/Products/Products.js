import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Loader from "../../layout/Loader/Loader";
import ProductCard from "../../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

const categories = [
  "Giày Cỏ Nhân Tạo",
  "Giay Bóng rổ",
  "Giày Fusal",
  "Giày Chạy bộ",
];

const brands = ["Nike", "Adidas", "Puma", "Mizuno", "....."];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 5000000]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [ratings, setRatings] = useState(0);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, brand, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    brand,
    ratings,
    alert,
    error,
  ]);

  let count = filteredProductsCount;

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="SẢN PHẨM " />
          <h2 className="productsHeading">Sản phẩm</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          
          <div className="filterBox">
            <button className="refreshPage" type="button" onClick={refreshPage}>
              CLEAR FILTERS
            </button>
            <Typography component="h1">Mức giá</Typography>

            <Slider
              aria-label="Temperature"
              defaultValue={[500000, 5000000]}
              value={price}
              valueLabelDisplay="auto"
              step={500000}
              marks
              min={500000}
              max={5000000}
              onChange={priceHandler}
            />

            <Typography component="h1">Loại Giày</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Typography component="h1">Thương Hiệu</Typography>
            <ul className="categoryBox">
              {brands.map((brand) => (
                <li
                  className="category-link"
                  key={brand}
                  onClick={() => setBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText=<ArrowForwardIosIcon />
                prevPageText=<ArrowBackIosNewIcon />
                firstPageText=<FirstPageIcon />
                lastPageText=<LastPageIcon />
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
