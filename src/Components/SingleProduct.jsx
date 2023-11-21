import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({products}) => {
  return (
    <div className="product-img">
      <Link to={`/product/${products.id}`}>
        <img
          className="img-default  w-100 md:h-[250px] "
          src={products.front_side}
          alt="Image"
          // style={{ height: "250px" }}
        />
        {/* <img
          className="img-hover text-center w-100 md:h-[250px]"
          src={products.front_side}
          alt="Image"
          // style={{ height: "250px" }}
        /> */}
        {/* <div className="first-view">

                <img src={products.front_side} alt="logo" className=" w-100"/>
              </div>
              <div className="hover-view">
                <img src={products.front_side} alt="logo" className="w-100"/>
              </div> */}
      </Link>
    </div>
  );
};

export default SingleProduct;
