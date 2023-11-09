import React, { useEffect } from "react";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import img from "../../Assets/LandingPageImages/product-35.jpg";
import Cart from './../Cart';
import {  removeAllFav, removeFav, wishList } from "../../Zustand/wishListStore";
import Button from "../../Components/Button";
import { toast } from "react-toastify";
import { increment } from "../../Zustand/cartStore";
import  {useState}  from "react";
import axios from "axios";
import { loginStore } from "../../Zustand/loginStore";

const Wishlist = () => {

  const state2 = loginStore((state) => state.login);
  const state2Id = state2?.id;
  useEffect(() => {
    if(state2Id){
      deleteData();
      getCategories();
    }
  },[]);

  console.log(state2Id,"item")
  
  const [favData,setFavData] = useState([])

  const iconStyles1 = {
    color: "#FF98A6",
    fontSize: "24px",
  };

  const stateOfFav = wishList((state)=>state.wishList)

  const notify = (products) => {
    
  };
  
  const getCategories = async () => {
    if(state2Id){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-favourites/${state2Id}`).then((res) => {
        if (res?.data?.statusCode === 200) {
          setFavData(res?.data?.data);
        }
      });
    }
  };

  const deleteData = async (wishlist) => {
    if (wishlist) { 
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete-favourites/${state2Id}/${wishlist.id}`).then((res) => {
        if (res?.data?.statusCode === 200) {
          removeFav(wishlist)
          setFavData(res?.data?.data);
        }
      });
    } else {
      console.error("Wishlist is undefined");
    }
  };
  
  const Instock = 1;
  return (
    <div className=" container-md PaddingTop mb-5">
   {
    favData?.length ? (
    <div>
      <div>
        <h4 className="mt-3 fs-6 fw-medium">
          <Link to="/shopsiderbar">
            <span style={{ color: "#777" }}>Shop</span>
          </Link>
          / Favourites 
        </h4>
        <h3 className="mt-3 mb-3 fs-3 fw-medium"> Favourites</h3>
      </div>
      <div className="row tableForAddtoCart mt-3 p-3 rounded-0 d-md-flex d-none">
        <div className="col-5 fw-semibold fs-5">Product</div>
        <div className="col-2 fw-semibold fs-5">Price</div>
        <div className="col-5 fw-semibold fs-5">Stock</div>
      </div>
    </div>
  ) : (
    <div>
      <h2>There is no favorites to show</h2>
    </div>
  )
}
      {
        favData?.map((wishlist)=>(
      <div className="row tableForAddtoCart border-top-0 rounded-0 py-4 d-flex align-items-center">
        <div className="col-md-5 d-flex align-items-center">
          <img src={wishlist?.front_side} className="img-fluid w-28 md:w-36 pe-3" />
          {wishlist.name}
        </div>
        <div className="col-md-2 col-5 text-dark">{wishlist.mrp}</div>
        <div className="col-md-5 col-7 ">
        <div className="d-flex justify-content-between align-items-center col-lg-8 col-md-10 col-12">

          <span className="" style={{ color: Instock ? "#20C86D" : "#777" }}>
            Instock
          </span>
          {/* <Button btnName={"Add to Cart"} btnStyle={"button1  color-2"} functionName={notify} parameter={wishlist}/> */}
          <button className="button1 color-2" onClick={()=>increment(wishlist,state2)} >Add to Cart</button>
          <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: "pointer", ...iconStyles1 }}
                  className=""
                  onClick={()=>{deleteData(wishlist)}}
                />
        </div>
        </div>
      </div>

        ))
      }
    </div>
  );
};

export default Wishlist;
