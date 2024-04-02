import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { toast } from 'react-toastify'
const Products = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [page, setPage] = useState(0)
  const [TotalCount, SetTotalCount] = useState()
  const debounceSearchValue = useDebounce(searchParam, 1000)
  console.log(searchParam, 'searchParam')

  // useEffect(() => {
  //   getproduct();
  // }, []);

  useEffect(() => {
    getSearchproduct()
  }, [debounceSearchValue, page])

  const getSearchproduct = async () => {
    console.log('page', page)

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-all-products?offset=${
        page * 15
      }&search=${searchParam}`,
      'admin'
    )
    if (res.data.statusCode == 200) {
      setProduct(res.data.data)
      SetTotalCount(res.data.count)
      console.log(res, 'rest')
    }
  }

  const handleDelete = async e => {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-product/${e}`
    )
    if (response.status == 200) {
      getSearchproduct()
      toast.success('Product Deleted')
    }
  }

  return (
    <>
      <div class='sm:flex sm:items-center sm:justify-between'>
        <div>
          <div class='flex items-center gap-x-3'>
            <h2 class='text-lg font-medium text-gray-800'>Products</h2>

            <span class='px-3 py-1 text-xs text-red-400 bg-gray-100 rounded-full '>
              240
            </span>
          </div>

          <p class='mt-1 text-sm text-gray-500'>A List Of All Products</p>
        </div>
      </div>

      <div class='mt-2 md:flex md:items-center md:justify-between'>
        <div class='relative flex items-center mt-4 md:mt-0'>
          <button
            class='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200   shrink-0 sm:w-auto gap-x-2    bg-slate-900  hover:border-gray-700 border-transparent border-2'
            onClick={() => navigate(`/admin/products/add`)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-5 h-5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Add Products</span>
          </button>
        </div>

        <button onClick={() => setPage(page + 1)}>Increment</button>

        <div class='relative flex items-center mt-4 md:mt-0'>
          <span class='absolute'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-5 h-5 mx-3 text-gray-400'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>

          <input
            type='text'
            placeholder='Search'
            value={searchParam}
            onChange={e => setSearchParam(e.target.value)}
            class='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200  md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
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
                      class='py-3.5 px-4 text-sm font-normal text-left text-gray-500'
                    >
                      Name
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Sub Category
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      MRP
                    </th>
                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Order Quantity
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Selling Price
                    </th>
                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Tax
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class='bg-white divide-y divide-gray-200'>
                  {product.map((product, index) => (
                    <tr key={index}>
                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product.name}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product.categoryname}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product.subcategoryname}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product.quantity}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product.mrp}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product?.order_quantity}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product?.selling_price}
                          </h2>
                        </div>
                      </td>
                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {product?.tax ? product?.tax : 0}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm whitespace-nowrap flex gap-2'>
                        <button
                          type='button'
                          class='px-3 py-2 text-sm font-medium text-center text-white border-2 border-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-200'
                          onClick={e => {
                            navigate('/admin/products/' + product.id)
                          }}
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M13.968 2.032C13.5207 1.58467 12.914 1.33337 12.2813 1.33337C11.6487 1.33337 11.042 1.58467 10.5947 2.032L2.62667 10C2.35586 10.2708 2.16547 10.6114 2.07667 10.984L1.34667 14.052C1.3269 14.1351 1.32876 14.2219 1.35205 14.3041C1.37535 14.3862 1.41931 14.4611 1.47974 14.5214C1.54018 14.5818 1.61507 14.6257 1.69727 14.6489C1.77948 14.6721 1.86626 14.6739 1.94934 14.654L5.01667 13.9233C5.38946 13.8346 5.73033 13.6442 6.00134 13.3733L13.968 5.40667C14.4153 4.95933 14.6666 4.35262 14.6666 3.72C14.6666 3.08738 14.4153 2.48067 13.968 2.03333V2.032ZM11.3013 2.73867C11.43 2.60997 11.5828 2.50788 11.751 2.43823C11.9191 2.36858 12.0993 2.33274 12.2813 2.33274C12.4633 2.33274 12.6436 2.36858 12.8117 2.43823C12.9799 2.50788 13.1326 2.60997 13.2613 2.73867C13.39 2.86736 13.4921 3.02015 13.5618 3.18829C13.6314 3.35644 13.6673 3.53666 13.6673 3.71867C13.6673 3.90067 13.6314 4.08089 13.5618 4.24904C13.4921 4.41719 13.39 4.56997 13.2613 4.69867L12.6667 5.29267L10.7067 3.33333L11.3013 2.73933V2.73867ZM10 4.04133L11.96 6L5.29334 12.6667C5.15334 12.8067 4.97734 12.9047 4.78467 12.9507L2.50734 13.4933L3.04934 11.216C3.09534 11.0227 3.194 10.8467 3.334 10.7067L10 4.04V4.04133Z'
                              fill='black'
                            />
                          </svg>
                        </button>
                        <button
                          type='button'
                          class='px-3 py-2 text-sm font-medium text-center text-white border-2 border-red-200 focus:ring-1 focus:outline-none focus:ring-red-200'
                          onClick={e => {
                            handleDelete(product.id)
                          }}
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M4.66666 14C4.29999 14 3.98599 13.8693 3.72466 13.608C3.46332 13.3467 3.33288 13.0329 3.33332 12.6667V4H2.66666V2.66667H5.99999V2H9.99999V2.66667H13.3333V4H12.6667V12.6667C12.6667 13.0333 12.536 13.3473 12.2747 13.6087C12.0133 13.87 11.6995 14.0004 11.3333 14H4.66666ZM11.3333 4H4.66666V12.6667H11.3333V4ZM5.99999 11.3333H7.33332V5.33333H5.99999V11.3333ZM8.66666 11.3333H9.99999V5.33333H8.66666V11.3333Z'
                              fill='#EE7B7B'
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

export default Products
