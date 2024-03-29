import { faChevronLeft, faChevronRight, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Button from "../../../Components/Button";
import { favourite } from "../../../Zustand/wishListStore";
import { increment } from "../../../Zustand/cartStore";
import { toast } from "react-toastify";
import { addToPlaceOrder } from "../../../Zustand/placeOrderdetails";
import { loginStore } from "../../../Zustand/loginStore";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderforProduct from 'react-slick';
import { useCurrencyStore } from "../../../Zustand/currency";

const ProductInfo = () => {
  const { id } = useParams();
  const state2 = loginStore((state) => state.login);
  const [productDetails1, setProductDetails1] = useState([]);
  const [imageData, setImageData] = useState("");
  const navigate = useNavigate();
  const [colorMapping, setColorMapping] = useState([]);

  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)

  useEffect(() => {
    window.scrollTo(0, 0)
    let isMounted = true;
    if (id) {

      const getColor = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/color-mapping/${id}`);
        console.log(response.data.data, "color mapping")
        setColorMapping(response?.data?.data)
      }
      getColor()
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/product-mapping/${id}`,
            { responseType: "json" }
          );
          if (isMounted) {
            setProductDetails1(response?.data.data);
            setImageData(response.data.data.imageDetails[0]);
            addToPlaceOrder(response?.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      setProductDetails1([]);
    }
  }, [id]);

  console.log(productDetails1, "productDetails1")
  const [imgChange, setImgaChange] = useState("");

  const backSide = () => {
    setImgaChange(productDetails1?.imageDetails[0]?.back_side || "");
  };

  const leftSide = () => {
    setImgaChange(productDetails1?.imageDetails[0]?.left_side || "");
  };

  const rightSide = () => {
    setImgaChange(productDetails1?.imageDetails[0]?.right_side || "");
  };
  const frontSide = () => {
    setImgaChange(productDetails1?.imageDetails[0]?.front_Side || "");
  };





  const notify3 = () => {
    increment(productDetails1, state2, id);
    // if (state2?.id) {
    //   // toast(`🛒  ${products?.name} Added To Cart`, { draggable: true });
    // } else {
    //   toast("User Needs to Login", { draggable: true });
    //   navigate("/userLogin");
    // }
  };

  const notify4 = (products) => {
    if (state2?.id) {
      favourite(products, state2)
    } else {
      toast("User Needs to Login", { draggable: true });
      navigate("/userLogin");
    }
  };

  const notify5 = () => {
    if (state2?.id) {
      if (productDetails1?.quantity > 0) {
        navigate("/billingdetails")
      } else {
        toast(`${productDetails1.name} Is Out Of Stock`)
      }
    } else {
      toast("User Needs to Login", { draggable: true });
      navigate("/userLogin");
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    //  prevArrow: <ArrowButton direction="prev" />,
    // nextArrow: <ArrowButton direction="next" />,
  };

  console.log(productDetails1, "Productsline1233");
  return (
    <>
      {/* <Billingdetails productDetails={productDetails1}/> */}
      <div className="container-md mb-4 PaddingTop">
        <p>
          {" "}
          <Link to="/shoppage">
            <span style={{ color: "#777" }}>Shop</span>
          </Link>
          / Product Overview
        </p>
      </div>
      <div className="infor-product container-md">
        <div className="row ">
          <div className="col-md-4 ">
            {/* <SliderforProduct {...settings}> */}
            <div className="" >
              {imageData && (
                <img
                  src={imgChange.length ? imgChange : imageData.front_side}
                  alt="Image"
                  className=""
                />
              )}
            </div>

            <div className="flex gap-3 ">
              <div>
                <img
                  src={imageData?.front_side}
                  alt="Image"
                  className=" cursor-pointer"
                  onClick={frontSide}
                />
              </div>
              <div>

                <img
                  src={imageData?.back_side}
                  alt="Image"
                  className="img-fluid cursor-pointer"
                  onClick={backSide}
                />
              </div>
              <div>

                <img
                  src={imageData?.left_side}
                  alt="Image"
                  className="img-fluid cursor-pointer"
                  onClick={leftSide}
                />
              </div>
              <div>
                <img
                  src={imageData?.right_side}
                  alt="Image"
                  className="img-fluid cursor-pointer"
                  onClick={rightSide}
                />

              </div>
            </div>
            {/* </SliderforProduct> */}
          </div>
          {/* <div className="img-thumnail d-flex justify-content-center mt-3 gap-1">
              <img
                src={imageData?.front_side}
                alt="Image"
                className="w-25"
                onClick={frontSide}
              />
              <img
                src={imageData?.back_side}
                alt="Image"
                className="w-25"
                onClick={backSide}
              />
              <img
                src={imageData?.left_side}
                alt="Image"
                className="w-25"
                onClick={leftSide}
              />
              <img
                src={imageData?.right_side}
                alt="Image"
                className="w-25"
                onClick={rightSide}
              />
            </div> */}
          <div className="col-md-8">
            {/* <p className=" mt-3 text-light text-bg-dark  text-center fs-5" style={{width:'90px',height: '36px'}}>NEW</p> */}
            <h4 className="mt-3">
              <span className="title ">{productDetails1?.name}</span>
            </h4>
            <div className="rating-price m-0 pt-3">
              <ul className="ratings active d-flex flex-row-reverse">
                {Array.from(
                  { length: Math.floor(productDetails1?.totalrating) },
                  (_, index) => (
                    <li className="star" key={index}>
                      <FontAwesomeIcon icon={faStar} />
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="d-flex gap-4 align-items-center pt-3">
              <div className="product-price m-0">
                {currencyType.symbol}{currencyConversion(productDetails1?.selling_price)}
              </div>
              <p
                className="text-decoration-line-through"
                style={{ fontSize: "24px;", color: "#EE7B7B" }}
              >
                {currencyType.symbol}{currencyConversion(productDetails1?.mrp)}
              </p>
            </div>
            <div className="product-price fs-md-5 fs-6 m-0 pt-3 ">
              {productDetails1?.features}
            </div>
            <div className="d-flex gap-2 pt-3">
              <Button
                btnName={"ADD TO CART"}
                btnStyle={"button1  color-2"}
                functionName={notify3}
                parameter={productDetails1}
              />
              <Button
                btnName={"PLACE ORDER"}
                btnStyle={"button1  color-2"}
                // link={"/billingdetails"}
                // linkNeeded={"yes"}
                functionName={notify5}
              />
              <div className="px-3 ml-2 flex justify-center align-items-center border border-black ">
                <div
                  className="add-to-wishlist "
                  style={{ cursor: "pointer" }}
                  onClick={() => notify4(productDetails1)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className=""
                    style={{ fontSize: "20px", color: "red" }}
                  />
                </div>
              </div>
            </div>

            <div className="product-infor-inner d-flex gap-2 pt-2">
              <table className="fs-6" cellPadding={"8"} cellSpacing={"8"}>
                {colorMapping?.length ? (<><tr> <td colSpan={3} className=" fw-medium mt-3 ">Available Colors</td> </tr>
                  <tr>
                    {colorMapping?.map((color) => {
                      return (<>
                        <Link to={`/product/${color.id}`}>
                          <td></td>
                          <td></td>
                          <td className="color-dot" style={{ backgroundColor: color.color, cursor: "pointer" }} onClick={() => console.log("product color clicked")} ></td>
                        </Link>
                      </>)
                    })}
                  </tr></>) : ""}
                <tr>
                  <td className=" fw-medium mt-3 col-2 ">Product Left</td>
                  <td>:</td>
                  <td className=" mt-3">{productDetails1?.quantity}</td>
                </tr>
                {
                  <tr>
                    <td>
                      { }
                    </td>
                  </tr>
                }

                <tr>
                  <td className=" fw-medium mt-3 ">SKU</td>
                  <td>:</td>
                  <td className=" mt-3">{productDetails1?.code}</td>
                </tr>
                <tr>
                  <td className="fw-medium mt-2">Categories</td>
                  <td>:</td>
                  <td className="mt-2">{productDetails1?.sub_category_name}</td>
                </tr>
                <tr style={{ verticalAlign: "top" }}>
                  <td className="fw-medium">About</td>
                  <td>:</td>
                  <td className="">{productDetails1?.about}</td>
                </tr>
              </table>
              <div style={{ color: "#777" }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
