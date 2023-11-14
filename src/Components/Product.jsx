import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../Styles/LandingPage/Product.css";
import SingleProduct from "./SingleProduct";
import { favourite } from "../Zustand/wishListStore";
import { increment } from "../Zustand/cartStore";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginStore } from "../Zustand/loginStore";

const Product = ({ products }) => {
  const navigate = useNavigate();
  console.log(products, "Products");
  const state2 = loginStore((state) => state.login);

const handleAddToCart = (product,state2) => {
  if (state2?.id) {
    console.log(state2?.id,"state2")
    increment(product, state2);
  } else {
    console.log("imHere in productPge")
    toast("User Needs to Login", { draggable: true });
    navigate("/userLogin");
  }
};


const handleFavData = (products, state2)=>{
  if (state2?.id) {
    favourite(products, state2);
  } else {
    toast("User Needs To Login", { draggable: true });
    navigate("/userLogin");
  }
} 

  return (
    <div className="container-lg p-0">
      <div className="row" data-aos="fade-up" data-aos-duration="1000">
        {products?.map((product) => (
          <div className="col-md-3 col-6 mb-md-0 mb-4" key={product.id}>
            <div className="product-item wow fadeInUp seller-item">
              <div className="product-img">
                <span className="product-label color-1">{product.new}</span>
                <SingleProduct products={product} />
                <div>
                  <ul className="product-icon ">
                    <li>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ cursor: "pointer" }}
                        onClick={ ()=>
                         handleFavData(product,state2)
                        }
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ cursor: "pointer" }}
                        onClick={ ()=>handleAddToCart(product, state2)}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-content">
                <div className="rating-price">
                  <ul className="ratings">
                    {[...Array(product.rating)].map((_, index) => (
                      <li key={index} className="star">
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                    ))}
                  </ul>
                  <div className="product-price">${product.selling_price}</div>
                </div>
                <div className="product-title-price-old text-xs">
                  {product.name}
                  <div className="product-price-old text-xs">
                    ${product.mrp}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
