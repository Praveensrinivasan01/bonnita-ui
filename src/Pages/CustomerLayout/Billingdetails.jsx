import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../../Styles/Billingdetails.css";
import { placeOrder } from "../../Zustand/placeOrderdetails";
import axios from "axios";
import { toast } from "react-toastify";
import { cashfree } from "../../Commons/cf";
import { loginStore } from "../../Zustand/loginStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { increment } from "../../Zustand/cartStore";
import { useCurrencyStore } from "../../Zustand/currency";
import { AuthGet } from "../../Commons/httpService";
import { addorderDetails } from "../../Zustand/orderDetails";


const Billingdetails = () => {
  const path = window.location.pathname;
  const [productInfo, setProductInfo] = useState(null);
  const detailsOfPlaceOrder = placeOrder((state) => state.placeOrder);
  const currentsite=window.location.href
  const {orderid}=useParams()

  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)

  let generateHash = async (data) => {
    const userData = localStorage.getItem("UserDetails")
    const parsedData = JSON.parse(userData)?.state?.UserDetails
    console.log("----->",JSON.parse(userData));
    const details = {
      order_id: data.id,
      order_amount: currencyConversion(data.total),
      order_currency: currencyType?.name,
      order_note: 'Additional order info',
      customer_details: {
        customer_id: data.user_id,
        customer_name: parsedData.firstname+" "+parsedData.lastname,
        customer_email: parsedData.email,
        customer_phone: parsedData.mobile,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/make-payment`,
        details,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.warn(response);
      if (response.status == 200) {
        opencf(response.data.data.payment_session_id,data.id);
      }
      console.log("Payment success:", response.data);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  let opencf = (session,oi) => {
    debugger
    let checkoutOptions = {
      paymentSessionId: session,
      returnUrl: currentsite+'/'+oi,
    };
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  };

 let ordersave=async()=>{
  debugger
await AuthGet('order/get-paydata/'+orderid,'customer_token').then((res)=>{
  if(res.statusCode==200){
    console.warn(res)
  }
})
 }

  useEffect(()=>{
if(orderid){
  ordersave()
}
  },[])

  console.log(detailsOfPlaceOrder, "dajdjlsljNLJn");
  const state2 = loginStore((state) => state.login);

  const [newOrder, setNewOrder] = useState({
    user_id: state2?.id,
    productdetails: (Array.isArray(detailsOfPlaceOrder)
      ? detailsOfPlaceOrder
      : [detailsOfPlaceOrder]
    )?.map((details) => ({
      product_id: details.id,
      quantity: details.cart_quantity && details.cart_quantity?.length ? details.cart_quantity : 1 ,
      price: details.selling_price,
    })),
    total_amount: 0,
    // quantity: 0,
    mode_of_payment: "COD",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!state2?.id) {
      navigate("/");
    } else {
      let total = 0;
      let totalQuantity = 0;

      if (Array.isArray(detailsOfPlaceOrder)) {
        detailsOfPlaceOrder.forEach((details) => {
          total += details.selling_price;
          totalQuantity += details.cart_quantity;
        });
      } else if (detailsOfPlaceOrder) {
        total = detailsOfPlaceOrder.selling_price;
        totalQuantity = detailsOfPlaceOrder.cart_quantity;
      }
      setNewOrder({
        ...newOrder,
        total_amount: total,
        quantity: totalQuantity,
      });
    }
  }, [state2?.id, path, detailsOfPlaceOrder]);

  console.log(newOrder, "newOrder");

  useEffect(() => {
    if (Array.isArray(detailsOfPlaceOrder)) {
      setProductInfo(detailsOfPlaceOrder);
    } else {
      setProductInfo([detailsOfPlaceOrder]);
    }
  }, [detailsOfPlaceOrder]);

  const [formData, setFormData] = useState({
    user_id: state2?.id,
    room_no: "",
    city: "",
    address_line1: "",
    address_line2: "",
    state: "",
    zip_code: "",
    country: "",
  });

  const [remember, setRemember] = useState(false);
  console.log(remember);

  // COD or E_PAY

  let modeOfPayment = "";

  const handleOrder = () => {
    if (formData.cash) {
      modeOfPayment = "Cash";
    } else if (formData.upi) {
      modeOfPayment = "E_PAY";
    }

    setNewOrder({
      ...newOrder,
      mode_of_payment: modeOfPayment,
    });
  };

  let total = 0;
  let totalDiscount = 0;
  // let subTotal = 0;
  let totalQuantity = 0;

  const handleClick = async (e) => {
    // e.preventDefault();
    console.log(process.env.REACT_APP_API_URL);

    try {
      console.log(state2?.id, "state2.id");
      if (state2?.id) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/add-userdetails`,
          formData
        );
        console.log(response, "response");

        if (response.data.statusCode === 200) {
          console.log("success");
        } else if (response.data.statusCode === 400) {
          toast.error(response.data.message);
        }
      } else {
        Navigate("/userlogin");
        toast.error("Please Login to Continue");
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newOrder,"orders");
    try {
    
        if (state2.id) {
          handleClick();
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/order/create-order`,
            newOrder
          );
          if(response.data.statusCode === 200){
              if(newOrder.mode_of_payment=== 'E_PAY'){
            generateHash(response.data.order)
            console.log(response.data.order.id,"idd")
            let orderDetails = {
              id: response.data.order.id,
              status: response.data.order.status
            };
            addorderDetails(
              orderDetails
            )
            console.log('yes');
          }else{
            toast("order placed successfully.")
          }
        }
       
          console.log(response, "response");
          console.log(formData, "set");
        } else {
          Navigate("/userlogin");
          toast.error("Please Login to Continue");
        }
      
    } catch (error) {}
  };

  // if (remember === true) {
  //   handleClick();
  // } else {
  //   console.log("errroe");
  // }

  return (
    <>
      <div className="container-md PaddingTop">
        <h5>
          <Link to="/shoppage">Shop</Link> / Shopping Cart
        </h5>
        <div className="row mt-4">
          <div id="main-content" className="site-main clearfix">
            <section className="checkout">
              <div className="themesflat-container">
                <form className="form-checkout" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-7 col-md-6">
                      <h3 className="mb-4">Billing details</h3>
                      {/* <form className="billing "> */}
                      <div className="d-flex">
                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Last Name"
                            value={formData.room_no}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                room_no: e.target.value,
                              });
                            }}
                            required
                          />
                          <label for="floatingInput">
                            Door No*
                          </label>
                        </div>
                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Last Name"
                            value={formData.address_line1}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                address_line1: e.target.value,
                              });
                            }}
                            required
                          />
                          <label for="floatingInput">Address Line1 *</label>
                        </div>
                      </div>

                      <div className="d-flex">
                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Address line 2 *"
                            value={formData.address_line2}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                address_line2: e.target.value,
                              });
                            }}
                            required
                          />
                          <label for="floatingInput">Address Line 2 *</label>
                        </div>

                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Address line 2"
                            value={formData.city}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const alphabeticValue = inputValue.replace(
                                /[^A-Za-z ]/g,
                                ""
                              );
                              setFormData({
                                ...formData,
                                city: alphabeticValue,
                              });
                            }}
                            required
                          />

                          <label for="floatingInput">City *</label>
                        </div>
                      </div>

                      <div className="d-flex">
                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="State"
                            value={formData.state}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const alphabeticValue = inputValue.replace(
                                /[^A-Za-z ]/g,
                                ""
                              );
                              setFormData({
                                ...formData,
                                state: alphabeticValue,
                              });
                            }}
                            required
                          />
                          <label for="floatingInput">State *</label>
                        </div>

                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Postcode/Zip*"
                            value={formData.country}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const alphabeticValue = inputValue.replace(
                                /[^A-Za-z ]/g,
                                ""
                              );
                              setFormData({
                                ...formData,
                                country: alphabeticValue,
                              });
                            }}
                            required
                          />
                          <label for="floatingInput">Country*</label>
                        </div>
                      </div>

                        <div className="form-floating mb-3 col-6 pe-md-5 pe-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Postcode/Zip*"
                            value={formData.zip_code}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(
                                /\D/g,
                                ""
                              );
                              const truncatedValue = numericValue.slice(0, 6);
                              setFormData({
                                ...formData,
                                zip_code: truncatedValue,
                              });
                            }}
                            required
                          />

                          <label for="floatingInput">Postcode/Zip*</label>
                        </div>

                        <div className="d-flex flex-column mt-4 col-12">
                          <label className="checkbox-customer">
                            Save my Address (for upcoming orders)
                            <input
                              type="checkbox"
                              className="tranfer"
                              id="remmember"
                              name="remmember"
                              value={remember}
                              onChange={(e) => {
                                setRemember(!remember);
                              }}
                            />
                            <span className="checkmark style-2" />
                          </label>
                        </div>
                      {/* </form> */}
                    </div>

                    <div className="col-lg-5 col-md-6 col-12">
                      <div className="sidebar sidebar-order m-0 w-100 ps-3 pe-4">
                        <div className="widget widget-order-product">
                          <div className="d-flex justify-content-between row fw-bold">
                            <span className="widget-title col-6">Products</span>
                            <span className="col-3">Nos.</span>
                            <span className="col-3">SUB TOTAL</span>
                          </div>
                          {productInfo?.map((details, index) => {
                            let quantity = details.cart_quantity
                              ? details.cart_quantity
                              : 1;
                            let subtotal = quantity * details.selling_price;
                            let discount =
                              quantity * (details.mrp - details.selling_price);

                            total += subtotal;
                            totalDiscount += discount;
                            totalQuantity += quantity;
                            return (
                              <div
                                key={index}
                                className="d-flex justify-content-between row"
                              >
                                <span className="col-6">{details.name}</span>
                                <div className="col-3">
                                  <span className="">x {quantity}</span>
                                  {/* <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ cursor: "pointer" }}
                                    className="rounded-1 ms-2"
                                    onClick={() => {
                                      
                                    }}
                                  /> */}
                                </div>
                                <span className="price col-3">₹{subtotal}</span>
                              </div>
                            );
                          })}
                        </div>
                        <hr className="mt-3" />

                        <div className=" mt-4 d-flex justify-content-between fw-bold">
                          <span className="widget-title">Subtotal</span>
                          <div className="d-flex flex-column">
                            <span className="price text-end">₹{total}</span>
                            {console.log(total)}
                            <span className="totalSavings text-end">
                              *Totally ₹{totalDiscount} saved !!
                            </span>
                          </div>
                        </div>
                        <hr className="mt-3" />
                       <div>
                       <p className="pt-2 pb-2">By purchasing this product, you'll earn {total/20} points</p>
                       </div>
                       <hr/>


                        <div className="d-flex justify-content-between mt-4 fw-bold">
                          <div>Shipping</div>
                          {total > 999 ? (
                            <div className="d-flex flex-column">
                              <span className="text-end">Free</span>
                              <span className="totalSavings text-end">
                                *Orders above ₹999 to avail free delivery
                              </span>
                            </div>
                          ) : null}
                        </div>
                        <hr className="mt-3" />
                        <div className=" mt-3">
                          <div className="d-flex justify-content-between">
                            <span className="widget-title">Total</span>
                            <span className="price">₹{total}</span>
                          </div>
                          <div className="mt-3">
                            <h5>Payments</h5>
                            <div className="form-check mt-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios1"
                                value={formData.cash}
                                checked={formData.cash}
                                onChange={() => {
                                  setNewOrder({
                                    ...newOrder,
                                    mode_of_payment:"COD"
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                for="gridRadios1"
                              >
                                Cash on Delivery
                              </label>
                            </div>
                            <div className="form-check mt-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios1"
                                value={formData.upi}
                                checked={formData.upi}
                                onChange={() => {
                                  setNewOrder({
                                    ...newOrder,
                                   mode_of_payment:"E_PAY"
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                for="gridRadios1"
                              >
                                <div className="d-flex ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="80"
                                    height="17"
                                    viewBox="0 0 80 17"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_220_464)">
                                      <path
                                        d="M5.17426 4.48104L4.5097 6.92704L8.3135 4.46712L5.82574 13.749L8.35232 13.7511L12.0274 0.0413818"
                                        fill="#3395FF"
                                      />
                                      <path
                                        d="M1.08017 9.84896L0.0337524 13.7511H5.21223L7.33122 5.81309L1.08017 9.84896ZM19.0684 6.41351C18.9418 6.88398 18.6979 7.22955 18.3342 7.45022C17.9713 7.67048 17.462 7.78102 16.8046 7.78102H14.716L15.4494 5.04685H17.538C18.1945 5.04685 18.6456 5.15655 18.8903 5.38018C19.135 5.60381 19.1941 5.94558 19.0684 6.41816M21.2308 6.35908C21.4966 5.37174 21.3869 4.61225 20.9008 4.0806C20.4156 3.55318 19.5641 3.28735 18.3489 3.28735H13.6878L10.8819 13.7557H13.1464L14.2772 9.5363H15.7624C16.0958 9.5363 16.3582 9.59115 16.5498 9.69664C16.7418 9.80634 16.8544 9.99621 16.889 10.2705L17.2932 13.7557H19.7194L19.3262 10.5068C19.246 9.78102 18.9139 9.35486 18.3304 9.22828C19.0743 9.01309 19.6975 8.65444 20.1996 8.15655C20.6982 7.66231 21.0544 7.04284 21.2308 6.3633M26.7354 10.0089C26.5456 10.7177 26.2544 11.2536 25.8608 11.6291C25.4667 12.0047 24.9958 12.1903 24.4464 12.1903C23.8869 12.1903 23.5076 12.0089 23.3072 11.6418C23.1063 11.2747 23.0996 10.7431 23.2861 10.0468C23.4726 9.35064 23.77 8.80634 24.1793 8.41394C24.5886 8.02153 25.0671 7.82533 25.6165 7.82533C26.165 7.82533 26.5405 8.0152 26.7304 8.39199C26.9245 8.77048 26.9287 9.31183 26.7388 10.0165L26.7354 10.0089ZM27.7278 6.30423L27.4443 7.3633C27.3219 6.98356 27.0844 6.67976 26.7333 6.45191C26.3814 6.22828 25.946 6.11436 25.4266 6.11436C24.7894 6.11436 24.1776 6.27891 23.5911 6.60803C23.0046 6.93714 22.4899 7.40128 22.0511 8.00043C21.6122 8.59959 21.2916 9.27891 21.0848 10.0426C20.8823 10.8106 20.8401 11.4814 20.9624 12.0637C21.089 12.6502 21.3549 13.0975 21.7641 13.4097C22.1776 13.7262 22.7051 13.8823 23.3506 13.8823C23.8636 13.8849 24.3708 13.7739 24.8359 13.5574C25.2957 13.35 25.7046 13.0447 26.0342 12.6629L25.7388 13.7667H27.9287L29.9283 6.30803H27.7342L27.7278 6.30423ZM37.7975 6.30423H31.4291L30.984 7.96668H34.6894L29.7907 12.1987L29.3722 13.7599H35.946L36.3911 12.0975H32.4207L37.3945 7.80212M43.403 9.99621C43.2059 10.7304 42.9135 11.2823 42.5274 11.6418C42.1413 12.0047 41.6738 12.1861 41.1249 12.1861C39.9772 12.1861 39.6 11.4561 39.9916 9.99621C40.1857 9.27048 40.4793 8.72491 40.8717 8.3574C41.2641 7.98862 41.7397 7.80465 42.2987 7.80465C42.8473 7.80465 43.2177 7.98735 43.4084 8.35529C43.5992 8.72237 43.5975 9.26963 43.403 9.99537M44.6848 6.58482C44.1806 6.2709 43.5371 6.11394 42.7523 6.11394C41.9578 6.11394 41.2224 6.27005 40.5456 6.58229C39.8716 6.89257 39.2792 7.35575 38.8156 7.93503C38.3388 8.52153 37.9958 9.20929 37.7852 9.9941C37.5785 10.776 37.5532 11.4625 37.7135 12.0502C37.8738 12.6367 38.2114 13.0882 38.7177 13.4004C39.2283 13.7152 39.8781 13.8717 40.6755 13.8717C41.4603 13.8717 42.1903 13.7139 42.8612 13.4C43.5321 13.0844 44.1059 12.6363 44.5827 12.0456C45.0595 11.4574 45.4013 10.7713 45.6122 9.98651C45.8232 9.2017 45.8485 8.51647 45.6882 7.92744C45.5278 7.34094 45.1945 6.88946 44.6924 6.57512M52.5025 8.29664L53.0637 6.2671C52.8738 6.17005 52.6249 6.11942 52.3127 6.11942C51.8105 6.11942 51.3295 6.24347 50.8654 6.49495C50.4662 6.70845 50.127 7.00972 49.8401 7.38693L50.1312 6.2941L49.4954 6.29664H47.9342L45.9215 13.7523H48.1422L49.1865 9.85486C49.3384 9.2882 49.6118 8.84221 50.0063 8.52575C50.3987 8.20803 50.8882 8.04896 51.4789 8.04896C51.8418 8.04896 52.1793 8.13208 52.5 8.2979M58.6814 10.0321C58.4916 10.7283 58.2046 11.2599 57.8122 11.627C57.4198 11.9958 56.9473 12.1798 56.3987 12.1798C55.8502 12.1798 55.4747 11.9941 55.2764 11.6228C55.0738 11.2494 55.0696 10.7114 55.2595 10.0042C55.4494 9.29748 55.7405 8.75529 56.1413 8.37976C56.5422 8.00128 57.0148 7.81225 57.5633 7.81225C58.1034 7.81225 58.4662 8.00634 58.6603 8.39875C58.8544 8.79115 58.8587 9.33545 58.6721 10.0317M60.2249 6.59706C59.8135 6.26794 59.2882 6.10339 58.6511 6.10339C58.0928 6.10339 57.5608 6.22997 57.0561 6.48567C56.5519 6.74094 56.1426 7.08904 55.8283 7.52955L55.8359 7.47891L56.2084 6.29326H54.0397L53.4869 8.35655L53.47 8.42828L51.1916 16.9279H53.4152L54.5629 12.6494C54.6768 13.03 54.9089 13.3287 55.2633 13.5447C55.6177 13.7599 56.0553 13.8667 56.5755 13.8667C57.2211 13.8667 57.8371 13.7106 58.4215 13.3983C59.008 13.0852 59.5143 12.6346 59.9447 12.0523C60.3751 11.4701 60.6945 10.7949 60.8983 10.0312C61.1051 9.26626 61.1473 8.58398 61.0291 7.98693C60.9089 7.38904 60.6426 6.92617 60.2316 6.59875M67.6008 10.0017C67.411 10.7063 67.1198 11.2464 66.7274 11.6177C66.335 11.9916 65.8624 12.1776 65.3139 12.1776C64.7527 12.1776 64.373 11.9962 64.1747 11.6291C63.9721 11.262 63.9679 10.7304 64.1536 10.0342C64.3392 9.33799 64.6354 8.79368 65.0447 8.40128C65.454 8.00887 65.9329 7.81309 66.4823 7.81309C67.0308 7.81309 67.4021 8.00297 67.5962 8.37849C67.7903 8.75529 67.7916 9.29664 67.6025 10.003L67.6008 10.0017ZM68.5924 6.29495L68.3084 7.35402C68.1861 6.97216 67.9498 6.66837 67.5996 6.44263C67.2451 6.21731 66.8105 6.10508 66.2916 6.10508C65.6544 6.10508 65.0392 6.26963 64.4519 6.59875C63.8654 6.92786 63.3506 7.38946 62.9118 7.98693C62.473 8.5844 62.1523 9.26541 61.9456 10.0291C61.7409 10.7958 61.7008 11.4679 61.8232 12.0528C61.9468 12.635 62.2131 13.0848 62.6249 13.3987C63.0359 13.711 63.5658 13.8688 64.2114 13.8688C64.7304 13.8688 65.2262 13.7608 65.6966 13.5439C66.1553 13.3355 66.5632 13.0299 66.892 12.6481L66.5966 13.7528H68.7865L70.7857 6.29706H68.5958L68.5924 6.29495ZM79.9793 6.29748L79.9806 6.29537H78.6346C78.5916 6.29537 78.5536 6.29748 78.5143 6.29832H77.816L77.4574 6.79621L77.3688 6.91436L77.3308 6.97343L74.4932 10.9262L73.9067 6.29748H71.5827L72.7599 13.3312L70.1608 16.9304H72.4772L73.1059 16.0388C73.1236 16.0127 73.1397 15.9907 73.1608 15.9629L73.8949 14.9207L73.916 14.8912L77.2042 10.2287L79.9764 6.30465L79.9806 6.30212H79.9793V6.29748Z"
                                        fill="#072654"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_220_464">
                                        <rect
                                          width="80"
                                          height="16.962"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p>/UPI</p>
                                </div>
                              </label>
                            </div>
                            {/* <p>*if only your bonus points is abouve 500 you can redeem </p> */}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios1"
                                value={formData.cash}
                                checked={formData.cash}
                                // onChange={() => {
                                //   setNewOrder({
                                //     ...newOrder,
                                //     mode_of_payment:"COD"
                                //   });
                                // }}
                              />
                              <label
                                className="form-check-label"
                                for="gridRadios1"
                              >
                                Redeem your Points
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="bottom-checkout d-flex justify-content-between">
                        {/* <div className="btn-left">
                          <a
                            href="index.html"
                            className="button style-5 color-5"
                          >
                            CONTINUE SHOPPING
                          </a>
                        </div> */}
                        {/* <div className="total-price">
                          <div className="number">
                            <span>3 items:</span>
                            <span>$150.00</span>
                          </div>
                          <div className="total">
                            <span>Total:</span>
                            <span>$150.00</span>
                          </div>
                        </div> */}
                        <div className="btn-center">
                          <button
                            type="submit"
                            className="text-bg-secondary p-3"
                          >
                            NEXT STEP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billingdetails;
