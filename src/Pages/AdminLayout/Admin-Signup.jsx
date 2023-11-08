import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminSignup() {
 const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_API_URL);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
        firstname,
        lastname,
        mobile,
        email,
        password,
      });

      console.log(response,'test');

      if (response.data.statusCode === 200) {
       console.log('success');
       navigate('/admin/login')
      } else if(response.data.statusCode === 400){
        console.log('Email already exists');
         toast.error(response.data.message);
      }else {
        console.log('error')
      }
    } 
    catch (error) {

    }
  }
  return (
    <div>

      <div>
        <div className='bg-white p-4 rounded-md'>
        <form  class="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSignup}>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="FirstName"
                  class="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input type="firstname" name="firstname" id="" placeholder="Enter First Name Address" value={firstname} onChange={(e) => setFirstname(e.target.value)} class="w-full px-4 py-2  bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="LastName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input type="lastname" name="lastname" id="" placeholder="Enter Last Address" value={lastname} onChange={(e) => setLastname(e.target.value)} class="w-full px-4 py-2  bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="Email" class="block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input type="email" name="email" id="" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} class="w-full px-4 py-2  bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="Mobile" class="block text-sm font-medium text-gray-700">
                  Mobile
                </label>

                <input type="mobile" name="mobile" id="" placeholder="Enter Mobile Address" value={mobile} onChange={(e) => setMobile(e.target.value)} class="w-full px-4 py-2  bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="Password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input type="password" name="password" id="" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} minlength="6" class="w-full px-4 py-2  bg-gray-50 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none" required/>
              </div>


      

              <div class="col-span-6 flex sm:gap-4 mt-4 align-items-center">
                <div>
                <button type="submit" className="button1 color-2 mt-4 w-100">
           Sign Up
            </button>
                </div>

               <div>
               <p class=" text-sm text-gray-500 sm:mt-0">
                  Already have an account? &nbsp;
                  <a href="" class="text-gray-700 underline">Log in</a>.
                </p>
               </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AdminSignup