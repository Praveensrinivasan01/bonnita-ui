import React, { useEffect, useState } from "react";
import "../../Styles/LandingPage/Categories.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import VeganLeather from "../../Assets/LandingPageImages/VeganLeather.jpg";
import NaturalCane from "../../Assets/LandingPageImages/NaturalCane.jpg";
import Woolen from "../../Assets/LandingPageImages/Woolen.jpg";
import NewImg from '../../Assets/LandingPageImages/detail-1.jpg'
import newImg2 from '../../Assets/LandingPageImages/product-35.jpg'
import axios from 'axios'
import { decrement, increment } from "../../Zustand/cartStore";
import { toast } from "react-toastify";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Categories = () => {

  const [categoriesData, setCategoriesData] = useState([]);
  const Navigate = useNavigate();

  // const value = 1

  useEffect(() => {
    getCategories();
  }, []);

  
  const getCategories = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/get-all-category`).then((res) => {
      if (res?.data?.statusCode === 200) {
        setCategoriesData(res?.data?.data);
      }
    });
  };

  // console.log()
  

  // const notify = (category) =>{
  //   increment(category)
  //   toast(`🛒  ${category.title} Added To Cart`, { draggable: true });
  // }
    
  return (
    <section className="categories container-lg" name="categories">
      <h1 className="text-center mb-md-4">Categories</h1>
      <div className="container">
        <div className="row gap-2 d-flex justify-content-evenly p-md-0 p-3" >
          {categoriesData.map((category, index) => (

            <div
              key={index}
              className="col-lg-3 col-md-4 col-12 card mt-3 mb-3 bgCategories"
              style={{
                backgroundImage: `url(${category.imageData})`,
                backgroundRepeat: "no-repeat",
                cursor:"pointer"
              }}
            >
             

              <div className="content m-auto" onClick={() => { Navigate(`/shop?category=${category.name}`) }}>
                <h2 className="title ">{category.name}</h2>
                {/* <p className="copy">Product Pricing .</p> */}
                <div className="d-flex gap-3">
                  {/* <img src={HearIcon} alt="#" className="img-fluid" onClick={()=>{
                    decrement(category)
                  }} /> */}
                  {/* <img
                    src={CartIcon}
                    alt="#"
                    className="img-fluid position-relative"
                    onClick={()=>notify(category)}

                  /> */}

                  <Link to={`/shop?category=${category.name}`}>
                  <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </div>
            
              </div>
            </div>
          ))}

          <div className="col-lg-3 col-md-4 col-12 card bg-dark mt-3 mb-3">
            <div className=" m-auto">
              <NavLink to="/shop">
                <h2 className="fs-3 text-light">View All</h2>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default Categories;
