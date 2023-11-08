import React, { useEffect, useState } from "react";
import { AuthPost, Delete, Get } from "../../../src/Commons/httpService";
import { useNavigate , useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
const SubCategories = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [modal, setModal] = useState(false);
    const handleClose = () => {
      Seteditmode(false);
      setModal(false);
      setDescription(null);
      // setImage(null);
      setName(null);
    };

    const [catogories, setCatogories] = useState([]);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editmode, Seteditmode] = useState(false);
    const [editid, setEditid] = useState("");
    const [searchParam, setSearchParams] = useState("");
    const debounceSearchValue = useDebounce(searchParam,1000) 
      const [page, setPage] = useState(1);
    useEffect(() => {
      getcatogories();
    }, []);

    useEffect(()=>{
      getAllcatogories()
    },[debounceSearchValue,page])

    const getcatogories = async () => {
      getAllcatogories()
    };

  const getAllcatogories = async () => {
      const res =  await axios.get(`${process.env.REACT_APP_API_URL}/admin/get-all-subcategory/${id}?search=${searchParam}&offset=${
        15 * (page - 1)
      } `, "admin")
           if (res.data.statusCode == 200) {
          setCatogories(res.data.data);
           } else {
             setCatogories([])
          }
  };
  
    let editCategory = (categories) => {
      setModal(true);
      Seteditmode(true);
      setEditid(categories.category_id);
      setName(categories.name);
      setDescription(categories.description);
      // console.log(
      //   "categories.catogoriesDescription::: ",
      //   categories.catogoriesImage
      // );
  
      // setImage(categories.catogoriesImage);
    };
    // console.warn(image);
  
    const handleDelete = async (e) => {
      let response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete-subcategory/${e}`)
          if (response.status == 200) {
            getcatogories();
          }
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
  
      const isFormDataValid = !Array.from(formData.values()).some(
        (value) => value === null || value === undefined
      );
      console.warn(formData);
      if (isFormDataValid) {
       try {

        let body = {
              ...(editmode && { category_id: editid }),
              subcategory_name: name,
              subcategory_description: description,
              // subcategory_image_id: response?.data?.image?.id,
              category_id: id,

            };
            let url = editmode ? "product/update-subcategory" : "product/add-subcategory";
            const resp = await axios.post(`${process.env.REACT_APP_API_URL}/${url}`, body, "admin")
            console.log(resp)
                if (resp.data.statusCode == 200) {
                  getcatogories();
                  handleClose();
                }
        } catch (error) {
          console.error("Network error:", error);
        }
      } else {
        alert("Please fill all fields");
      }
    };
  

  return (
    <>
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800">Sub Categories Of "Category"</h2>

            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              240
            </span>
          </div>

          <p class="mt-1 text-sm text-gray-500">A List Of All Sub Categories Under "Category"</p>
        </div>
      </div>

      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="relative flex items-center mt-4 md:mt-0">
          <button
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600"
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
            <span>Add Sub Categories</span>
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
            onChange={(e)=>setSearchParams(e.target.value)}
            class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                      Name
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Action
                    </th>
                    {/* <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Product
                    </th> */}

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {catogories.map((catogories, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800">
                            {catogories.name}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700">
                            {catogories.description}
                          </h4>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                        <button
                          onClick={() => editCategory(catogories)}
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            handleDelete(catogories.id);
                          }}
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                      {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          onClick={() =>
                            navigate(`/admin/products`)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
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
                      </td> */}
                    </tr>
                  ))}
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
          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
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
          </a>

          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
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
          </a>
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
            {editmode ? "Edit Sub-Category" : "Add Sub-Category"}
          </ModalHeader>
          <ModalBody>
            <div>
              <label
                for="default-input"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Category Name"
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write category thoughts here..."
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={() => {
                handleUpload(catogories);
              }}
            >
              Save
            </button>
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
              onClick={handleClose}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SubCategories