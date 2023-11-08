import React, { useEffect } from "react";
import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../Assets/LandingPageImages/product-35.jpg";
import {
  cartStore,
  increment,
  decrement,
  removeAllCart,
} from "../../Zustand/cartStore";
import Button from "../../Components/Button";
import { loginStore } from "../../Zustand/loginStore";
import { toast } from "react-toastify";
import axios from "axios";
import { addToPlaceOrder } from "../../Zustand/placeOrderdetails";

const Cart = () => {
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
  // const state = cartStore((state) => state.cart);
  // let totalQuantity = state.reduce((total, item) => total + item.cart_quantity, 0);

  const state2 = loginStore((state) => state.login);
  const state2Id = state2?.id;

  const [cartData , setCartData] = useState()

  const getCategories = async () => {
    if (state2Id) {
      const response = await axios
        .get(
          `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2Id}`
        )
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            addToPlaceOrder(res?.data?.data);
            console.log(res?.data?.data,"data")
            setCartData(res?.data?.data)
          }
        });
    }
  };

  const deleteData = async (cartdata) => {
    if (cartdata) {
      const response = await axios
        .delete(
          `${process.env.REACT_APP_API_URL}/product/delete-cart/${state2?.id}/${cartdata.id}`
        )
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            removeAllCart(cartdata);
          }
        });
        const response1 = await axios
        .get(
          `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2Id}`
        )
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            addToPlaceOrder(res?.data?.data);
            setCartData(res?.data?.data)
          }else{
            setCartData(null)
           addToPlaceOrder(null)
          }
        });
    } else {
      console.error("cart is undefined");
    }
  };

  useEffect(() => {
    deleteData();
    getCategories();
  },[]);

  console.log(cartData, "CartData");

  const Instock = 1;
  return (
    <div className=" container-md PaddingTop">
      {cartData?.length ? (
        <>
          <div>
            <h4 className="mt-3 fs-6 fw-medium">
              <Link to="/shop">
                <span style={{ color: "#777" }}>Shop</span>
              </Link>
              / My Cart
            </h4>
            <h3 className="mt-3 mb-3 fs-3 fw-medium">My Cart</h3>
          </div>
          <div className="row tableForAddtoCart mt-3 p-3 rounded-0">
            <div className="col-5 fw-semibold fs-5">Product</div>
            <div className="col-2 fw-semibold fs-5">price</div>
            <div className="col-5 fw-semibold fs-5">Stock</div>
          </div>
        </>
      ) : (
        <>
          <h1>There is no Cart to show</h1>
        </>
      )}

      {cartData?.map((cartDetails) => (
        <div className="row tableForAddtoCart border-top-0 rounded-0 py-4 d-flex align-items-center">
          <div className="col-5 d-flex align-items-center">
            <img src={cartDetails.front_side} className="img-fluid w-25 pe-3" />
            {cartDetails.name}
          </div>
          <div className="col-2">₹{cartDetails.selling_price}</div>
          <div className="col-5">
            <span className="d-flex align-items-center">
              <span
                className=""
                style={{ color: Instock ? "#20C86D" : "#777" }}
              >
                Instock
              </span>{" "}
              <FontAwesomeIcon
                icon={faMinus}
                style={{ ...iconStyle, cursor: "pointer" }}
                className="rounded-1 ms-md-4"
                onClick={() => {
                  decrement(cartDetails,state2);
                }}
              />
              <span className=" ms-3 me-3 text-center " style={CountStyle}>
                {cartDetails.cart_quantity}
                {console.log(cartDetails.cart_quantity,"quantity")}
              </span>{" "}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ ...iconStyle, cursor: "pointer" }}
                className="rounded-1"
                onClick={() => {
                  increment(cartDetails,state2);
                }}
              />{" "}
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer", ...iconStyles1 }}
                onClick={() => deleteData(cartDetails)}
                className="ms-md-4"
              />
            </span>
          </div>
        </div>
      ))}
      {cartData?.length ? (
        <div className="text-end mb-4 mt-4">
          <Button
            btnName={"PLACE ORDER"}
            btnStyle={"button1  color-2"}
            link={"/billingdetails"}
            linkNeeded={"yes"}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
