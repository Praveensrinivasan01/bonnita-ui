import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Banner = () => {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState([])
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(0);
  const [TotalCount, SetTotalCount] = useState()

  const handleFileChange = (e) => {
    console.log("image", e.target.files[0])
    setFile(e.target.files[0]);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      console.log("formData", file)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/landingpage/upload-image`,
        formData
      );
      if (response.data.statusCode == 200) {
        SetTotalCount(response?.count)
        handleClose()
      }
    } catch (e) {
      console.log(e)
      return
    }
  }

  const handleClose = () => {
    setModal(false);
    setImage(null);
  };

  useEffect(() => {
    getBanner()
  }, [])

  const getBanner = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/landingpage/get-banner-image?offset=${15 * (page)}`
    )
    if (response?.data.statusCode === 200) {
      setBanner(response?.data?.data)
    }
  }

  const handleDelete = async (e) => {
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/landingpage/delete-banner-image/${e}`
    );
    if (response.status === 200) {
      getBanner();
    }
  };

  return (
    <div>
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
        <span>Add Banner</span>
      </button>

      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                    >
                      S.No
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Image
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Action
                    </th>


                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {banner?.map((banner, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800">
                            {((page - 1) * 15) + (index + 1)}
                          </h2>
                        </div>
                      </td>

                      <td className="px-0 py-4 text-sm ">
                        <div className="flex items-center">
                          <img
                            className="object-cover w-16 mx-1 border-2 border-white rounded-full shrink-0"
                            src={banner.imageData}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                        {/* <button
                          onClick={() => editBanner(banner)}
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white border-2 border-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-200"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.968 2.032C13.5207 1.58467 12.914 1.33337 12.2813 1.33337C11.6487 1.33337 11.042 1.58467 10.5947 2.032L2.62667 10C2.35586 10.2708 2.16547 10.6114 2.07667 10.984L1.34667 14.052C1.3269 14.1351 1.32876 14.2219 1.35205 14.3041C1.37535 14.3862 1.41931 14.4611 1.47974 14.5214C1.54018 14.5818 1.61507 14.6257 1.69727 14.6489C1.77948 14.6721 1.86626 14.6739 1.94934 14.654L5.01667 13.9233C5.38946 13.8346 5.73033 13.6442 6.00134 13.3733L13.968 5.40667C14.4153 4.95933 14.6666 4.35262 14.6666 3.72C14.6666 3.08738 14.4153 2.48067 13.968 2.03333V2.032ZM11.3013 2.73867C11.43 2.60997 11.5828 2.50788 11.751 2.43823C11.9191 2.36858 12.0993 2.33274 12.2813 2.33274C12.4633 2.33274 12.6436 2.36858 12.8117 2.43823C12.9799 2.50788 13.1326 2.60997 13.2613 2.73867C13.39 2.86736 13.4921 3.02015 13.5618 3.18829C13.6314 3.35644 13.6673 3.53666 13.6673 3.71867C13.6673 3.90067 13.6314 4.08089 13.5618 4.24904C13.4921 4.41719 13.39 4.56997 13.2613 4.69867L12.6667 5.29267L10.7067 3.33333L11.3013 2.73933V2.73867ZM10 4.04133L11.96 6L5.29334 12.6667C5.15334 12.8067 4.97734 12.9047 4.78467 12.9507L2.50734 13.4933L3.04934 11.216C3.09534 11.0227 3.194 10.8467 3.334 10.7067L10 4.04V4.04133Z"
                              fill="black"
                            />
                          </svg>
                        </button> */}
                        <button
                          onClick={(e) => {
                            handleDelete(banner.id);
                          }}
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white border-2 border-red-200 focus:ring-1 focus:outline-none focus:ring-red-200"
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
                  ))}
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

      <Modal
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={modal}
        onOpenChange={handleClose}
      >
        <ModalContent>
          {/* <ModalHeader className="flex flex-col gap-1">
            {editmode ? "Edit Category" : "Add Category"}
          </ModalHeader> */}
          <h2 className="pt-4 ps-4 pb-2">Add Home Banner</h2>
          <ModalBody>
            <div className="">

              <label class="block">
                <span class="sr-only">Choose Home Banner image</span>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  type="file"
                  class="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:border-0
                  file:text-sm file:font-semibold
                  file:bg-slate-900 file:text-white
                  hover:file:bg-slate-800 file:cursor-pointer"
                />
              </label>
            </div>
            {image && (
              <div>
                <img
                  class="rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60"
                  src={image}
                  alt="Image Description"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-red-400  hover:bg-red-300 "
              onClick={() => {
                handleUpload(banner);
              }}
            >
              Save
            </button>
            <button
              type="button"

              className="px-3 py-2 text-sm font-medium text-center text-red-400 border-2  border-red-400  bg-white  hover:bg-red-300 focus:outline-none"
              onClick={handleClose}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Banner;
