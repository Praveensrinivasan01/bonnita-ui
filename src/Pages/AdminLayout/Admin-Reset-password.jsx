import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AdminResetpassword = () => {
  const location = useLocation();
  const [password, setNewpassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const user_id = searchParams.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Invalid Password");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/reset-password`,
          { password, user_id }
        );

        if (response.status === 200) {
          console.log("success");
        } else if (response.data.statusCode === 100) {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("type error");
      }
    }
  };
  return (
    <div>
        <div>
      <div className="container-md PaddingTop bg-white p-4 rounded-md">
        <h3 className="text-center mt-5 fw-medium fs-3">Change Password</h3>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <div className="border-1 col-lg-4 col-md-8 col-12 p-3 mb-5 mt-3">
         
            <div className="">
              <form onSubmit={handleSubmit}>
           
              <div className="mb-3 mt-3">
                <label
                  for="Password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="border d-flex justify-content-between align-items-center pe-4 bg-white">
                  <input
                    type="password"
                    className="px-3 py-2 w-100 border-0 focus:outline-none"
                    name="password"
                    id=""
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setNewpassword(e.target.value)}
                    minlength="6"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M2.5 3.35954L3.3593 2.50024L17.5 16.641L16.6407 17.5003L2.5 3.35954ZM10.1305 7.50349L12.4966 9.8695C12.4637 9.25266 12.2039 8.66977 11.7671 8.23297C11.3303 7.79618 10.7474 7.53636 10.1305 7.50349ZM9.86961 12.4965L7.50359 10.1304C7.53646 10.7473 7.79629 11.3302 8.23308 11.767C8.66987 12.2038 9.25277 12.4636 9.86961 12.4965Z"
                      fill="#777777"
                    />
                    <path
                      d="M10 13.75C9.42309 13.75 8.85396 13.617 8.33688 13.3611C7.8198 13.1053 7.36872 12.7336 7.01873 12.275C6.66874 11.8164 6.42928 11.2832 6.31899 10.7169C6.20869 10.1507 6.23053 9.5666 6.38281 9.01016L3.68477 6.31172C2.58281 7.32109 1.53281 8.63828 0.625 10C1.65703 11.7188 3.06875 13.4859 4.53906 14.4992C6.22578 15.6609 8.05977 16.25 9.99062 16.25C11.0458 16.2507 12.0931 16.0683 13.0859 15.7109L10.9918 13.6172C10.6686 13.7056 10.3351 13.7503 10 13.75ZM10 6.25C10.5769 6.24997 11.146 6.38305 11.6631 6.63888C12.1802 6.8947 12.6313 7.26639 12.9813 7.725C13.3313 8.18361 13.5707 8.71679 13.681 9.28306C13.7913 9.84932 13.7695 10.4334 13.6172 10.9898L16.3773 13.75C17.516 12.7246 18.5676 11.3453 19.375 10C18.3445 8.30352 16.918 6.54062 15.4227 5.51484C13.7148 4.34375 11.8871 3.75 9.99062 3.75C8.94704 3.7515 7.91223 3.94057 6.93555 4.3082L9.01016 6.38281C9.33269 6.29453 9.6656 6.24986 10 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </div>
              </div>
                <div className="mb-3 mt-3">
                <label
                  for="Password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="border d-flex justify-content-between align-items-center pe-4 bg-white">
                  <input
                    type="password"
                    className="px-3 py-2 w-100 border-0 focus:outline-none"
                    name="password"
                    id=""
                    placeholder="Confirm Password"
                     value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    minlength="6"
                  />
                 
                </div>
              </div>
              <h4 className="text-center">Remember Password ? </h4>
                <button type="submit" className="button1 color-2 mt-4 w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AdminResetpassword