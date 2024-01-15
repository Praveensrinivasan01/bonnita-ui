import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TopFilters = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("top_products");
  const [filterData, setFilterData] = useState([]);
  const [searchParam, setSearchParams] = useState("");
  const [TotalCount, SetTotalCount] = useState()
  useEffect(() => {

    getFilteredValue();
  }, [page, filter]);


  const getFilteredValue = async () => {
    const filterResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-top-records?offset=${(page) * 15
      }&sort=${filter}`,
      {},
      "admin"
    );
    console.log(filterResponse.data.statusCode, "filterResponse")
    if (filterResponse?.data?.statusCode === 200) {
      SetTotalCount(filterResponse?.data.count)
      setFilterData(filterResponse?.data?.data);
    }
  };
  return (
    <div>
      <div class="relative flex items-center mt-4 md:mt-0">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Top Records
        </label>
        <select
          id="countries"
          class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ml-2 p-2.5"
          onChange={(e) => {
            setFilter(e.target.value);
            //   getFilteredValue();
          }}
        >
          <option selected>Select</option>
          <option value="top_products" selected>Top Products</option>
          <option value="sales_by_location">Sales by Location</option>
          <option value="top_customers">Top Customers</option>
        </select>
      </div>

      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 md:rounded-lg">
              {
                filter === "top_products" ?
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                        >
                          Product Name
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                        >
                          Product code
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                        >
                          Product Quantity
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {filterData?.map((user) => {
                        return (
                          <>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 class="font-medium text-gray-800 ">{user.product_name}</h2>
                                </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 class="font-medium text-gray-800 ">{user.code}</h2>
                                </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 class="font-medium text-gray-800 ">{user.quantity}</h2>
                                </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 class="font-medium text-gray-800 ">{user?.price}</h2>
                                </div>
                              </td>

                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  :
                  filter === "sales_by_location" ? <>

                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                          >
                            State
                          </th>

                          {/* <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Product code
                      </th> */}

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
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {filterData?.map((user) => {
                          return (
                            <>
                              <tr>
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.state}</h2>
                                  </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.quantity}</h2>
                                  </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.total}</h2>
                                  </div>
                                </td>

                                {/* <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user?.price}</h2>
                              </div>
                            </td> */}

                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </> : <>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                          >
                            Customer Name
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                          >
                            total
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {filterData?.map((user) => {
                          return (
                            <>
                              <tr>
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.username}</h2>
                                  </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.quantity}</h2>
                                  </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 ">{user.total}</h2>
                                  </div>
                                </td>

                                {/* <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user?.price}</h2>
                              </div>
                            </td> */}

                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
              }
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
  )
}

export default TopFilters