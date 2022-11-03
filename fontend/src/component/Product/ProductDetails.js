import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { Rating } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "../Product/ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    size: product.size,
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);

  const increaseQuatity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuatity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added to Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- SHOPSHOE`} />
          <div className="ProductDetails">
            <div>
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
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`${product.price}đ`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuatity}>-</button>
                    <input type="number" value={quantity} />
                    <button onClick={increaseQuatity}>+</button>
                  </div>

                  
                  <button onClick={addToCartHandler}>Thêm Vào Giỏ Hàng</button>
                </div>
                <p>
                  Trạng thái : 
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Hết Hàng" : "Sản phẩm có sẵn"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Mô Tả Sản Phẩm : <p>{product.description}</p>
              </div>

              <button className="submitReview">Nhập Đánh Giá</button>
            </div>
          </div>

          <h3 className="reviewsHeading">ĐÁNH GIÁ</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((reivew) => <ReviewCard reivew={reivew} />)}
            </div>
          ) : (
            <p className="noReviews">Không có đánh giá</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
