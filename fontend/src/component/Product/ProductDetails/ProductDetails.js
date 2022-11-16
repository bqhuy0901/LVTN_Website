import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { Rating } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../../actions/productAction";
import Loader from "../../layout/Loader/Loader";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import { addItemsToCart } from "../../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../../constans/productConstans";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LabTabs from "../LabTabs/LabTabs";
import { Link } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Đã Thêm Sản Phẩm Vào Giỏ Hàng");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đánh giá đã được gửi thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- SHOPSHOE`} />
          <div className="ProductDetails">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Đánh giá)</span>
              </div>

              <div className="detailsBlock-2-2">
                <ul className="detailsBlock-2-2-ul">
                  <li className="detailsBlock-2-2-li">
                    Loại : <span>{product.category}</span>
                  </li>
                  <li className="detailsBlock-2-2-li">
                    Thương hiệu : <span>{product.brand}</span>
                  </li>
                </ul>
              </div>

              <div className="detailsBlock-3">
                <h1>{`${formatter.format(product.price)}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <label>Số lượng</label>
                    <button onClick={decreaseQuantity}>
                      <RemoveIcon />
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>
                      <AddIcon />
                    </button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <p>
                  Trạng thái :
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Hết Hàng" : "Còn Hàng"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Mô Tả Sản Phẩm : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Nhập đánh giá
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">ĐÁNH GIÁ</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Nhập Đánh Giá</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          <div className="TabContainer">
            <LabTabs />
          </div>

          <h2 className="homeHeading">sản phẩm liên quan</h2>

          <div className="product_seeMore">
            <Link to="/products">Xem Thêm</Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
