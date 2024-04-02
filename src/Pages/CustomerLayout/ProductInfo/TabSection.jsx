import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useParams, useEffect } from "react";
import axios from "axios";
import { loginStore } from "../../../Zustand/loginStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { handleInputValidation } from './../../../Helper/validator';

const TabSection = ({ id }) => {
  const Navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("additional-information");
  const [review, setReview] = useState([]);
  const [description, setDescription] = useState([]);
  const [star, setStar] = useState(0)
  const [userReview, setUserreview] = useState("")

  console.log("id", id)


  useEffect(() => {
    getReviewMapping()
  }, [])

  const getReviewMapping = async () => {

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-review/${id}`)

    console.log("review", response?.data)

    if (response?.data?.statusCode == 200) {
      setDescription(response?.data?.description)
      setReview(response?.data?.review)
    }
  }

  const ratingChanged = (newRating) => {
    setStar(newRating);
    console.log(newRating, 'rate');
  };



  const state2 = loginStore((state) => state.login);

  const handleReview = async (e) => {
    e.preventDefault()
    if (!userReview) {
      toast.error("Please Enter Review", { draggable: true });
      return
    }
    try {
      if (state2) {
        let body = {
          user_id: state2.id,
          product_id: id,
          rating: star,
          review: userReview
        }
        console.log(state2, body, 'body')
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/product/add-review`, body
        );
        console.log(response, "Response");
        getReviewMapping();
        setUserreview("");
        setStar(0);
        // ratingChanged(0) 
      }
      else {
        toast("User Needs To Login", { draggable: true });
        Navigate("/userLogin");
      }
    }
    catch (error) {
      toast(error, { draggable: true });
    }
  }


  return (
    <div>
      <div className=" container-md">
        <ul className="tab-title wow fadeInUp clearfix mb-md-4 mb-0">
          <li
            className={`tab-item item-tab-title mb-0  ${activeTab === "additional-information" ? "active" : ""
              }`}
            onClick={() => setActiveTab("additional-information")}
          >
            <h4 className="inner fs-md-5 fs-6 fw-medium">Additional information</h4>
          </li>
          <li
            className={`tab-item item-tab-title   ${activeTab === "customer-previews" ? "active" : ""
              }`}
            onClick={() => setActiveTab("customer-previews")}
          >
            <h4 className="inner  fs-md-5 fs-6 fw-medium">Customer Reviews</h4>
          </li>
        </ul>
        <div
          className="tab-content"
          style={{
            display: activeTab === "additional-information" ? "block" : "none",
          }}
        >
          <div className="tab-content">
            <div className="row">
              <div className="col-md-6">
                <h5 className="title">Description</h5>
                <p className="fs-md-5 fs-6">
                  {description[0]?.description}
                </p>
              </div>
              {/* <div className="col-md-6">
                <h5 className="title">Information</h5>
                <div className="d-flex">
                  <div>
                    <div className="">Outer Shell:</div>
                    <div className="">Lining:</div>
                    <div className="">Care:</div>
                  </div>
                  <div>
                    <div className="infor">100% polyester</div>
                    <div className="infor">100% polyurethane</div>
                    <div className="infor">
                      <span>
                        <i className="icon-1"></i>
                      </span>
                      <span>
                        <i className="icon-2"></i>
                      </span>
                      <span>
                        <i className="icon-3"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div
          className="tab-content"
          style={{
            display: activeTab === "customer-previews" ? "block" : "none",
          }}
        >
          <div className="tab-content">
            <div className="item-tab-content review pt-3 ps-md-4 ">
              {review.length ? review?.map((rev) => {
                return <>
                  <div className="customer-review">
                    <div className="customer">
                      <ul className="ratings active">
                        {[...Array(rev.rating)].map((_, index) => (
                          <li key={index} className="star">
                            <FontAwesomeIcon icon={faStar} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="review-content">
                      <div className="date">{rev.created_date}</div>
                      <h5 className="name">{rev.username}</h5>
                      <div className="">
                        {rev.review}
                      </div>
                    </div>

                  </div>
                </>

              }) : <div>
                <p className="ps-4 pb-3">No review for this product u can add review </p>
              </div>
              }
              <hr className="ps-4 pe-4" />
              <div className="container pt-4">
                <form className="col-lg-6 col-md-8 col-12 border-1 rounded-3 p-4 mt-3" onSubmit={handleReview}>
                  {/* <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div> */}
                  <div className="mb-3">
                    <textarea
                      className="form-control text-black"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Type your Review"
                      value={userReview}
                      onChange={(e) => handleInputValidation(e.target.value, setUserreview, 0)}
                    ></textarea>
                  </div>
                  <ReactStars
                    count={5}
                    onChange={(e) => ratingChanged(e)}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <button className="button1 color-2" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
