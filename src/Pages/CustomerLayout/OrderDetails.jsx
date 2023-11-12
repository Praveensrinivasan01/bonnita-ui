import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export const CustomerOrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const getOrderDetails = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/get-order-items/${id}`
      );
      if (response?.data?.statusCode === 200) {
        setOrderDetails(response.data.data);
        console.log(orderDetails, "orderDetails");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className=" container-md">
      <h1 className="pt-48 font-semibold pb-10">
        <Link to={-1} className="text-gray-600">
          OrderDetails
        </Link>
        /<span>id</span>
      </h1>

      {/* <div className="max-w-sm rounded overflow-hidden shadow-md ">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Address</div>
          <p className="text-gray-700 text-base"></p>
        </div>
      </div> */}
      <div className="font-bold text-xl">Product Info</div>
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
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex item-center">
                                  <img src={item.front_side} alt="#" className="w-32" />
                                  <p className="text-gray-700 text-base lg:mt-10 lg:ms-3">{item.name}</p>
                                </td>
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                <p>{item.quantity}</p>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 ">
                                  <p>{item.price}</p>
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
  );
};
