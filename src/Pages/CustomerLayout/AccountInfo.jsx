import React, { useEffect, useState } from "react";
import "../../Styles/ordersummery.css";
import { Link } from "react-router-dom";
import { loginStore } from "../../Zustand/loginStore";
import axios from "axios";

const AccountInfo = () => {
  const [activeTab, setActiveTab] = useState("MyOrder");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderDetails,setOrderDetails] = useState()

  const state2 = loginStore((state) => state.login);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getPrdouctDetails = async()=>{
    try {

      const response =await axios.post(`${process.env.REACT_APP_API_URL}/order/get-order/${state2.id}?offset=${(page - 1) * 15}`)
      if(response?.data?.statusCode===200){
        setOrderDetails(response?.data?.data)
      }else{
        console.log(response.data.statusCode)
      }
      
    } catch (error) {
      console.error("Internal Server error")
    }
  }

  useEffect(()=>{
    getPrdouctDetails()
  },[])


  return (
    <div className="">
      <div className="orderSummery PaddingTop container-md mb-5">
        <div className="topic">Bonnita</div>
        <div className="content123 ">
          <input
            type="radio"
            name="slider"
            checked={activeTab === "MyOrder"}
            id="MyOrder"
            onChange={() => handleTabChange("MyOrder")}
          />
          <input
            type="radio"
            name="slider"
            checked={activeTab === "Mycoupons"}
            id="Mycoupons"
            onChange={() => handleTabChange("Mycoupons")}
          />
          <input
            type="radio"
            name="slider"
            checked={activeTab === "AllNotification"}
            id="AllNotification"
            onChange={() => handleTabChange("AllNotification")}
          />
          <input
            type="radio"
            name="slider"
            checked={activeTab === "Whishlist"}
            id="Whishlist"
            onChange={() => handleTabChange("Whishlist")}
          />
          <input
            type="radio"
            name="slider"
            checked={activeTab === "Profile"}
            id="Profile"
            onChange={() => handleTabChange("Profile")}
          />

          <div className="list">
            <label
              htmlFor="MyOrder"
              className={activeTab === "MyOrder" ? "MyOrder active" : "MyOrder"}
            >
              <span>My Order</span>
            </label>
            <label
              htmlFor="Mycoupons"
              className={
                activeTab === "Mycoupons" ? "Mycoupons active" : "Mycoupons"
              }
            >
              <span>Manage Addresses</span>
            </label>
            <label
              htmlFor="AllNotification"
              className={
                activeTab === "AllNotification"
                  ? "AllNotification active"
                  : "AllNotification"
              }
            >
              <span>Gift Cards</span>
            </label>
            <label
              htmlFor="Whishlist"
              className={
                activeTab === "Whishlist" ? "Whishlist active" : "Whishlist"
              }
            >
              <span>My Whishlist</span>
            </label>
            <label
              htmlFor="Profile"
              className={activeTab === "Profile" ? "Profile active" : "Profile"}
            >
              <span>Profile Information</span>
            </label>
            <div
              className="slider"
              style={{
                top: `${
                  activeTab === "MyOrder"
                    ? 0
                    : activeTab === "Mycoupons"
                    ? 60
                    : activeTab === "AllNotification"
                    ? 120
                    : activeTab === "Whishlist"
                    ? 180
                    : 240
                }px`,
              }}
            />
          </div>
          <div className="text-content">
            <div
              className={`MyOrder text ${
                activeTab === "MyOrder" ? "active" : ""
              }`}
            >
              <div className="title">
                <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                              >
                                Product Name
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                              >
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {orderDetails?.map((item) => {
                            return (

                            <tr style={{ cursor: "pointer" }}>
                              <Link to={`/orderDetails/${item.order_id}`}>
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div className="flex justify-center items-center">
                                    <img
                                      className="font-medium text-gray-800 w-36"
                                      src={item.front_side}
                                    />
                                    <h2 className="font-medium text-gray-800 ms-3">
                                      {
                                        item.product_name[0]
                                      }
                                    </h2>
                                  </div>
                                </td>
                              </Link>

                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 ">
                                    {item.total}
                                  </h2>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 ">
                                    {item.status}
                                  </h2>
                                </div>
                              </td>
                            </tr>

                            )
                            })}      
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`Mycoupons text ${
                activeTab === "Mycoupons" ? "active" : ""
              }`}
            >
              <div className="title">
                Manage Addresses
                <div className="max-w-sm mt-4  rounded overflow-hidden shadow-md flex justify-between items-center">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Address</div>
                    <p className="text-gray-700 text-base"> No.22 Ganapathi Street Poothapedu Ramapuram Chennai-89</p>
                  </div>
                  <div className="px-6 py-4">
                    <button className="bg-blue-700 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">Edit</button>
                  </div>

                </div>
              </div>
            </div>
            <div
              className={`AllNotification text ${
                activeTab === "AllNotification" ? "active" : ""
              }`}
            >
              <div className="title">AllNotification</div>
            </div>
            <div
              className={`Whishlist text ${
                activeTab === "Whishlist" ? "active" : ""
              }`}
            >
              <div className="title">Whishlist</div>
            </div>
            <div
              className={`Profile text ${
                activeTab === "Profile" ? "active" : ""
              }`}
            >
              <div className="title">Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
