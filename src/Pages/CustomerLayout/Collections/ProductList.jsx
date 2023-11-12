import {
  faHeart,
  faShare,
  faShoppingCart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SingleProduct from "../../../Components/SingleProduct";
import { increment } from "../../../Zustand/cartStore";
import { toast } from "react-toastify";
import cloth from "../../../Assets/LandingPageImages/Cloth.jpg";
import axios from "axios";
import { loginStore } from "../../../Zustand/loginStore";
import { favourite } from "../../../Zustand/wishListStore";
import { useCurrencyStore } from "../../../Zustand/currency";

const ProductList = ({ productsData }) => {
  const state2 = loginStore((state) => state?.login);

  // const [productData, setProductData] = useState(productsData)

  console.log("NEW CHECK", productsData);
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)
  const currencyCode = useCurrencyStore((state) => state?.currencyCode)

  //   const getProduct = async ()=>{
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/product/shop-mapping?category='all'&subcategory='all'&search=''&price='highToLow'`);
  //   console.log(response.data.data,"shop mapping")
  //   setProductData(response?.data?.data)
  // }

  useEffect(() => {
    // getProduct()
  }, [productsData,currencyCode]);
  
  // const notify = (category) =>{
  //   increment(category,state2?.id)
  // }
  const navigate = useNavigate();

  const handleAddToCartInShop = (product, state2) => {
    if (state2?.id) {
      console.log(state2?.id, "state2");
      increment(product, state2);
    } else {
      console.log("imHere in productPge");
      toast("User Needs to Login", { draggable: true });
      navigate("/userLogin");
    }
  };

  const handleFavDataInShop = (products, state2) => {
    if (state2?.id) {
      favourite(products, state2);
    } else {
      toast("User Needs To Login", { draggable: true });
      navigate("/userLogin");
    }
  };

  return (
    <>
      <section className="product">
        <div className="grid gap-3 md:grid-cols-4 grid-cols-1  ">
          {productsData?.map((listitem) => (
            <div className=" ps-3 pe-3 mb-4 border-2 border" key={listitem.id}>
              <div className="product-item wow fadeInUp">
                <div className="product-img">
                  <span className="product-label">
                    {listitem.new ? "new" : "best"}
                  </span>
                  <SingleProduct products={listitem} />
                  <ul className="product-icon">
                    {/* <li>
                        <FontAwesomeIcon icon={faShare} />
                    </li> */}
                    <li>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleFavDataInShop(listitem, state2)}
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAddToCartInShop(listitem, state2)}
                      />
                    </li>
                  </ul>
                </div>
                <div className="product-content">
                  <div className="rating-price">
                    <ul className="ratings active">
                      {[...Array(Number(listitem.total_rating))].map((_, index) => (
                        <li key={index} className="star">
                          <FontAwesomeIcon icon={faStar} />
                        </li>
                      ))}
                    </ul>

                    <div className="product-price">
                      {currencyCode?.symbol}{currencyConversion(listitem.selling_price)}
                    </div>
                  </div>
                  <div className="product-title-price-old">
                    <a href="product-detail.html">{listitem.name}</a>
                    <div
                      className="product-price text-decoration-line-through"
                      style={{ color: "#777" }}
                    >
                      {currencyCode?.symbol}{listitem.mrp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
