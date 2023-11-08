import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({products}) => {
  return (
    <div>
      <Link to={`/product/${products.id}`}>
        <img
          className="img-default  w-100 "
          src={products.front_side}
          alt="Image"
          style={{ height: "250px" }}
        />
        <img
          className="img-hover text-center w-100"
          src={products.front_side}
          alt="Image"
          style={{ height: "250px" }}
        />
      </Link>
    </div>
  );
};

export default SingleProduct;
