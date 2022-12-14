import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  });

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <h3>{product.name}</h3>
      <div>
        <Rating {...options} />
        {""}
        <span className="productCardSpan">
          {""}
          {product.numberOfReviews} (Đánh giá)
        </span>
      </div>
      <div className="price">
        <ins className="text-underline">{`${formatter.format(
          product.price
        )}`}</ins>
      </div>
    </Link>
  );
};

export default ProductCard;
