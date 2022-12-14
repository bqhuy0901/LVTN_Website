import React, { useState, Fragment } from "react";
import MetaData from "../../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };

  return (
    <Fragment>
      <MetaData title="Tìm Kiếm Sản Phẩm --SHOESHOP" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
};

export default Search;
