import React, { useEffect, useState } from 'react'
import Product from '../../Components/Product'
import Woolen from '../../Assets/LandingPageImages/detail-1.jpg'
import cloth from '../../Assets/LandingPageImages/product-35.jpg'

import { Link } from 'react-router-dom'
import axios from 'axios';


const BestSellers = () => {

  const [bestSeller,setBestSeller] = useState()

  useEffect(()=>{
    getBestSellers()
  },[])

  const getBestSellers =async()=>{

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/landingpage/get-best-sellers`)

    console.log(response?.data?.data)
    if(response?.data?.statusCode ==200){
      setBestSeller(response?.data?.data)
    }
  }

  return (
    <div className='container-lg  mt-md-5' name="bestSeller">
      <div className='d-flex justify-content-between align-items-center pb-5' data-aos="fade-right" data-aos-duration="800">
        <h3 style={{color:"#1D1D1D",fontSize:'32px',fontWeight:"600"}}>
            Best Sellers
        </h3>
        <Link to="/shoppage?type=bestsellers">
        <h4 className='text-decoration-underline onHover'>
            View All
        </h4>
        </Link>
    </div>
     <Product products={bestSeller}/>
    </div>
  )
}

export default BestSellers