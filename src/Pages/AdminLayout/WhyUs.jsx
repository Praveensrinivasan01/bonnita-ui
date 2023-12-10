import React, { useEffect, useState } from "react";
import { AuthPost, Delete, Get } from "../../../src/Commons/httpService";
import { Link, useNavigate } from "react-router-dom";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";

const WhyUs = () => {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const handleClose = () => {
        Seteditmode(false);
        setModal(false);
        setDescription(null);
        setImage(null);
        setTitle(null);
    };
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [whyus, setwhyus] = useState([]);
    const [file, setFile] = useState({
        left: [],
        right: []
    });
    const [name, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [leftSideImage, setLeftSideImage] = useState(null);
    const [rightSideImage, setRightSideImage] = useState(null);
    const [quote, setQuote] = useState("");
    const [editmode, Seteditmode] = useState(false);
    const [editid, setEditid] = useState("");
    const [searchParam, setSearchParams] = useState("");
    const [data, sendData] = useState([]);
    const [page, setPage] = useState(1);
    const debounceSearchValue = useDebounce(searchParam, 1000)

    const handleFileChange = (e, type,api) => {
        if (e) {
          switch (type) {
            case "leftSideImage":
              setLeftSideImage(api?e:URL.createObjectURL(e.target.files[0]))
              if(!api){
              file?.left.pop()
              file?.left.push(e.target.files[0])
              }
              break;
            case "rightSideImage":
              setRightSideImage(api?e:URL.createObjectURL(e.target.files[0]))
              if(!api){
              file?.right.pop()
              file?.right.push(e.target.files[0])
              }
              break;
          }
        }
    };

    useEffect(() => {
        getwhyus();
    }, []);

    const getwhyus = async () => {
        // setSearchParams()
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL
            }/landingpage/get-whyus-image`, "admin");
        if (res.data.statusCode == 200) {
            setwhyus(res.data.data);
            console.log(res, "rest");
        }
    };


    useEffect(() => {
        console.log("page changed")
        getwhyus();
    }, [debounceSearchValue, page]);

    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    //     const selectedImage = e.target.files[0];
    //     if (selectedImage) {
    //         setImage(URL.createObjectURL(selectedImage));
    //     }
    // };
    // const handleFileChange1 = (e) => {
    //     setFile(e.target.files[0]);
    //     const selectedImage = e.target.files[0];
    //     if (selectedImage) {
    //         setImage1(URL.createObjectURL(selectedImage));
    //     }
    // };

    let editwhyus = (categories) => {
        setModal(true);
        Seteditmode(true);
        setEditid(categories.category_id);
        setTitle(categories.name);
        setDescription(categories.description);
        console.log("categories.whyusDescription::: ", categories.imageData);

        setImage(categories.imageData);
    };
    console.warn(image);

    const handleDelete = async (e) => {
        let response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/product/delete-category/${e}`
        );

        if (response.status == 200) {
            getwhyus();
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("files[]", file.left[0]);
        formData.append("files[]", file.right[0])
        // console.log()

        const isFormDataValid = !Array.from(formData.values()).some(
            (value) => value === null || value === undefined
        );
        console.warn(formData);
        if (isFormDataValid) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/product/upload-product-image/${undefined}`,
                    formData
                );

                console.log("response", response);

                if (response.data.statusCode == 200) {
                    console.log(response);
                    let body = {
                        ...(editmode && { category_id: editid }),
                        // whyus_id:
                        left_content: name,
                        right_content: description,
                        image_id: response?.data?.image?.id,
                    };
                    debugger;
                    let url = editmode
                        ? "admin/update-why-us"
                        : "admin/add-why-us";
                    const resp = await axios.post(
                        `${process.env.REACT_APP_API_URL}/${url}`,
                        body,
                        "admin"
                    );
                    if (resp.data.statusCode == 200) {
                        getwhyus();
                        handleClose();
                    }
                } else {
                    console.error("Image upload failed");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        } else {
            alert("Please fill all fields");
        }
    };
    return (
        <div>
            <div class="mt-2 md:flex md:items-center md:justify-between">
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
                        <span>Add Why Us</span>
                    </button>
                </div>

                <div class="relative flex items-center mt-4 md:mt-0">
                    <span class="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 mx-3 text-gray-400"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                        value={searchParam}
                        class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200  md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setSearchParams(e?.target?.value)}

                    />
                </div>
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
                                            class="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                                        >
                                            Left Title
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                        >
                                            Right Title
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                        >
                                            Left Image
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                        >
                                            Right Image
                                        </th>

                                        {/* <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                        >
                                            Action
                                        </th> */}

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {whyus?.map((whyus, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium">
                                                <div>
                                                    <h2 className="font-medium text-gray-800">
                                                        {whyus.left_content}
                                                    </h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm ">
                                                <div>
                                                    <h4 className="text-gray-700 word-break:break-all">
                                                        {/* {whyus.description} */}
                                                        {whyus.right_content}
                                                    </h4>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm ">
                                                <div>
                                                    <h4 className="text-gray-700 word-break:break-all">
                                                        {/* {whyus?.quote} */}
                                                        <img
                                                            className="object-cover w-16 mx-1 border-2 border-white rounded-full shrink-0"
                                                            src={whyus.front_side}
                                                            alt=""
                                                        />
                                                    </h4>
                                                </div>
                                            </td>

                                            <td className="px-0 py-4 text-sm ">
                                                <div className="flex items-center">
                                                    <img
                                                        className="object-cover w-16 mx-1 border-2 border-white rounded-full shrink-0"
                                                        src={whyus.back_side}
                                                        alt=""
                                                    />
                                                </div>
                                            </td>

                                            {/* <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                                                <button
                                                    onClick={() => editwhyus(whyus)}
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
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div class="text-sm text-gray-500">
                    Page <span class="font-medium text-gray-700">1 of 10</span>
                </div>

                <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <Link
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
                        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
                        onClick={() => page !== 1 && setPage((prev) => prev + 1)}

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
            </div> */}

            <Modal
                size="2xl"
                scrollBehavior="inside"
                backdrop="blur"
                isOpen={modal}
                onOpenChange={() => setModal(!modal)}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {editmode ? "Edit WhyUs" : "Add WhyUs"}
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <label
                                for="default-input"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                htmlFor="default-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Left Content
                            </label>
                            <input
                                value={name}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                // onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="default-input"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Left Content"
                            />
                        </div>
                        <div>
                            <label
                                for="message"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Right Content
                            </label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="message"
                                rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Right Content"
                            />
                        </div>
                        {/* <div>
                            <label
                                for="message"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Quote
                            </label>
                            <textarea
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                                id="message"
                                rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write thoughts here..."
                            ></textarea>
                        </div> */}
                        <div>
                            <label class="block">
                                <span class="sr-only">Choose Left image</span>
                                <input
                                    accept="image/*"
                                    onChange={(e)=>handleFileChange(e,'leftSideImage')}
                                    type="file"
                                    class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
                                />
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span class="sr-only">Choose Left image</span>
                                <input
                                    accept="image/*"
                                    onChange={(e)=>handleFileChange(e,'rightSideImage')}
                                    type="file"
                                    class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
                                />
                            </label>
                        </div>
                        {leftSideImage && (
                            <div>
                                <img
                                    class="rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60"
                                    src={leftSideImage}
                                    alt="Image Description"
                                />
                            </div>
                        )}
                        {rightSideImage && (
                            <div>
                                <img
                                    class="rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60"
                                    src={rightSideImage}
                                    alt="Image Description"
                                />
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            onClick={() => {
                                handleUpload(whyus);
                            }}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            class="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
                            className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default WhyUs