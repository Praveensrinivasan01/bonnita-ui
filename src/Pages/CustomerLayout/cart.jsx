import React, { useContext, useEffect } from "react";
import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useCurrencyStore } from "../../Zustand/currency";
import { AuthContext } from "../../Context/AuthContext";
import emptyCart from '../../Assets/NoDataImage/NoCartImage.jpg'

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
  const state = cartStore((state) => state.cart);
  // let totalQuantity = state.reduce((total, item) => total + item.cart_quantity, 0);
  const { fetchData, fetchDataFav } = useContext(AuthContext);
  useEffect(() => {
    fetchDataFav();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);


  const navigate = useNavigate();
  const state2 = loginStore((state) => state.login);
  const state2Id = state2?.id;

  const [cartData, setCartData] = useState();
  // console.log(cartData, "cartData")
  const placeOrder = () => {
    if (!state2Id) {
      toast("User Needs to Login", { draggable: true });
      navigate("/userLogin");
    } else {
      addToPlaceOrder(state);
      navigate("/billingdetails")
    }
    console.log(state, "cartData")
  }
  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)
  const [placeOrderValue, setPlaceOrderValue] = useState([]);
  const getCategories = async () => {
    if (state2Id) {
      const response = await axios
        .get(
          `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2Id}`
        )
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            setPlaceOrderValue(res?.data?.data);
            // addToPlaceOrder(res?.data?.data);
            console.log(res?.data?.data, "data");
            setCartData(res?.data?.data);
          }
        });
    }
  };

  const deleteData = async (cartdata) => {
    if (cartdata) {
      removeAllCart(cartdata);

    } else {
      console.error("cart is undefined");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    deleteData();
    getCategories();
  }, [state]);

  console.log(state, "CartData");

  const Instock = 1;
  return (
    <div className=" container-md PaddingTop overflow-auto">

      <>
        <div>
          <h4 className="mt-3 fs-6 fw-medium">
            <Link to="/shoppage">
              <span style={{ color: "#777" }}>Shop</span>
            </Link>
            / My Cart
          </h4>
          <h3 className="mt-3 mb-3 fs-3 fw-medium">My Cart</h3>
        </div>
        {
          state?.length === 0 ? <img className=" flex justify-center w-96 m-auto" src={emptyCart} /> :
            <div className="row tableForAddtoCart mt-3 p-3 rounded-0 d-md-flex d-none">
              <div className="col-4 fw-semibold fs-5">Product</div>
              <div className="col-2 fw-semibold fs-5">price</div>
              <div className="col-4 fw-semibold fs-5">Stock</div>
              <div className="col-2 fw-semibold fs-5">Total</div>
            </div>
        }
      </>


      {state?.map((cartDetails) => (
        <div className="row tableForAddtoCart border-top-0 rounded-0 py-4 px-2 d-flex align-items-center">
          <div className="col-md-4 col-12 d-flex align-items-center justify-center" onClick={() => navigate(`/product/${cartDetails.id}`)}>
            <img src={cartDetails.front_side} className="img-fluid w-28 md:w-36 pe-3 pb-md-0 pb-2" />
            <p className="">{cartDetails.name}</p>
          </div>
          <div className="col-md-2 col-2"><p><span>{currencyType?.symbol}</span>{currencyConversion(cartDetails.selling_price)}</p></div>
          <div className="col-md-4 col-4">
            <span className="d-flex align-items-center">
              <p
                className=""
                style={{ color: cartDetails.cart_quantity < cartDetails.quantity ? "#20C86D" : "#777" }}
              >
                {cartDetails.cart_quantity < cartDetails.quantity ? "In Stock" : "Out Of Stock"}
              </p>{" "}
              <FontAwesomeIcon
                icon={faMinus}
                style={{ ...iconStyle, cursor: "pointer" }}
                className="rounded-1 ms-4"
                onClick={() => {
                  decrement(cartDetails, state2);
                }}
              />
              <span className=" ms-3 me-3 text-center " style={CountStyle}>
                {cartDetails.cart_quantity}
                {console.log(cartDetails.cart_quantity, "quantity")}
              </span>{" "}
              {cartDetails.cart_quantity < cartDetails.quantity &&
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ ...iconStyle, cursor: "pointer" }}
                  className="rounded-1"
                  onClick={() => {
                    increment(cartDetails, state2);
                  }}
                />
              }{" "}
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer", ...iconStyles1 }}
                onClick={() => deleteData(cartDetails)}
                className="ms-3"
              />
            </span>
          </div>
          <div className="col-md-2">
            {currencyType?.symbol}{currencyConversion(cartDetails.selling_price) * cartDetails.cart_quantity}
          </div>
        </div>
      ))}
      {/* {cartData?.length ? ( */}
      <div className="text-end mb-4 pb-5 mt-4">
        {/* <Link to="/billingdetails"> */}
        {
          state?.length === 0 ? "" :
            <button className="button1  color-2" onClick={placeOrder}>Place Order</button>

        }
        {/* </Link> */}
        {/* <Button
            btnName={"PLACE ORDER"}
            btnStyle={""}
            link={"/billingdetails"}
            linkNeeded={"yes"}
          /> */}
      </div>
      {/* ) : (
        <></>
      )} */}
    </div>
  );
};

export default Cart;
