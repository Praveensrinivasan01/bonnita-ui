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
        <div className="grid gap-5 md:grid-cols-3  justify-center items-center  mt-3 mb-3" >
          {categoriesData.map((category, index) => (
            <Link to={`/shop?category=${category.name}`}>
              <img
              key={index}
                className="col-lg-12 w-96 md:h-[350px] h-[180px] shadow-md"
                src={category.imageData}
            >
              </img>

            </Link>

          ))}




          <NavLink to="/shop?type=all">
            <h2 className="col-lg-12 bg-dark  w-96 rounded-xl justify-center flex items-center  md:h-[380px]  h-[180px] shadow-md fs-3 text-light">View All</h2>
          </NavLink>
        </div>
      </div>

     
    </section>
  );
};

export default Categories;
