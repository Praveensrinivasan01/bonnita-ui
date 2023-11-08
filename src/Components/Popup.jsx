import React, { useEffect } from "react";
import "../Styles/Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import img from "../Assets/LandingPageImages/product-35.jpg";
import Product from './Product';

const Popup = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const popupContainer = document.querySelector(".modal"); 
  
    if (isOpen) {
      popupContainer.style.overflowY = "hidden"; 
    } else {
      popupContainer.style.overflowY = "auto";
    }
  }, [isOpen]);
  
  

  const iconStyle = {
    border: "1px solid #333",
    backgroundColor: "#f0f0f0",
    padding: "4px",
  };

  const CountStyle = {
    border: "1px solid #333",
    backgroundColor: "#fff",
    padding: "4px 20px",
  };

  const iconStyles1 = {
    color: "#FF98A6",
    fontSize: "24px",
  };

  const modalStyle = {
    display: isOpen ? "flex" : "none",
  };

  const Instock = 1;
  return (
    <div className="modal  popup" style={modalStyle}>
      <div className="modal-content ">
        <span className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <div>
          <h4 className="mt-3">
            <Link to="/Shopsiderbar">
              <span>Shop</span>
            </Link>
            / My Cart
          </h4>
          <h3 className="mt-3 mb-3">My Cart</h3>
        </div>
        <div className="row tableForAddtoCart mt-3 p-3 rounded-0">
        <div className="col-5">
        Product
        </div>
        <div className="col-2">
        price
        </div>
        <div className="col-5">
        Stock
        </div>
        </div>
        <div className="row tableForAddtoCart border-top-0 rounded-0 py-4 d-flex align-items-center">
        <div className="col-5 d-flex align-items-center">
        <img src={img} className="img-fluid w-25 pe-3" />
                  Black Beige Women’s Leather wallet
        </div>
        <div className="col-2">
        ₹365.77
        </div>
        <div className="col-5">
        <span className="d-flex align-items-center">
                  <span
                    className=""
                    style={{ color: Instock ? "#20C86D" : "#777" }}
                  >
                    Instock
                  </span>{" "}

                  <FontAwesomeIcon
                    icon={faPlus}
                    style={iconStyle}
                    className="rounded-1 ms-md-4"
                  />
                  <span className=" ms-3 me-3 text-center " style={CountStyle}>
                    1
                  </span>{" "}
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={iconStyle}
                    className="rounded-1"
                  />{" "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={iconStyles1}
                    className="ms-md-4"
                  />
                  </span>
        </div>
        </div>
        <div className="text-end">
        <button className="button color-1 text-light mt-4">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
