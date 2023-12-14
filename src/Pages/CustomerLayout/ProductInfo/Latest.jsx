import {
  faHeart,
  faShare,
  faShoppingCart,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import newImg from "../../../Assets/LandingPageImages/product-35.jpg";
import newImg2 from "../../../Assets/LandingPageImages/product-35.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SingleProduct from "../../../Components/SingleProduct";
import { toast } from "react-toastify";
import { increment } from "../../../Zustand/cartStore";
import { favourite } from "../../../Zustand/wishListStore";
import { loginStore } from "../../../Zustand/loginStore";
import axios from "axios";
import { useCurrencyStore } from "../../../Zustand/currency";

const Latest = () => {
  const Navigate = useNavigate();
  const Latest = [
    {
      id: 1,
      title: " Floral-print flowy blouse",
      price: "₹306.50",
      rating: 5,
      imageURL: newImg,
      color: "yes",
    },
    {
      id: 2,
      title: "Cloth",
      price: "₹306.50",
      rating: 4,
      imageURL: newImg,
      //   color: none,
    },
    {
      id: 3,
      title: " Floral-print flowy blouse",
      price: "₹306.50",
      rating: 2.5,
      imageURL: newImg,
      color: "yes",
    },
    {
      id: 4,
      title: "Cloth",
      price: "₹306.50",
      rating: 5,
      imageURL: newImg,
      color: "yes",
    },
  ];

  const [newArrival, setNewArrival] = useState([]);
  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)

  useEffect(() => {
    getNewArrivals();
  }, []);

  const getNewArrivals = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/landingpage/get-new-arrivals`
    );

    console.log(response?.data?.data);
    if (response?.data?.statusCode == 200) {
      setNewArrival(response?.data?.data);
    }
  };

  const state2 = loginStore((state) => state.login);

  const handleAddToCartInShop = (product, state2) => {
    if (state2?.id) {
      // console.log(state2?.id, "state2");
      increment(product, state2);
    } else {
      // console.log("imHere in productPge");
      toast("User Needs to Login", { draggable: true });
      Navigate("/userLogin");
    }
  };

  const handleFavDataInShop = (products, state2) => {
    if (state2?.id) {
      favourite(products, state2);
    } else {
      toast("User Needs To Login", { draggable: true });
      Navigate("/userLogin");
    }
  };


  return (
    <section className="product themesflat-section style-4 mb-5 mt-3 container-md">
      <div className="container-md">
        <h3 className="themesflat-heading wear-with mt-md-5">Latest</h3>
        <div className="row">
          {newArrival?.map((latest) => (
            <div className="col-md-3" key={latest.id}>
            <div className="product-single-card">
              <div className="product-top-area">
                <div className="product-discount -z-10">{latest.new}</div>
                <Link to={`/product/${latest.id}`}>
                  <div className="product-img">
                    <div className="first-view">
                      <img src={latest.front_side} alt="logo" className="" />
                    </div>
                    <div className="hover-view">
                      <img src={latest.front_side} alt="logo" className="" />
                    </div>
                  </div>
                </Link>
                {/* <ul className="product-icon">
                    <li>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          notify5(latest);
                        }}
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faShoppingCart}
                        onClick={() => {
                          notify4(latest);
                        }}
                      />
                    </li>
                  </ul> */}
                <div className="sideicons">
                  <button className="sideicons-btn">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFavDataInShop(latest,state2)}
                    />
                  </button>
                  <button className="sideicons-btn">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAddToCartInShop(latest,state2)}
                    />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h6 className=" text-xs font-semibold">{latest.name}</h6>
                <div className="align-items-center justify-content-between flex">
                  <div className=" me-1 flex">
                  <ul className="ratings active d-flex flex-row-reverse">
                  
                  {Array.from({ length: Math.floor(latest.rating) }, (_, index) => (
                    <li className="star" key={index}>
                      <FontAwesomeIcon icon={faStar} />
                    </li>
                  ))}
                  {latest.rating % 1 !== 0 && (
                    <li className="star" key="half">
                      <FontAwesomeIcon icon={faStarHalf} />
                    </li>
                  )}
                </ul>
                  </div>
                  <div className="d-flex">
                    <div className="new-price text-md font-semibold">
                      {currencyType.symbol}{currencyConversion(latest.selling_price)}
                    </div>
                    <div className="old-price text-md font-semibold">
                      {currencyType.symbol}{currencyConversion(latest.mrp)}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Latest;
