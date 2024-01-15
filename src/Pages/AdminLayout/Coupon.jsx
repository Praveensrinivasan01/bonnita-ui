import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { button } from "@nextui-org/theme";

const Coupon = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [buttonValue, setButtonValue] = useState("active");
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    Seteditmode(false);
    setModal(false);
    setdiscountPercentage(null);
    setName(null);
  };

  const [getCouponValue, setCouponValue] = useState([]);

  const [name, setName] = useState("");
  const [discountPercentage, setdiscountPercentage] = useState("");
  const [editmode, Seteditmode] = useState(false);
  let count = 0;

  const PostCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/add-coupon`,
        {
          coupon_name: name,
          discount_percent: discountPercentage,
        }
      );
      if (response.data.statusCode === 200) {
        getAllCoupon();
        handleClose()
      }
    } catch (error) {
      console.error("internal server error");
    }
  };

  const getAllCoupon = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-all-coupons?offset=${
          15 * (page)
        }`
      );
      if (response?.data?.statusCode === 200) {
        if (response?.data?.data) {
          setCouponValue(response.data.data);
        }
      } else {
        console.log("else");
      }
    } catch (error) {
      console.error("internal server error");
    }
  };

  const deleteCoupon = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/delete-coupon/${id}`
      );
      if (response.data.statusCode === 200) {
        getAllCoupon();
      }
    } catch (error) {}
  };
  

  const HandleActive = async (buttonValue,id) => {

    try {
        console.log(buttonValue,"buttonvalue1")
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/change-coupon-status`,
        {
          status: buttonValue,
          coupon_id: id,
        }

      );

      if (response.data.statusCode === 200) {
        getAllCoupon()
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCoupon();
  }, []);

  console.log(buttonValue,"buttonvalue")

  return (
    <>
      <h3 className="font-bold text-3xl pt-7">Manage Coupon</h3>

      <div class="relative flex items-center mt-4 md:mt-0">
        <button
          class="flex items-center justify-center w-1/2 px-3 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-slate-900 shrink-0 sm:w-auto gap-x-2 hover:border-gray-700 border-transparent border-2"
          onClick={() => setModal(!modal)}
        >
          <svg  
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Add Coupon</span>
        </button>
      </div>

      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      SI.No
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Coupon Code
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Disconted Amount
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {getCouponValue?.map((item) => {
                    return (
                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 ">
                              {(count = count + 1)}
                            </h2>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 ">
                              {item.coupon_name}
                            </h2>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 ">
                              {item.discount_percent}
                            </h2>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                          <button
                            type="button"
                            className={`px-3 py-2 text-sm font-medium text-center text-white focus:outline-none rounded-md ${
                                item.status==="active" ? "bg-green-700" : "bg-red-700"
                            }`}
                            onClick={() => {
                              
                              HandleActive(item.status==="active"?"inactive":"active",item.id);
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td>
                          <button
                          className="px-3 py-2 text-sm font-medium text-center text-white border-2 border-red-200 focus:ring-1 focus:outline-none focus:ring-red-200"
                            onClick={() => deleteCoupon(item.id)}
                          >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.66666 14C4.29999 14 3.98599 13.8693 3.72466 13.608C3.46332 13.3467 3.33288 13.0329 3.33332 12.6667V4H2.66666V2.66667H5.99999V2H9.99999V2.66667H13.3333V4H12.6667V12.6667C12.6667 13.0333 12.536 13.3473 12.2747 13.6087C12.0133 13.87 11.6995 14.0004 11.3333 14H4.66666ZM11.3333 4H4.66666V12.6667H11.3333V4ZM5.99999 11.3333H7.33332V5.33333H5.99999V11.3333ZM8.66666 11.3333H9.99999V5.33333H8.66666V11.3333Z"
                              fill="#EE7B7B"
                            />
                          </svg>
                            
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-500">
          Page <span class="font-medium text-gray-700">1 of 10</span>
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <button
           
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
            onClick={() => page !== 0 && setPage((prev) => prev - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>Previous</span>
          </button>

          <button
           
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
            onClick={() => page !== 1 && setPage((prev) => prev - 1)}
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={modal}
        onOpenChange={handleClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {editmode ? "" : "Add Coupon"}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={PostCoupon}>
              <div>
                <label
                  for="default-input"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Coupon code
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  id="default-input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Coupon code"
                  required
                />
              </div>
              <div>
                <label
                  for="message"
                  class="block mt-3 mb-2 text-sm font-medium text-gray-900"
                >
                  Discount Amount
                </label>
                <input
                  value={discountPercentage}
                  onChange={(e) => setdiscountPercentage(e.target.value)}
                  id="message"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder=" Discount in Amount"
                />
              </div>
             
            </form>
          </ModalBody>
          <ModalFooter><button
                type="button"
                className="px-3 py-2 text-sm font-medium text-center text-red-400 border-2  border-red-400  bg-white  hover:bg-red-300 focus:outline-none"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                class="px-3 py-2 text-sm font-medium text-center text-white bg-red-400  hover:bg-red-300 "
              >
                Save
              </button></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Coupon;
