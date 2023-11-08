import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/forgot-password`, { email });

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
     <div >
     <div className='container-md PaddingTop'>
     <h4><Link to=""><span>Account</span></Link>/ Forgot Password</h4>
     <h3 className='text-center mt-5 fw-medium fs-3'>Forgot Password</h3>
     <div className='d-flex align-items-center justify-content-center mt-3'>
     <div className='border-1 col-4 p-3 mb-5 mt-3'>
     <h4 className='fs-4 '>Verification</h4>
     <div className=''>
      <form onSubmit={handleSubmit} className='d-flex flex-column'>
        {/* <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <div className='mt-4'>
              <label className="">Email address *</label>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
        <button type="submit" className=' button1 color-2 mt-4'>Submit</button>
      </form>
     </div>

     </div>

     </div>
     </div>
    </div>
  )
}

export default ForgotPassword