import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from './Collections/ProductList';

const ShopPage = () => {
    const [categories,Setcategories] = useState("bestSellers")
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

    useEffect(()=>{
      shopPageQuery()
    },[page, categoryParam, subcategories, sortParams, type])
    console.log(categories,"categories")
  return (
    <div className='md:pt-48'>
        <div className='container-md'>
        <div className={ categories!=="naturalcane" && categories!=="veganleather"? 'flex items-center justify-between' :"flex items-center gap-5"}>
        {
          categories==="geniuneleather"?
          <>
        <p className='cursor-pointer p-2 rounded-md border text-center w-[12%] bg-black shadow-lg shadow-indigo-500/40 font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={() => {Setcategories(""); Setsubcategories("");
}}
>Back</p>
          <p className={ categories==="geniuneleather" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'}>Geniune Leather</p>
        <p className={ subcategories==="WALLETS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("WALLETS")}>WALLETS</p>
        <p className={ subcategories==="KEYCHAINS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("KEYCHAINS")}>KEY CHAINS</p>
        <p className={ subcategories==="CARDHOLDER" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("CARDHOLDER")}>CARD HOLDER</p>
        <p className={ subcategories==="ONESIDEBAGS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("ONESIDEBAGS")}>ONE SIDE BAGS</p>
        <p className={ subcategories==="BAGS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BAGS")}>BAGS</p>
        <p className={ subcategories==="BELT" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BELT")}>BELT</p>
          </> : 
          categories==="naturalcane"?
          <>
          <p className='cursor-pointer p-2 rounded-md border text-center w-[12%] bg-black shadow-lg shadow-indigo-500/40 font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={()=>Setcategories("")}>Back</p>
          <p className={ subcategories==="BAGS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BAGS")}>BAGS</p>
          <p className={ subcategories==="BELT" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BELT")}>BELT</p>
          </>
          :
          categories==="veganleather"?
          <>
          <p className='cursor-pointer p-2 rounded-md border text-center w-[12%] bg-black shadow-lg shadow-indigo-500/40 font-semibold text-base text-white  transition duration-700 ease-in-out'onClick={()=>Setcategories("")}>Back</p>
          <p className={ subcategories==="BAGS" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BAGS")}>BAGS</p>
          <p className={ subcategories==="BELT" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-indigo-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setsubcategories("BELT")}>BELT</p>
          </>:
          <>
        <p className={ categories==="bestSellers" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white  transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("bestSellers")}>Best Sellers</p>
        <p className={ categories==="newArrivals" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("newArrivals")}>New  Sellers</p>
        <p className={ categories==="all" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("all")}>All</p>
        <p className={ categories==="geniuneleather" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("geniuneleather")}>Geniune Leather</p>
        <p className={ categories==="naturalcane" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("naturalcane")}>Natural Cane</p>
        <p className={ categories==="veganleather" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("veganleather")}>Vegan Leather</p>
          </>
        }
        {/* <p className={ categories==="bestSellers" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white  transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("bestSellers")}>Best Sellers</p>
        <p className={ categories==="newArrivals" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("newArrivals")}>New  Sellers</p>
        <p className={ categories==="all" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("all")}>All</p>
        <p className={ categories==="geniuneleather" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("geniuneleather")}>Geniune Leather</p>
        <p className={ categories==="naturalcane" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("naturalcane")}>Natural Cane</p>
        <p className={ categories==="veganleather" ?'cursor-pointer p-2 rounded-md border text-center w-[12%] bg-orange-500 shadow-lg shadow-indigo-500/40 font-semibold text-base text-white transition duration-700 ease-in-out':'p-2 rounded-md border text-center w-[12%] cursor-pointer'} onClick={()=>Setcategories("veganleather")}>Vegan Leather</p> */}
        </div>
        </div>
        <ProductList productsData={data} />
    </div>
  )
}

export default ShopPage