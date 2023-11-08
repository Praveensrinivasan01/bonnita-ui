import React from "react";
import LoomBookImg from "../../Assets/LandingPageImages/LookBook.jpg";
import WinterCollection from "../../Assets/LandingPageImages/WinterCollection.jpg";
import HugeSale from "../../Assets/LandingPageImages/Hugesale50Off.jpg";
import "../../Styles/LandingPage/LoomBook.css";

const LoomBook = () => {
  return (
    <div className="container-fluid ps-md-0 pe-md-0  LoomBook ">
      <div className="container p-md-0 mt-md-5">
        <div className="row">
          <div className="col-md-4 ps-md-0 pe-md-0 pt-md-5 mt-md-5 d-md-block d-flex flex-column align-items-center ">
            <h4 className="text-decoration-underline pt-3 pb-3">
              Winter Collection
            </h4>
            <img src={WinterCollection} alt="" className="img-fluid" />
          </div>
          <div className="col-md-4 centerImg">
            <img src={LoomBookImg} alt="" className="mb-4" />
          </div>
          <div className="col-md-4 d-flex flex-column align-items-md-end align-items-center p-md-0 pb-3">
            <img src={HugeSale} alt="" className="" />
            <h4 className="text-decoration-underline pe-md-2 pt-2">
              Huge sale 50% Off
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoomBook;
