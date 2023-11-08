import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Dropdown from "../../Components/dropdown";

const Users = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParams] = useState("");
  const debounceSearchValue = useDebounce(searchParam, 1000);

  useEffect(() => {
    getAllCustomers();
  }, [page, debounceSearchValue]);

  const getAllCustomers = async () => {
    const usersResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/get-all-customers?offset=${
        (page - 1) * 15
      }&search=${searchParam}`,
      {},
      "admin"
    );
    if (usersResponse?.data?.statusCode === 200) {
      setData(usersResponse.data.customers);
    }
  };


  return (
    <>
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800">Users</h2>
            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              240
            </span>
          </div>

          <p class="mt-1 text-sm text-gray-500">A List Of All Users</p>
        </div>
      </div>

      <div class="mt-2 md:flex md:items-center md:justify-between">
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
            onChange={(e) => setSearchParams(e.target.value)}
            class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      <Link to=""></Link>
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
                        Email
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Phone
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Total Buys
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Total Spend
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Joined On
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {data?.map((user) => {
                      return (
                        <>
                          <tr>
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.username}
                                </h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.email}
                                </h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.mobile}
                                </h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.total_quantity}
                                </h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.total_sum}
                                </h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">
                                  {user.created_date}
                                </h2>
                              </div>
                            </td>
                          </tr>
                        </>
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
      </div>
    </>
  );
};

export default Users;
