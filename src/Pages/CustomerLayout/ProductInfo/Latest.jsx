import {
  faHeart,
  faShare,
  faShoppingCart,
  faStar,
  faStarHalf
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import newImg from "../../../Assets/LandingPageImages/product-35.jpg";
import newImg2 from "../../../Assets/LandingPageImages/product-35.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SingleProduct from "../../../Components/SingleProduct";
import { toast } from "react-toastify";
import { increment } from "../../../Zustand/cartStore";
import {favourite} from '../../../Zustand/wishListStore'
import { loginStore } from "../../../Zustand/loginStore";
import axios from "axios";

const Latest = () => {
  const Navigate = useNavigate()
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


  useEffect(() => {
    getNewArrivals()
  }, [])

  const getNewArrivals = async () => {

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/get-new-arrivals`)

    console.log(response?.data?.data)
    if (response?.data?.statusCode == 200) {
      setNewArrival(response?.data?.data)
    }
  }

  const state2 = loginStore((state) => state.login);

  const notify4 = (products) => {
    toast(`🛒  ${products.title} Added To Cart`, { draggable: true });
    increment(products);
  };

  const notify5 = (products) => {
    if (state2) {
      toast(
        <div>
          <FontAwesomeIcon icon={faHeart} /> {products.title} Added To Your Wishlist
        </div>,
        { draggable: true }
      );
    } else {
      toast("User Needs To Login", { draggable: true });
      Navigate("/userRegister");
    }
  }
  

  return (
    <section className="product themesflat-section style-4 mb-5 mt-3 container-md">
    <div className="container-md">
      <h3 className="themesflat-heading wear-with mt-md-5">Latest</h3>
      <div className="row">
          {newArrival?.map((latest) => (
          <div className="col-md-3 col-6 mb-md-0 mb-3 p-0" key={latest.id}>
            <div className="product-item margin-bottom-0">
              <div className="product-img">
                <SingleProduct products={latest}/>
                <ul className="product-icon">
                  {/* <li>
                      <FontAwesomeIcon icon={faShare} />
                  </li> */}
                  <li>
                      <FontAwesomeIcon icon={faHeart} style={{cursor:"pointer"}} onClick={() => {
                         notify5(latest)
                        }}   />
                  </li> 
                  <li>
                      <FontAwesomeIcon style={{cursor:"pointer"}} icon={faShoppingCart} onClick={()=>{notify4(latest)}} />
                  </li>
                </ul>
              </div>
              <div className="product-content">
                <div className="rating-price">
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
                    <div className="product-price">{latest.selling_price}</div>
                </div>
                <div className="product-title-price-old text-xs">
                    {latest.name}
                  {/* {latest.color ? (
                    <ul className="product-options">
                      <li className="color color-1"></li>
                      <li className="color color-2 active"></li>
                      <li className="color color-3"></li>
                    </ul>
                  ) : null} */}
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
