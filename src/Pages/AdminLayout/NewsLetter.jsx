import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { handleInputValidation } from './../../Helper/validator';

const NewsLetter = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data) {
      toast.error("Please fill the News letter message");
      return
    }

    const body = {
      content: data
    }

    console.log("API WORKS")

    const apiCall = await axios.post(`${process.env.REACT_APP_API_URL}/admin/newsletter`, body);
    if (apiCall.data.statusCode === 200) {
      toast.success(apiCall.data.message)
      setData("")
    }
  }
  return (
    <div>

      <div class="sm:flex sm:items-center sm:justify-between pb-4">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800">Newsletter</h2>
          </div>

          <p class="mt-1 text-sm text-gray-500">Send Newsletter messages here</p>
        </div>
      </div>
      <div class=" p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form class=" ">
          <label for="message" class="block mb-2 text-md font-medium text-gray-900 ">Your message</label>
          <div>
            <textarea id="message" rows="15" class="block p-2.5 w-full text-m  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data}
              onChange={(e) => handleInputValidation(e.target.value, setData, 6)} placeholder="Leave a comment..."></textarea>
            {/* {error ? <span style={{ color: "red" }}>please enter the content</span> : ""} */}
          </div>
          <button type="submit" onClick={(e) => handleSubmit(e)} class=" px-10 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-slate-900 shrink-0 sm:w-auto gap-x-2 hover:border-gray-700 border-transparent border-2 mt-2">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default NewsLetter