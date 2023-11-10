import React, { useEffect, useState } from "react";
// import "../../Assets/css/style.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../Styles/ShopSideBar.css";
import productImg from "../../../Assets/LandingPageImages/product-35.jpg";
import {
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductList from "./ProductList";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";


const Shopsidebar = () => {
  const [veganLeather, setVeganLeather] = useState(false);
  const [Cloth, setCloth] = useState(false);
  const [GenuineLeather, setGenuineLeather] = useState(false);
  const [Naturalcane, setNaturalcane] = useState(false);
  const [Woolen, setWoolen] = useState(false);
  const [sideBarResponse, setSidebarResponse] = useState([])
  const [indexValue, setIndexValue] = useState(-1)
  const [subIndexValue, setSubIndexValue] = useState(-1)
  const [boolean, setBoolean] = useState(false)
  const [data, sendData] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  // PARAMS
  const [page, setPage] = useState(1)
  const [searchParam, setSearchParams] = useState("")
  const [categoryParam, setCategoryParam] = useState("all")
  const [subCategoryParams, setSubCategoryParams] = useState("all")
  const [sortParams, setSortParams] = useState("lowToHigh")
  const debounceSearchValue = useDebounce(searchParam, 1000)

  const ShowMenuveganLeather = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/category-mapping`);
    console.log(response.data.data, "response in shop page")
    setSidebarResponse(response.data.data)
  }

  const shopPageQuery = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/shop-mapping?category='${queryParams?.get('category') ?? categoryParam}'&subcategory='${subCategoryParams}'&search=${searchParam}&price='${sortParams}'&offset=${15 * (page - 1)}`)

    console.log("response?.data?.data)", response?.data?.data)
    if (response?.data?.statusCode == 200) {
      sendData(response?.data?.data)
    } else {
      sendData([])
    }
  }

  console.log("NEW", queryParams, queryParams.get('category'))

  useEffect(() => {
    if (boolean == false) {
      setIndexValue(-1)
    }
  }, [boolean])

  useEffect(() => {
    ShowMenuveganLeather()
    // shopPageQuery();
  }, [])

  useEffect(() => {
    console.log(" triggerere")
    shopPageQuery();
  }, [page, categoryParam, subCategoryParams, debounceSearchValue, sortParams])

  return (
    <>
      <div
        id="main-content "
        className="site-main clearfix PaddingTop"

      >
        <div className="themesflat-container container-md">
          <div className="row ">
            <div className="col-lg-3 col-md-4 ">
              <div className="fix">
                <div>
                  <div className="sidebar sidebar-shop innerfixed">
                    <div className="widget widget_search wow fadeInUp">
                      <form
                        action="#"
                        method="get"
                        role="search"
                        className="search-form search-flex"
                      >
                        <input
                          type="search"
                          className="search-field focus:outline-none"
                          placeholder="Search..."
                          title="Search for"
                          onChange={(e) => setSearchParams(e?.target?.value)}
                          required
                        />
                        {/* <a href="#" className="search-submit"></a> */}
                        <FontAwesomeIcon icon={faSearch} />
                      </form>
                    </div>
                    <div className="widget widget_category style-2 wow fadeInUp">
                      <h5 className="widget-title mb-3"><span>Categories</span></h5>
                      <h5 className="widget-title mt-1 mb-3" style={{ cursor: "pointer" }} onClick={() => { setCategoryParam("all"); setSubCategoryParams("all"); setSubIndexValue(-1); setIndexValue(-1); setPage(1); navigate("/shop") }}>All</h5>
                      {sideBarResponse?.map((ele, i) => {
                        return <div className="dropdown mt-2 mb-3">
                          <h2 className={`d-flex justify-content-between align-items-center`} style={{ cursor: "pointer" }} onClick={() => { setIndexValue(i); setSubIndexValue(-1); setCategoryParam(ele.category_name); setSubCategoryParams("all"); navigate("/shop") }}> {ele.category_name}<span><FontAwesomeIcon icon={faChevronDown} /> </span></h2>
                          <div className={`showWithTransition px-4 ${indexValue == i ? ' open ' : ''}`} >
                            {ele.subcategories?.map((e, i) => {
                              return <p className={`dropdown-item fw-lighter pt-2 ${subIndexValue == i ? ' color-selected ' : ''}`} type="button" onClick={() => { setSubIndexValue(i); setSubCategoryParams(e.subcategory_name); setPage(1); navigate("/shop") }}>{e.subcategory_name}</p>
                            })}
                          </div>
                        </div>
                      })}

                    </div>
                    <div className="widget widget_price wow fadeInUp">
                      {/* <h5 className="widget-title">
                        <span>Price</span>
                      </h5> */}
                      <div id="slider-range"></div>
                      <div className="slider-labels">
                        <div className="caption">
                          <span id="slider-range-value1"></span>
                          <span id="slider-range-value2"></span>
                        </div>
                        <div>
                          <form>
                            <input type="hidden" name="min-value" value="" />
                            <input type="hidden" name="max-value" value="" />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-8">
              <section className="page-title padding-bottom-10">
                <ul className="breadcrumbs fw-medium fs-6">
                  <li>
                    <Link to="/" className="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <span>Shop</span>
                  </li>
                  <li className="option-shop style-2">
                    <span>Sort:</span>
                    <select onClick={(e) => { console.log("search params", e.target.value); setSortParams(e.target.value) }}>
                      <option value="lowToHigh">Low To High</option>
                      <option value="highToLow">High To Low</option>
                    </select>
                  </li>
                </ul>
              </section>

              <ProductList productsData={data} />

              {data?.length ? (<div className="themesflat-pagination style-2 text-left clearfix d-flex justify-content-end">
                <ul>
                  {/* <li>
                    <a href="#" className="page-numbers current">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="page-numbers">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="page-numbers">
                      3
                    </a>
                  </li> */}

                  {/* <li>
                    <a href="#" className="page-numbers next" onClick={() => page !== 1 && setPage((prev) => prev - 1)}>
                      PREV
                    </a>
                  </li>
                  <li>
                    <a href="#" className="page-numbers next" onClick={() => setPage((prev) => prev + 1)}>
                      NEXT
                    </a>
                  </li> */}

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
                      onClick={() => setPage((prev) => prev + 1)}
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

                </ul>
              </div>) : <div>No Products Available In The Selected Category</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shopsidebar;
