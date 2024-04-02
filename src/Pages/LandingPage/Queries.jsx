import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Rating from "../../Assets/Icons/5star.svg";
import doubleQuotes from "../../Assets/Icons/DoubleQuotes.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Styles/LandingPage/Queries.css";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { handleInputValidation } from './../../Helper/validator';

const Queries = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const [feedBacks, setFeedBacks] = useState()

  const [name, setname] = useState("");
  const [mobile, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [query, setqueryType] = useState("");
  const [comments, setcomments] = useState("");



  useEffect(() => {
    getCustomerFeedBacks()
  }, [])

  const getCustomerFeedBacks = async () => {
    console.log("feedbacks call")
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/get-feedbacks`)
    console.log(response?.data?.data, 'customer feedbacks')
    if (response?.data?.statusCode === 200) {
      setFeedBacks(response?.data?.data)
    }
  }
  const handleQueries = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email || !query || !comments) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/post-query`, {
        name,
        mobile,
        email,
        query,
        comments,
      });
      localStorage.setItem("responseAtQueryStatusCode", response.data.statusCode);
      if (response?.data?.statusCode === 200) {
        toast('Your query has been received. We will contact you back.');
      } else {
        toast('There was an issue submitting your query. Please try again later.');
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="pt-5">
      <div className="container-md CaroselForQuries p-md-5 " style={{ zIndex: 2, position: "relative" }}>
        <div className="p-4">
          <Slider {...carouselSettings}>
            {feedBacks ? feedBacks?.map((feedBack) => {
              return <div className="d-flex">
                <div>
                  <img src={doubleQuotes} alt="#" className="img-fluid m-0 " />
                </div>
                <div>
                  <p>
                    {feedBack.review}
                  </p>
                  <div className="d-flex mt-3">
                    <h6>
                      - {feedBack.customername} <span>(Customer)</span>
                    </h6>
                    <ul className="ratings">
                      {[...Array(feedBack.rating)].map((_, index) => (
                        <li key={index} className="star">
                          <FontAwesomeIcon icon={faStar} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            }) : ""}
          </Slider>
        </div>
      </div>
      <div className="bgForm pt-md-5" name="contact" style={{ zIndex: 1, position: "relative" }}>
        <h3 className="text-light text-center pt-md-5">Have Queries ??</h3>
        <h4 className="text-light text-center pt-md-3 pb-md-4">Don’t worry, We are here to serve you !!</h4>
        <div className="container my-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <form onSubmit={handleQueries}>
                <div className="row g-3">
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-name"
                      placeholder="name@example.com"
                      value={name}
                      onChange={(e) => handleInputValidation(e.target.value, setname, 0)}
                    />
                    <label htmlFor="your-name" className="lable text-light">Name</label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-phone"
                      placeholder="PhoneNumber"
                      value={mobile}
                      onChange={(e) => handleInputValidation(e.target.value, setphonenumber, 2)}
                    />
                    <label htmlFor="your-phone" className="lable text-light">Phone No</label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="email"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => handleInputValidation(e.target.value, setemail, 4)}
                    />
                    <label htmlFor="your-email" className="lable text-light">E-mail Address</label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="query-type"
                      placeholder="Type Your Query"
                      value={query}
                      onChange={(e) => handleInputValidation(e.target.value, setqueryType, 0)}
                    />
                    <label htmlFor="query-type" className="lable  text-light">Type of Query</label>
                  </div>
                  <div className="form-floating mb-3 col-12">
                    <textarea
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      placeholder="Leave a comment here"
                      // id="your-comments"
                      style={{ height: "100px" }}
                      value={comments}
                      onChange={(e) => handleInputValidation(e.target.value, setcomments, 0)}
                    ></textarea>
                    <label htmlFor="your-comments" className="lable text-light">Comments</label>
                  </div>
                  <div className="text-center pb-3">
                    <button type="submit" className="btn button rounded-0 fw-bold ps-5 pe-5 text-light ">
                      Send
                    </button>
                  </div>
                </div>
              </form>


            </div>
          </div>
        </div>
        <div>

        </div>
      </div>

    </div>
  );
};

export default Queries;
