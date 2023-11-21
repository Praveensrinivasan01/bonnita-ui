import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from './Collections/ProductList';

const ShopPage = () => {
    const [categories,Setcategories] = useState("all")
    const [subcategories,Setsubcategories] = useState([])

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

    const shopPageQuery = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/shop-mapping?category='${queryParams?.get('category') ?? categoryParam}'&subcategory='${subcategories}'&search=${searchParam}&price='${sortParams}'&offset=${15 * (page - 1)}&type='${queryParams?.get('type') ?? type}'`)
  
      console.log("response?.data?.data)", response?.data?.data)
      if (response?.data?.statusCode == 200) {
        sendData(response?.data?.data)
      } else {
        sendData([])
      }
    }
    const commonClass = ' lg:px-3 lg:py-3  rounded-md border text-center cursor-pointer transition duration-700 ease-in-out w-100 px-11 flex items-center';
    const activeClass = 'bg-orange-500 font-semibold text-base text-white ';

    const commonSubCategoryClass = 'lg:px-3 lg:py-3 rounded-md border text-center cursor-pointer w-100 px-6 flex items-center transition duration-700 ease-in-out';
const activeSubCategoryClass = 'bg-indigo-500 font-semibold text-base text-white';
    
    useEffect(()=>{
      shopPageQuery()
    },[page, categoryParam, subcategories, sortParams, type])
    console.log(categories,"categories")
  return (
    <div className='md:pt-48 pt-36 pb-4'>
        <div className='container-md overflow-x-auto'>
        <div className={ categories!=="naturalcane" && categories!=="veganleather"? '' :""}>
        {
          categories==="geniuneleather"?
          <div className='flex gap-2'>
        <p className='cursor-pointer lg:px-3 lg:py-3 rounded-md border text-center w-100 px-3 flex items-center bg-black  font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={() => {Setcategories("all"); Setsubcategories("");
}}
>Back</p>
  <p className={`${commonSubCategoryClass} ${subcategories === "WALLETS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("WALLETS")}>WALLETS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "KEYCHAINS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("KEYCHAINS")}>KEY CHAINS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "CARDHOLDER" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("CARDHOLDER")}>CARD HOLDER</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "ONESIDEBAGS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("ONESIDEBAGS")}>ONE SIDE BAGS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "BAGS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BAGS")}>BAGS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "BELT" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BELT")}>BELT</p>
          </div> : 
          categories==="naturalcane"?
          <div className='flex gap-3'>
          <p className='cursor-pointer p-2 rounded-md border text-center w-100  bg-black  font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={() => {Setcategories("all"); Setsubcategories("");
}}
>Back</p>
          <p className={`${commonSubCategoryClass} ${subcategories === "BAGS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BAGS")}>BAGS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "BELT" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BELT")}>BELT</p>
          </div>
          :
          categories==="veganleather"?
          <div className='flex gap-3'>
          <p className='cursor-pointer p-2 rounded-md border text-center w-100  bg-black  font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={() => {Setcategories("all"); Setsubcategories("");
}}
>Back</p>
          <p className={`${commonSubCategoryClass} ${subcategories === "BAGS" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BAGS")}>BAGS</p>
      <p className={`${commonSubCategoryClass} ${subcategories === "BELT" ? activeSubCategoryClass : ''}`} onClick={() => Setsubcategories("BELT")}>BELT</p>
          </div>:
          <div className="flex gap-3">
          <p className={`${commonClass} ${categories === "all" ? activeClass : ''}`} onClick={() => Setcategories("all")}>All</p>
          <p className={`${commonClass} ${categories === "bestSellers" ? activeClass : ''}`} onClick={() => Setcategories("bestSellers")}>Best Sellers</p>
          <p className={`${commonClass} ${categories === "newArrivals" ? activeClass : ''}`} onClick={() => Setcategories("newArrivals")}>New  Sellers</p>
          <p className={`${commonClass} ${categories === "geniuneleather" ? activeClass : ''}`} onClick={() => Setcategories("geniuneleather")}>Geniune Leather</p>
          <p className={`${commonClass} ${categories === "naturalcane" ? activeClass : ''}`} onClick={() => Setcategories("naturalcane")}>Natural Cane</p>
          <p className={`${commonClass} ${categories === "veganleather" ? activeClass : ''}`} onClick={() => Setcategories("veganleather")}>Vegan Leather</p>
          </div>
        }
        {/* <p className={ categories==="bestSellers" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white  transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("bestSellers")}>Best Sellers</p>
        <p className={ categories==="newArrivals" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("newArrivals")}>New  Sellers</p>
        <p className={ categories==="all" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("all")}>All</p>
        <p className={ categories==="geniuneleather" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("geniuneleather")}>Geniune Leather</p>
        <p className={ categories==="naturalcane" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("naturalcane")}>Natural Cane</p>
        <p className={ categories==="veganleather" ?'cursor-pointer p-2 rounded-md border text-center   bg-orange-500  font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center   cursor-pointer'} onClick={()=>Setcategories("veganleather")}>Vegan Leather</p> */}
        </div>
        </div>
        <ProductList productsData={data} />
    </div>
  )
}

export default ShopPage