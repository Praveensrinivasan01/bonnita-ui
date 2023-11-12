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
  const [page, setPage] = useState(1);
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
      }
    } catch (error) {
      console.error("internal server error");
    }
  };

  const getAllCoupon = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-all-coupons?offset=${
          15 * (page - 1)
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
                            className="btn btn-danger"
                            onClick={() => deleteCoupon(item.id)}
                          >
                            delete
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
          <Link
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
            onClick={() => page !== 1 && setPage((prev) => prev - 1)}
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
          </Link>

          <Link
            href="#"
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
          </Link>
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
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Discount Percentage
                </label>
                <input
                  value={discountPercentage}
                  onChange={(e) => setdiscountPercentage(e.target.value)}
                  id="message"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder=" Discount in Percentage"
                />
              </div>

              <button
                type="submit"
                class="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Save
              </button>
              <button
                type="button"
                class="px-3 py-2 mt-3 ms-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
                onClick={handleClose}
              >
                Cancel
              </button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Coupon;
