import React from 'react'
// import Header from './Header'
// import Header from '../../Components/Header'
import { Outlet } from 'react-router-dom'
// import Footer from '../../Components/Footer'

const Customer = () => {
  return (
    <>
      <div>
        {/* <Header/> */}
        <Outlet/>
        {/* <Footer/> */}
      </div>
    </>
  )
}

export default Customer