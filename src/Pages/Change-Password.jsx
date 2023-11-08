import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [current_password, setcurpass] = useState('');
  const [new_password, setNewpassword] = useState('');

  const handlereset = async(e)=>{
    e.preventDefault()
    console.log(process.env.REACT_APP_API_URL);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {current_password, new_password });
      if(response.data.statusCode == 200){
         toast.success(response.data.message);
      }else{
        console.log('failed');
      }
  }catch(err){
    console.log(err);
  }
}
   

  return (
    <section class="flex flex-col md:flex-row h-screen items-center">

      <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://images.unsplash.com/photo-1575201647632-45fae95c9ce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80" alt="" class="w-full h-full object-cover"/>
      </div>

      <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center">

        <div class="w-full h-100">


          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Change Password</h1>

          <form class="mt-6" onSubmit={handlereset}>
            <div>
              <label class="block text-gray-700">Current Password</label>
              <input type="password" name="oldpass" id="" placeholder="Enter Current Password" value={current_password} onChange={(e) => setcurpass(e.target.value)} class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">New Password</label>
              <input type="password" name="newpassword" id="" placeholder="Enter New Password" value={new_password} onChange={(e) => setNewpassword(e.target.value)} minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none" required/>
            </div>
            <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6">Change Password</button>
          </form>
        </div>
      </div>

    </section>
  )
}

export default ChangePassword