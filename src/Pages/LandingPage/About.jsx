import React from "react";
import "../../Styles/LandingPage/About.css";

import RightImg from "../../Assets/LandingPageImages/AboutUsRightImg.jpg";
import leftImg from "../../Assets/LandingPageImages/AboutUsLeftImg.jpg";
import Button from "../../Components/Button";

const About = () => {
  return (
    <div className="pt-md-5 mt-md-5 AboutUs container-lg-fluid  p-lg-0 p-md-5" name="about" >
      <div class="row pt-md-4">
        <div className="col-lg-4 d-lg-block d-md-none d-block" >
          <img src={leftImg} alt="#" className="img-fluid " />
        </div>
        <div className="col-lg-4 mx-auto my-auto" >
          <h3 className="text-center mt-md-0 mt-3 mb-md-5" data-aos="fade-left" data-aos-duration="1700">About</h3>
          <p className="pt-3" data-aos="fade-right" data-aos-duration="600">
            Established in the year 2022.There is revolution happening in the
            Indian fashion industry. Witnessing the surge Bonnita the evolved as
            a most premium brand having its design studio in Paris, France.
          </p>
          <p className="pt-3" data-aos="fade-right" data-aos-duration="1200">
            Designed from the fashion capital of the world and to keep the
            Indian fashion lovers in vogue, Bonnita launched its brand in India
            with the sent office global fashion trends.
          </p>
          <p className="pt-3" data-aos="fade-right" data-aos-duration="1800">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="text-center">
             {/* <a href="#" className='button1 color-2 mt-4' data-aos="fade-left" data-aos-duration="1700">LET’S CONNECT</a> */}
             <Button btnName={"LET’S CONNECT"} btnStyle={"button1 color-2 mt-4"} />   
          </div>
        </div>
        <div className="col-lg-4 text-end d-flex justify-content-end pt-md-5 mt-md-5">
          <img src={RightImg} alt="#" className="img-fluid pt-5 mt-5 d-lg-block d-md-none d-block" />
        </div>
      </div>
    </div>
  );
};

export default About;
