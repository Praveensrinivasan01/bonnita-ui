import React from "react";
import "../../Styles/LandingPage/WhyUs.css";
import handBagImg from "../../Assets/LandingPageImages/handbagsImgInWhyUs.jpg";
import FASTFREEDELIVERY from "../../Assets/Icons/FASTFREEDELIVERY.svg";
import DAYSFREE from "../../Assets/Icons/DAYSFREE.svg";
import CASHON from "../../Assets/Icons/CASHON.svg";
import ONLINESUPPORT from "../../Assets/Icons/ONLINESUPPORT.svg";
import Button from "../../Components/Button";

const WhyUs = () => {
  return (
    <div class="container-md p-md-0 WhyUs " name="whyus">
      <h3 className="text-center" data-aos="fade-left" data-aos-duration="1700">Why Us</h3>
      <div className="row pb-5">
        <div className="col-md-6" data-aos="fade-left" data-aos-duration="1700">
          <h4 className="pt-md-4 pt-3">Lorem Ipsum</h4>
          <p className="pt-md-3 pt-2" s>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="quotesBgColor pt-3 pb-3 ps-3 pe-4 mt-md-4">
            <h5>
              “ Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. ”
            </h5>
            <h6 className="text-end">-- Lorem Ipsum</h6>
          </div>
          {/* <button className="btn p-3 rounded-0 mt-4">TRY NOW</button> */}
          <Button btnName={"TRY NOW"} btnStyle={"button color-1 mt-4"}/> 
        </div>
        <div className="col-md-6 ps-md-5 " data-aos="fade-right" data-aos-duration="1700">
          <img src={handBagImg} alt="#" className="img-fluid" />
        </div>
      </div>
      <div className="row Keypoints pt-md-5 " data-aos="fade-down" data-aos-duration="1700">
        <div className="col-md-3  mt-md-0 mt-2 mb-md-0 mb-2  col-6 d-flex gap-2 ">
          <div>
            <img src={FASTFREEDELIVERY} alt="" className="img-fluid" />
          </div>
          <div className="d-flex flex-column ">
            <h2>FAST & FREE DELIVERY</h2>
            <p>₹40</p>
          </div>
        </div>
        <div className="col-md-3  mt-md-0 mt-2 mb-md-0 mb-2 col-6 d-flex gap-md-1 gap-2">
          <div>
            <img src={DAYSFREE} alt="" className="img-fluid" />
          </div>
          <div className="d-flex  flex-column  ">
            <h2>DAYS FREE 9-10 PM</h2>
            <p>Returns</p>
          </div>
        </div>
        <div className="col-md-3 mt-md-0 mt-2 mb-md-0 mb-2  col-6 d-flex gap-md-1 gap-2">
          <div>
            <img src={CASHON} alt="" className="img-fluid" />
          </div>
          <div className="d-flex  flex-column">
            <h2>CASH ON </h2>
            <p>DELIVERY</p>
          </div>
        </div>
        <div className="col-md-3  mt-md-0 mt-2 mb-md-0 mb-2 col-6 d-flex gap-md-1 gap-2">
          <div className="">
            <img src={ONLINESUPPORT} alt="" className="img-fluid" />
          </div>
          <div className="d-flex  flex-column  gap-1">
            <h2>ONLINE SUPPORT</h2>
            <p>24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
