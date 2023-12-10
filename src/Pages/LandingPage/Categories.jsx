import React, { useEffect, useState } from "react";
import "../../Styles/LandingPage/Categories.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import VeganLeather from "../../Assets/LandingPageImages/VeganLeather.jpg";
import NaturalCane from "../../Assets/LandingPageImages/NaturalCane.jpg";
import Woolen from "../../Assets/LandingPageImages/Woolen.jpg";
import NewImg from "../../Assets/LandingPageImages/detail-1.jpg";
import newImg2 from "../../Assets/LandingPageImages/product-35.jpg";
import axios from "axios";
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
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}/landingpage/get-all-category`)
      .then((res) => {
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
      <NavLink to="/shoppage?type=all">
          <h2 className="text-sm text-black text-end underline">
            View All
          </h2>
        </NavLink>
      {/* <div id="home_gallery">
        <div id="drag_div" class="active row">
          {categoriesData.map((category, index) => (
            <div class="active col-md-4 position-relative" id="liDiv">
              <img className="image" alt="" src={category.imageData} />
              <a
                href="https://martfurycdn.magebig.com/media/catalog/product/cache/633177f689f3c479eab7d48212fd720b/4/1/41a.jpg"
                target="_blank"
                class="no_hovercard"
              >
                <span class="ng-binding">{category.name}</span>
                <i>Read this article on Wikiwand</i>
              </a>
            </div>
          ))}
        </div>
      </div> */}

      <div className="grid gap-5 md:grid-cols-3  justify-center items-center  mt-3 mb-3">
        {categoriesData.map((category, index) => (
          <Link
            to={`/shoppage?category=${category.name}`}
            className="position-relative image-container"
          >
            <img
              key={index}
              className="col-lg-12 w-96 h-[350px] shadow-md image"
              src={category.imageData}
              alt={category.name}
            />
            <span className="category-name position-absolute rounded-sm bg-slate-300 p-1 text-black bottom-8 md:left-35 left-28">
              {category.name}
            </span>
          </Link>
        ))}
      
      </div>
    </section>
  );
};

export default Categories;
