import React, { useEffect, useState } from 'react'
import '../../Styles/LandingPage/HeroSection.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import Button from '../../Components/Button';
import axios from 'axios';

export const HeroSection = () => {
  const [dynamicBanner,SetDynamicBanner] = useState([])

  // useEffect(()=>{
  //   HandleBanner()
  // },[])

  const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`arrow-button ${direction}`}
    onClick={onClick}
  >
    {direction === 'prev' ? <FontAwesomeIcon icon={faChevronLeft}/> : <FontAwesomeIcon icon={faChevronRight}/>}
  </button>
);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
     prevArrow: <ArrowButton direction="prev" />,
    nextArrow: <ArrowButton direction="next" />,
  };

  // const HandleBanner = async()=>{
  //   const response = await axios.post(
  //     // `${process.env.REACT_APP_API_URL}`
  //     )
  //   if(response.status===200){
  //     SetDynamicBanner()
  //   }
  // }

  return (
    <div className='home'>
    <div className='carosel'>
    <Slider {...settings}>

        <div className='CaroselBgImg CaroselContent d-flex flex-column justify-content-center align-items-center ' >
        <h4 className='text-light mt-md-4 pt-md-5' data-aos="fade-left" data-aos-duration="1700">SUMMER SALE 2023</h4>
         <h3 className='text-light mt-md-3' data-aos="fade-right" data-aos-duration="1900">New Arrivals <span>Collections</span></h3>
            <Button btnName={"SHOP NOW"} link={"/shoppage"} btnStyle={"button color-1  text-light mt-md-4"} linkNeeded={"yes"} />  
        </div>

        <div className='CaroselBgImg1 CaroselContent d-flex flex-column justify-content-center align-items-center'>
        <h4 className='text-light mt-md-4 pt-md-5'>SUMMER SALE 2023</h4>
         <h3 className='text-light mt-md-3'>New Arrivals <span>Collections</span></h3>
            <Button btnName={"SHOP NOW"} link={"/shoppage"} btnStyle={"button color-1  text-light mt-md-4"} linkNeeded={"yes"} /> 
        </div>

        <div className='CaroselBgImg2 CaroselContent d-flex flex-column justify-content-center align-items-center'>
        <h4 className='text-light mt-md-4 pt-md-5'>SUMMER SALE 2023</h4>
         <h3 className='text-light mt-md-3'>New Arrivals <span>Collections</span></h3>
            <Button btnName={"SHOP NOW"} link={"/shoppage"} btnStyle={"button color-1  text-light mt-md-4"} linkNeeded={"yes"} /> 
        </div>
    </Slider>
     </div>
     </div>
  )
}
