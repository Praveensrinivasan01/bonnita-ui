import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../Components/Product";
import Woolen from "../../Assets/LandingPageImages/detail-1.jpg";
import cloth from "../../Assets/LandingPageImages/product-35.jpg";
import axios from "axios";
import "../../Styles/LandingPage/BestSeller.css";

const NewArrivals = () => {
  const [newArrival, setNewArrival] = useState();

  useEffect(() => {
    getNewArrivals();
  }, []);

  const getNewArrivals = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/landingpage/get-new-arrivals`
    );

    console.log(response?.data?.data);
    if (response?.data?.statusCode === 200) {
      setNewArrival(response?.data?.data);
      // ArrivalsImage(response?.data?.data)
    }
  };

  // const newArrivalsImg = newArrivals((state) => state.newArrivals);
  // console.log(newArrivalsImg,"newArrivals");

  return (
    <div className="container-lg mt-md-5 pt-md-5 " name="new">
      <div
        className="d-flex justify-content-between align-items-center pb-5"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <h3 style={{ color: "#1D1D1D", fontSize: "32px", fontWeight: "600" }}>
          New Arrivals
        </h3>
        <Link to="/shop">
          <h4 className="text-decoration-underline onHover">View All</h4>
        </Link>
      </div>
      <Product products={newArrival} />
    </div>
  );
};

export default NewArrivals;
