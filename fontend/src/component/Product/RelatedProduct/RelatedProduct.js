import React, { useEffect } from "react";
import "./RelatedProduct.css";
import ProductCard from "../../Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getRelatedProduct } from "../../../actions/productAction";

const RelatedProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRelatedProduct());
  }, [dispatch, error, alert]);

  return (
    <div className="products">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default RelatedProduct;
