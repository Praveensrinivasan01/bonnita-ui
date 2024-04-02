import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Queries = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("pending");
    const [filterData, setFilterData] = useState([]);
    const [TotalCount, SetTotalCount] = useState()

    const getCoustomerQuery = async ()=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/get-query?offset=${
            (page ) * 15
          }&status=${filter}`)
          if(response.data.statusCode===200){
            console.log(response);
            setFilterData(response.data.data)
            SetTotalCount(response.data.count)
          } else if (response.data.statusCode === 400) {
            setFilterData([])
          }
    }

    const HandleQueryStatus = async(status,id)=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/update-query`,
        {
            id:id,
            status:status
        })
        if(response.data.statusCode===200){
            getCoustomerQuery().then(r=>toast.success("Status Updated"))
        }
    }

    useEffect(()=>{
        getCoustomerQuery()
    },[page,filter])
  return (
    <div>
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800">Queries</h2>

           
          </div>

          <p class="mt-1 text-sm text-gray-500">A List Of All Enquiries</p>
        </div>
      </div>
        <div class="relative flex items-center mt-4 md:mt-0">
          
          <select
            id="countries"
            class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ml-2 p-2.5"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            
            {/* <option value="All" selected>All</option> */}
            <option value="completed" >Completed</option>
            <option value="pending" selected>Pending</option>
          </select>
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
                        Customer Name
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Customer PhoneNumber
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Customer EmailId
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Query
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Comments
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Action 
                      </th>
                    </tr>
                  </thead>
                  
              {
                filter==="pending" ?
                  <tbody class="bg-white divide-y divide-gray-200">
                    {filterData?.map((user) => {
                      return (
                        <>
                          <tr>
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.name}</h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.mobile}</h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.email}</h2>
                              </div>
                            </td>
                            
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.query}</h2>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.comments}</h2>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                          <button
                            type="button"
                            className={`px-3 py-2 text-sm font-medium text-center text-white focus:outline-none rounded-md ${
                                user.status==="completed" ? "bg-green-700" : "bg-yellow-500"
                            }`}
                            onClick={() => {
                              
                              HandleQueryStatus(user.status==="completed"?"pending":"completed",user.id);
                            }}
                          >
                            {user.status}
                          </button>
                        </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
              :<>
              <tbody class="bg-white divide-y divide-gray-200">
                    {filterData?.map((user) => {
                      return (
                        <>
                          <tr>
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.name}</h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.mobile}</h2>
                              </div>
                            </td>

                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.email}</h2>
                              </div>
                            </td>
                            
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.query}</h2>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 class="font-medium text-gray-800 ">{user.comments}</h2>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap flex gap-2">
                          <button
                            type="button"
                            className={`px-3 py-2 text-sm font-medium text-center text-white focus:outline-none rounded-md ${
                                user.status==="completed" ? "bg-green-700" : "bg-red-700"
                            }`}
                            onClick={() => {
                              
                              HandleQueryStatus(user.status==="completed"?"pending":"completed",user.id);
                            }}
                          >
                            {user.status}
                          </button>
                        </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>

              </>}
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
  )
}

export default Queries