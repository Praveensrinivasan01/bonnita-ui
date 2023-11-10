import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo/LogoForBonnita.jpg";
import SearchIcon from "../Assets/Icons/search-normal.svg";
import HearIcon from "../Assets/Icons/heart.svg";
import ProfileIcon from "../Assets/Icons/profile.svg";
import CartIcon from "../Assets/Icons/shopping-cart.svg";
// import { useCart } from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link as NewLink } from "react-scroll";
import { useLocation } from "react-router-dom";
import "../Styles/Header.css";
import Popup from "./Popup";
import { cartStore } from "../Zustand/cartStore";
import { wishList } from "../Zustand/wishListStore";
import wishlist from "../Pages/CustomerLayout/wishlist";
import { loginStore, logout } from "../Zustand/loginStore";
import axios from "axios";
import CurrencySwitcher from "./CurrencySwitcher";
import { clearData } from "../Zustand/userDetails";
import CustomNavBar from "./CustomNavBar";

const Header = () => {

  const  pathurl = window.location.pathname
  const [toggler, setToggler] = useState(true);
  const state = cartStore((state) => state?.cart);
  const state1 = wishList((state) => state?.wishList);
  const [totalCart, setTotalCart] = useState("0");
  const [totalFav, settotalFav] = useState("0");
  const totalQuantity12 = state?.reduce(
    (total, item) => total + item.cart_quantity,
    0
  );
  const state2 = loginStore((state) => state?.login);
  const [totalQuantity, setTotalQuantity] = useState([totalQuantity12]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     if (state2?.id) {
    //       const response1 = await axios.get(
    //         `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2?.id}`
    //       );
    //       if (response1) {
    //         const total = response1?.data?.data?.reduce(
    //           (total, item) => total + item.cart_quantity,
    //           0
    //         );
    //         console.log(total, "total");
    //         setTotalCart(total);
    //         setTotalQuantity((prevTotal) => prevTotal + total);
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };

    const fetchDataFav = async () => {
      try {
        if (state2?.id) {
          const response1 = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/get-all-favourites/${state2?.id}`
          );
          if (response1) {
            const total = response1?.data?.data?.reduce(
              (total, item) => total + item.fav_quantity,
              0
            );
            console.log(total, "total");
            settotalFav(totalFav);
            setTotalQuantity((prevTotal) => prevTotal + total);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (state2?.id) {
      fetchData();
      fetchDataFav();
    }
  }, [totalFav, state2?.id]);

  useEffect(() => {
    fetchData();
  }, [totalFav]);

  const fetchData = async () => {
    try {
      if (state2?.id) {
        const response1 = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2?.id}`
        );
        if (response1) {
          const total = response1?.data?.data?.reduce(
            (total, item) => total + item.cart_quantity,
            0
          );
          console.log(total, "total");
          setTotalCart(total);
          setTotalQuantity((prevTotal) => prevTotal + total);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const totalQuantity1 = state1.reduce(
    (total, item) => total + item.fav_quantity,
    0
  );

  // if(!state2.id){
  //   setToggle(true)
  // }

  const handleClearStorage = () => {
    logout();
    clearData();
  };

  // console.log(state2.id);
  const path1 = useLocation();
  console.log(path1.pathname[1], "path1");
  return (
    <div className=" w-full bg-white">
      <header id="site-header">
        <div id="site-header-inner" className="">
          <nav className="stroke">
            {toggler && (
              <div className="flex items-center justify-between gap-md-4 bg-black px-4 py-3 text-white ">
                <p className="md:text-sm text-xs font-medium col-md-2 col-6">
                  Call Us: +91 00 00000000
                </p>
                <p className="text-sm text-xs  font-medium">
                  Get Up to 50% Off on Wallets !!{" "}
                  <Link
                    to=""
                    className="text-decoration-underline ps-2 text-light"
                  >
                    GrabNow
                  </Link>
                </p>

                <button
                  className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
                  onClick={() => {
                    setToggler(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="wrapper">
              <div className="logo">
                <Link to="/">
                  <img src={logo} className="h-8" alt="#" />
                </Link>
              </div>
              <input type="radio" name="slider" id="menu-btn" />
              <input type="radio" name="slider" id="close-btn" />
              <ul className="nav-links">
                <label htmlFor="close-btn" className="btn close-btn">
                  <FontAwesomeIcon icon={faTimes} />
                </label>
                <li>
                  <Link to="/" smooth={true} duration={500}>
                    Home
                  </Link>
                </li>

                {path1.pathname[1] ? (
                  <>
                    {state2?.id ? (
                      <div className="d-md-none d-block">
                        <li>
                          <Link to="" className="d-md-none d-block">
                            <p className="m-0 fw-medium">Acount Details</p>
                          </Link>
                        </li>

                        <li className="d-md-none d-block">
                          <Link>
                            <p
                              className="m-0 fw-medium"
                              onClick={handleClearStorage}
                              style={{ cursor: "pointer" }}
                            >
                              LogOut
                            </p>
                          </Link>
                        </li>
                      </div>
                    ) : (
                      <div className="d-md-none d-block">
                        <li>
                          <Link to="/userRegister">
                            <p className="m-0 fw-medium">Register</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/userLogin">
                            <p className="m-0 fw-medium">Login</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      <NewLink
                        to="categories"
                        smooth={true}
                        duration={500}
                        offset={-180}
                      >
                        Categories
                      </NewLink>
                    </li>
                    <li>
                      <NewLink to="about" smooth={true} duration={500}>
                        About
                      </NewLink>
                    </li>
                    <li>
                      <NewLink
                        to="new"
                        smooth={true}
                        duration={500}
                        offset={-150}
                      >
                        New
                      </NewLink>
                    </li>
                    <li>
                      <NewLink
                        to="bestSeller"
                        smooth={true}
                        duration={500}
                        offset={-180}
                      >
                        Best Seller
                      </NewLink>
                    </li>
                    <li>
                      <NewLink
                        to="whyus"
                        smooth={true}
                        duration={500}
                        offset={-180}
                      >
                        Why Us
                      </NewLink>
                    </li>
                    <li>
                      <NewLink
                        to="contact"
                        smooth={true}
                        duration={500}
                        offset={-100}
                      >
                        Contact
                      </NewLink>
                    </li>
                    {}
                    <li>
                      <Link to="" className="d-md-none d-block">
                        <p className="m-0 fw-medium">Acount Details</p>
                      </Link>
                    </li>
                    <li className="d-md-none d-block">
                      {state2?.id ? (
                        <Link>
                          <p
                            className="m-0 fw-medium"
                            onClick={handleClearStorage}
                            style={{ cursor: "pointer" }}
                          >
                            LogOut
                          </p>
                        </Link>
                      ) : (
                        <>
                          <Link to="/userRegister">
                            <p className="m-0 fw-medium">Register</p>
                          </Link>
                          <Link to="/userLogin">
                            <p className="m-0 fw-medium">Login</p>
                          </Link>
                        </>
                      )}
                    </li>
                  </>
                )}
              </ul>
              <div className="d-flex gap-3   align-items-center">
                <Link to="/wishlist" className="position-relative d-md-block d-none">
                  <img src={HearIcon} alt="#" className="img-fluid" />
                  <p className="position-absolute text-black totalcount">
                    {totalFav}
                  </p>
                </Link>
                {state2?.id ? (
                  <>
                    <div class="dropdown123 d-md-block d-none">
                      <span className="profileImg">
                        <img src={ProfileIcon} alt="#" className="img-fluid" />
                      </span>
                      <div class="dropdown-content">
                        <Link to="">
                          <p className="m-0 fw-medium">Acount Details</p>
                        </Link>
                        {/* <Link to="/userLogin"> */}
                        <p
                          className="m-0 fw-medium"
                          onClick={handleClearStorage}
                          style={{ cursor: "pointer" }}
                        >
                          LogOut
                        </p>
                        {/* </Link> */}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="dropdown123 d-md-block d-none">
                      <span className="profileImg">
                        <img src={ProfileIcon} alt="#" className="img-fluid" />
                      </span>
                      <div class="dropdown-content">
                        <Link to="/userRegister">
                          <p className="m-0 fw-medium">Register</p>
                        </Link>
                        <Link to="/userLogin">
                          <p className="m-0 fw-medium">Login</p>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
                <Link to="/cart" className="position-relative d-md-block d-none">
                  <img src={CartIcon} alt="#" className="img-fluid" />
                  <p className="position-absolute text-black totalcount">
                    {totalCart ? totalCart : 0}
                  </p>
                </Link>
                {
                  pathurl !=="/" ?
               null:
                <> <CurrencySwitcher /></>
                }
              </div>

              <label htmlFor="menu-btn" className="btn menu-btn">
                <FontAwesomeIcon icon={faBars} />
              </label>
            </div>
          </nav>
        </div>
      </header>
      <CustomNavBar/>
    </div>
  );
};

export default Header;
