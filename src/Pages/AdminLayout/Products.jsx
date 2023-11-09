import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
const Products = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [searchParam,setSearchParam]= useState("")
  const [page,setPage]= useState(1)
  const debounceSearchValue = useDebounce(searchParam,1000)
  console.log(searchParam,"searchParam")

  // useEffect(() => {
  //   getproduct();
  // }, []);

  useEffect(()=>{
    getSearchproduct()
  },[debounceSearchValue,page])

  // const getproduct = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/product/get-all-products`,
  //     "admin"
  //   );
  //   if (res.data.statusCode == 200) {
  //     setProduct(res.data.data);
  //     console.log(res, "rest");
  //   }
  // };
  const getSearchproduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-all-products?offset=${(page - 1) * 15}&search=${searchParam}`,
      "admin"
    );
    if (res.data.statusCode == 200) {
      setProduct(res.data.data);
      console.log(res, "rest");
    }
  };

  const handleDelete = async (e) => {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-product/${e}`
    );
    if (response.status == 200) {
      getSearchproduct();
    }
  };

  return (
    <>
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800">Products</h2>

            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              240
            </span>
          </div>

          <p class="mt-1 text-sm text-gray-500">A List Of All Products</p>
        </div>
      </div>

      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="relative flex items-center mt-4 md:mt-0">
          <button
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600"
            onClick={() => navigate(`/admin/products/add`)}
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
            <span>Add Products</span>
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
            onChange={(e)=>setSearchParam(e.target.value)}
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
                      Category
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Sub Category
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      MRP
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      Selling Price
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
                  {product.map((product, index) => (
                    <tr key={index}>
                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.name}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.categoryname}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.subcategoryname}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.quantity}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.mrp}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 ">
                            {product.selling_price}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                        <button
                          type="button"
                          class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          onClick={(e)=>{
                            navigate('/admin/products/'+product.id)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none"
                          onClick={(e) => {
                            handleDelete(product.id);
                          }}
                        >
                          Delete
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

      <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-500">
          Page <span class="font-medium text-gray-700">1 of 10</span>
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <Link
          onClick={()=>page!==1 && setPage((prev)=>prev-1)}
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
          </Link>

          <Link
          onChange={()=>page!==1 && setPage((prev)=>prev+1)}
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
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
