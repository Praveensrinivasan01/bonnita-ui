import React, { useContext, useEffect, useState } from "react";
import "../../Styles/ordersummery.css";
import { Link } from "react-router-dom";
import { loginStore } from "../../Zustand/loginStore";
import axios from "axios";
import { useCurrencyStore } from "../../Zustand/currency";
import { AuthContext } from "../../Context/AuthContext";
import image from '../../Assets/NoDataImage/NoDataFound.jpg'

const AccountInfo = () => {
  const [activeTab, setActiveTab] = useState("MyOrder");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [orderDetails, setOrderDetails] = useState()
  const [TotalCount, SetTotalCount] = useState()

  const state2 = loginStore((state) => state.login);
  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };



  const { fetchData, fetchDataFav } = useContext(AuthContext);
  useEffect(() => {
    fetchDataFav();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const getPrdouctDetails = async () => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/get-order/${state2.id}?offset=${(page) * 15}`)
      if (response?.data?.statusCode === 200) {
        SetTotalCount(response?.data?.count)
        setOrderDetails(response?.data?.data)
      } else {
        console.log(response.data.statusCode)
      }

    } catch (error) {
      console.error("Internal Server error")
    }
  }

  useEffect(() => {
    getPrdouctDetails()

  }, [page])

  useEffect(() => {
    getAssignedUsers()
  }, [])

  console.log(orderDetails, "orderDetails")

  const [userCoupon, setUserCoupon] = useState([])

  const getAssignedUsers = async () => {

    try {
      let body = {
        user_id: state2?.id
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/assigned-coupon`, body
      );
      console.log("USER COUPON", response?.data?.data)

      console.log("CouponName")

      setUserCoupon(response?.data?.data);
    } catch (error) {
      console.error("internal server error");
    }
  }


  return (
    <div className="">
      <div className="orderSummery PaddingTop container-md mb-5">
        <div className="topic">Bonnita</div>
        <div className="content123 flex-col ">
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

          <div className="list sticky">
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
              <span>Coupons</span>
            </label>

            {/* <label
              htmlFor="Profile"
              className={activeTab === "Profile" ? "Profile active" : "Profile"}
            >
              <span>Profile Information</span>
            </label> */}
            <div
              className="slider"
              style={{
                top: `${activeTab === "MyOrder"
                  ? 0
                  : activeTab === "Mycoupons"
                    ? 60
                    : activeTab === "AllNotification"
                  }px`,
              }}
            />
          </div>
          <div className="text-content">

            {
              orderDetails?.length > 0 ?
                <div
                  className={`MyOrder text ${activeTab === "MyOrder" ? "active" : ""
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
                                    className="px-4 py-3.5 text-sm font-normal text-center text-gray-500"
                                  >
                                    SI No
                                  </th>
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
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center text-gray-500"
                                  >
                                    Order Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {orderDetails?.map((item, index) => {
                                  return (

                                    <tr style={{ cursor: "pointer" }}>
                                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div className="flex justify-center items-center">
                                          {/* <img
                                          className="font-medium text-gray-800 w-36"
                                          src={item.front_side}
                                        /> */}
                                          <h2 className="font-medium text-gray-800 ">
                                            {
                                              (((page == 0 ? 1 : page) - 1) * 15) + (index + 1)
                                            }
                                          </h2>
                                        </div>
                                      </td>
                                      <Link to={`/orderDetails/${item.order_id}`}>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                          <div className="flex justify-center items-center">
                                            {/* <img
                                          className="font-medium text-gray-800 w-36"
                                          src={item.front_side}
                                        /> */}
                                            <h2 className="font-medium text-gray-800 ms-3">
                                              {
                                                item.product_name[0]
                                              }
                                            </h2>
                                          </div>
                                        </td>
                                      </Link>

                                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <Link to={`/orderDetails/${item.order_id}`}>
                                          <div>
                                            <h2 className="font-medium text-gray-800 ">
                                              {currencyType?.symbol}{currencyConversion(item.total)}
                                            </h2>
                                          </div>
                                        </Link>
                                      </td>

                                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <Link to={`/orderDetails/${item.order_id}`}>
                                          <div>
                                            <h2 className="font-medium text-gray-800  ">
                                              {item?.status === "PENDING" ? "ORDER PLACED" : item?.status}
                                            </h2>
                                          </div>
                                        </Link>
                                      </td>
                                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <Link to={`/orderDetails/${item.order_id}`}>
                                          <div className="flex justify-center items-center">
                                            {/* <img
                                          className="font-medium text-gray-800 w-36"
                                          src={item.front_side}
                                        /> */}
                                            <h2 className="font-medium text-gray-800 ">
                                              {
                                                item.created_date
                                              }
                                            </h2>
                                          </div>
                                        </Link>
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
                    <div className="d-flex justify-content-end">
                      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">

                        {
                          Math.floor(TotalCount / 15) >= page &&
                          <>
                            {
                              page !== 0 && (
                                <button
                                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
                                  onClick={() => setPage((prev) => prev - 1)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                                  </svg>

                                  <span>Previous</span>
                                </button>
                              )
                            }

                            {
                              Math.floor(TotalCount / 15) > page && (

                                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
                                  onClick={() => setPage(page + 1)}>


                                  <span>Next</span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                  </svg>
                                </button>
                              )
                            }

                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                :
                activeTab === "MyOrder" &&
                <div className="flex justify-center">
                  <img src={image} className="w-96" />
                </div>
            }

            <div
              className={`Mycoupons text ${activeTab === "Mycoupons" ? "active" : ""
                }`}
            >
              <div className="title">

                {
                  userCoupon?.length ? (

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              SI.NO
                            </th>
                            <th scope="col" class="px-6 py-3">
                              COUPONE CODE
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Coupon Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {

                            userCoupon?.map((item, index) => (

                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {index + 1}
                                </th>
                                <td class="px-6 py-4">
                                  {item?.coupon_name}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.discount_percent}
                                </td>
                              </tr>

                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                    :
                    activeTab === "Mycoupons" && userCoupon?.length === 0 &&
                    <div className="flex justify-center">
                      <img src={image} className="w-96" />
                    </div>
                }

              </div>
            </div>

            {/* <div
              className={`Profile text ${
                activeTab === "Profile" ? "active" : ""
              }`}
            >
              <div className="title">
                <p>UserName</p>:
                <p>EmailId</p>:
                <p>Contact no</p>
                <p>Bonus Points</p>
              </div>
              
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
