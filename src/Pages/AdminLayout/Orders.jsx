import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useDebounce from '../../hooks/useDebounce'

const Orders = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [searchParam, setSearchParams] = useState('')
  const [filterParam, setFilterParam] = useState('all')
  const debouncesearchValue = useDebounce(searchParam, 1000)
  const [TotalCount, SetTotalCount] = useState()

  useEffect(() => {
    getAllOrders()
  }, [page, debouncesearchValue, filterParam])

  console.log(TotalCount, 'TotalCount')

  const getAllOrders = async () => {
    const usersResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/get-all-orders?offset=${
        page * 15
      }&search=${searchParam}&status=${filterParam}`,
      {},
      'admin'
    )
    if (usersResponse?.data?.statusCode === 200) {
      // console
      setData(usersResponse.data.customers)
      SetTotalCount(usersResponse?.data.count)
    }
  }

  function formatTime (timeString) {
    if (!timeString) return ''

    const time = timeString.split(':')
    let hour = parseInt(time[0])

    let meridiem = 'AM'
    if (hour >= 12) {
      meridiem = 'PM'
      if (hour > 12) {
        hour -= 12
      }
    }
    if (hour === 0) {
      hour = 12
    }

    const minutes = time[1].padStart(2, '0')

    return `${hour}:${minutes} ${meridiem}`
  }

  const handleDelete = async e => {
    try {
      const usersResponse = await axios.post(
        `${process.env.REACT_APP_API_URL} `
      )
    } catch (error) {}
  }

  return (
    <>
      <div class='sm:flex sm:items-center sm:justify-between'>
        <div>
          <div class='flex items-center gap-x-3'>
            <h2 class='text-lg font-medium text-gray-800'>Orders</h2>
            <span class='px-3 py-1 text-xs text-red-400 bg-gray-100 rounded-full '>
              240
            </span>
          </div>

          <p class='mt-1 text-sm text-gray-500'>A List Of All Orders</p>
        </div>
      </div>

      <div class='mt-2 md:flex md:items-center md:justify-between'>
        <div class='relative flex items-center mt-4 md:mt-0'>
          <label
            for='countries'
            class='block mb-2 text-sm font-medium text-gray-900'
          >
            Status
          </label>
          <select
            id='countries'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ml-2 p-2.5'
            onChange={e => setFilterParam(e.target.value)}
          >
            <option selected value='all'>
              All
            </option>
            <option value='PENDING'>Pending</option>
            <option value='PACKED'>Packed</option>
            <option value='READYTOSHIP'>Ready To Ship</option>
            <option value='ONTHEWAY'>On The Way</option>
            <option value='DELIVERED'>Delivered</option>
            <option value='RETURN'>Returned</option>
            <option value='REFUNDED'>Refunded</option>
            <option value='CANCELLED'>Cancelled</option>
            <option value='RAISEDAREQUEST'>REQUEST</option>
          </select>
        </div>

        {/* <div class="relative flex items-center mt-4 md:mt-0">
                    <span class="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>

                    <input onChange={(e) => setSearchParams(e.target.value)} type="text" placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200  md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div> */}
      </div>

      <div class='flex flex-col mt-6'>
        <div class='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div class='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div class='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table class='min-w-full divide-y divide-gray-200'>
                <thead class='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Order ID
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Customer
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      No. Of Items
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Price
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Date & Time
                    </th>

                    <th scope='col' class='relative py-3.5 px-4'>
                      <span class='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class='bg-white divide-y divide-gray-200'>
                  {data?.map((ele, idx) => {
                    return (
                      <tr>
                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <h2 class='font-medium text-gray-800 '>
                              {ele?.order_id}
                            </h2>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <h2 class='font-medium text-gray-800 '>
                              {ele?.username}
                            </h2>
                            <p class='text-sm font-normal text-gray-600'>
                              {ele?.email}
                            </p>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <h2 class='font-medium text-gray-800 '>
                              {ele?.quantity}
                            </h2>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <h2 class='font-medium text-gray-800 '>
                              ₹ {ele?.total}
                            </h2>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div class='inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60'>
                            <h2 class='text-sm font-normal'>{ele?.status}</h2>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <p class='text-sm font-normal text-gray-600'>
                              {' '}
                              {new Date(ele?.created_date).toLocaleDateString()}
                            </p>
                            <p class='text-sm font-normal text-gray-600'>
                              {formatTime(ele?.order_time)}
                            </p>
                          </div>
                        </td>

                        <td class='px-4 py-4 text-sm whitespace-nowrap flex gap-2'>
                          <Link to={`/admin/orders/${ele?.order_id}`}>
                            <button
                              type='button'
                              class='px-3 py-2 text-sm font-medium text-center rounded-none text-white bg-slate-900 flex  focus:ring-4 focus:outline-none focus:ring-slate-300 '
                            >
                              Details
                            </button>
                          </Link>
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

      <div className='d-flex justify-content-end'>
        <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
          {Math.floor(TotalCount / 15) >= page && (
            <>
              {page !== 0 && (
                <button
                  className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
                  onClick={() => setPage(prev => prev - 1)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                    />
                  </svg>

                  <span>Previous</span>
                </button>
              )}

              {Math.floor(TotalCount / 15) > page && (
                <button
                  className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
                  onClick={() => setPage(page + 1)}
                >
                  <span>Next</span>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Orders
