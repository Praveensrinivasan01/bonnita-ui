import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ProductList from './Collections/ProductList';

const ShopPage = () => {

  const [data, sendData] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(1)
  const [searchParam, setSearchParams] = useState("")
  const [categoryParam, setCategoryParam] = useState("all")
  const [type, setType] = useState("all")
  const [subCategoryParams, setSubCategoryParams] = useState("all")
  const [sortParams, setSortParams] = useState("lowToHigh")
  const [sideBarResponse, setSidebarResponse] = useState([])
  const [indexValue, setIndexValue] = useState(-1)
  const [subIndexValue, setSubIndexValue] = useState(-1)

  const shopPageQuery = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/shop-mapping?category='${queryParams?.get('category') ?? categoryParam}'&subcategory='${subCategoryParams}'&search=${searchParam}&price='${sortParams}'&offset=${15 * (page - 1)}&type='${queryParams?.get('type') ?? type}'`)

    console.log("response?.data?.data)", response?.data?.data)
    if (response?.data?.statusCode == 200) {
      sendData(response?.data?.data)
    } else {
      sendData([])
    }
  }

  const ShowMenuveganLeather = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/category-mapping`);
    console.log(response.data.data, "response in shop page")
    setSidebarResponse(response.data.data)
  }

  useEffect(() => {
    ShowMenuveganLeather()
  }, [])

  const commonClass = ' lg:px-3 lg:py-3  rounded-md border text-center cursor-pointer transition duration-700 ease-in-out w-100 px-11 flex items-center';
  const activeClass = 'bg-red-400 font-semibold text-base text-white ';

  const commonSubCategoryClass = 'lg:px-3 lg:py-3 rounded-md border text-center cursor-pointer w-100 px-6 flex items-center transition duration-700 ease-in-out';
  const activeSubCategoryClass = 'bg-red-400 font-semibold text-base text-white';

  useEffect(() => {
    shopPageQuery()
  }, [page, categoryParam, sortParams, type, subCategoryParams])
  console.log(categoryParam, "categories")
  return (
    <div className='md:pt-48 pt-36 pb-4'>
      <div className='container-md overflow-x-auto'>
        <div>
          {categoryParam !== "all" ?
            <div className='flex gap-2'>
              <p className='cursor-pointer lg:px-3 lg:py-3 rounded-md border text-center w-100 px-3 flex items-center bg-black  font-semibold text-base text-white  transition duration-700 ease-in-out' onClick={() => { setType("all"); setCategoryParam("all"); setSubCategoryParams("all"); navigate("/shoppage") }}>Back</p>
              {sideBarResponse?.map((ele, i) => {
                if (ele.category_name == categoryParam) {
                  if (ele.subcategories.length) {
                    const array = ele.subcategories.map((e, ik) => {
                      return <>
                        <p className={`${commonSubCategoryClass} ${ik === subIndexValue ? activeSubCategoryClass : ''}`} type="button" onClick={() => {
                          setSubIndexValue(ik); setSubCategoryParams(e.subcategory_name); setPage(1); navigate("/shoppage")
                        }}>{e.subcategory_name}</p>
                      </>
                    })
                    return array
                  }
                }
              })}
            </div> :
            <div className="flex gap-3">
              <p className={`${commonClass} ${categoryParam === "all" && type === "all" ? activeClass : ''}`} onClick={() => { setType("all"); setSubIndexValue(-1); setCategoryParam("all"); setSubCategoryParams("all"); navigate("/shoppage") }}>All</p>
              <p className={`${commonClass} ${type === "bestsellers" ? activeClass : ''}`} onClick={() => setType("bestsellers")}>Best Sellers</p>
              <p className={`${commonClass} ${type === "newarrivals" ? activeClass : ''}`} onClick={() => setType("newarrivals")}>New  Sellers</p>
              {sideBarResponse?.map((ele, i) => {
                return <p className={`${commonSubCategoryClass} ${categoryParam !== "all" ? activeSubCategoryClass : ''}`}
                  onClick={() => { setType("all"); setIndexValue(i); setSubIndexValue(ele.subcategories.length ? 0 : -1); setCategoryParam(ele.category_name); setSubCategoryParams(ele.subcategories.length ? ele.subcategories[0].subcategory_name : "all"); navigate("/shoppage") }}>{ele.category_name}</p>
              })}
            </div>
          }

        </div>
      </div>
      <ProductList productsData={data} />
      {data.length ?
        <div class="flex justify-center mt-4 gap-x-4 sm:mt-0 ">
          <button
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
          </button>

          <button
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
            onClick={() => setPage((prev) => { return prev + 1 })}
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
          </button>
        </div>
        : <div class="flex justify-center mt-4 gap-x-4 sm:mt-0 ">No Products Available</div>}
    </div>

  )
}

export default ShopPage