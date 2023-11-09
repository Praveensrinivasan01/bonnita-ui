import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function AdminforgotPassword() {
const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/forgot-password`, { email });

      if (response.status === 200) {
       console.log('res',response.data.link);
      } else {
        console.log('else');
      }
    } catch (error) {
      console.log('type error');
    }
  }
  return (
    <div>
      <div>
          <div className='container-md PaddingTop bg-white p-4 rounded-md'>
     <h3 className='text-center mt-5 fw-medium fs-3'>Forgot Password</h3>
     <div className='d-flex align-items-center justify-content-center mt-3'>
     <div className='border-1 col-lg-4 col-md-8 col-12 p-3 mb-5 mt-3'>
     <h4 className='fs-4 '>Verification</h4>
     <div className=''>
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
      
        <div className='mt-4'>
              <label className="">Email address *</label>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
        <button  className=' button1 color-2 mt-4'>Submit</button>
     
      </form>
     </div>

     </div>

     </div>
     </div></div>
     </div>
  )
}

export default AdminforgotPassword