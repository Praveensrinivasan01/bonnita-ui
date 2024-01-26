import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../Styles/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { setLoginData } from "../../Zustand/loginStore";
import { UserDetails, setUserData } from "../../Zustand/userDetails";
import { AuthGet } from "../../Commons/httpService";
import { Modal } from "@nextui-org/modal";
import { AuthContext } from "../../Context/AuthContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loginUserData, setUserLoginData] = useState([]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const [show, setShow] = useState(false)

  // const [previousPageUrl, setPreviousPageUrl] = useState('');
  // const [login,setUserLogin] = useState("")

  // useEffect(() => {

  //   const previousURL = localStorage.getItem('previousPageUrl') || '';
  //   setPreviousPageUrl(previousURL);

  //   localStorage.setItem('previousPageUrl', window.location.pathname);
  // }, []);

  // const location = useLocation();
  // console.log(location);

  // console.log(previousPageUrl)

  const { fetchData } = useContext(AuthContext);
  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    localStorage.clear("userOrderDetails")
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 500)
    setShow(false)
  }

  const handleOkay = () => {
    navigate("/billingdetails")
  }
  const handleCancle = () => {
    localStorage.clear("userOrderDetails")
  }
  console.log(email);
  let ordersave = async (OrderId) => {
    await AuthGet('order/get-paydata/' + OrderId, 'customer_token').then((res) => {
      if (res.statusCode === 200) {
        console.warn(res)
        if (res?.data?.order_status === 'PAID') {
          handleClose()
          //toast.success("Order successfully paid")
        } else {
          // navigate()
          setShow(true)
          console.log(show, "show")
          // alert("Payment failed. Please try again")
          toast.error("Your Last transaction failed. Please try again")
        }
      }
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_API_URL}/users/signin`, {
          email,
          password,
        })
        .then(async (resp) => {
          if (resp.data.statusCode === 200) {

            setLoginData({
              id: resp.data.user.id,
              UserToken: resp.data.token,
            });
            // setUserLoginData(resp.data.user);

            setUserData({ email, firstname: resp.data.user.firstname, lastname: resp.data.user.lastname, mobile: resp.data.user.mobile, bonusPoints: resp.data.user.bonus_points })
            const userOrderDetails = JSON.parse(localStorage.getItem("userOrderDetails"))
            debugger   
            if (userOrderDetails?.userId === resp.data.user.id) {
              await ordersave(userOrderDetails?.OrderId)
            }else{
              navigate(-1);
              setTimeout(() => {
                window.location.reload();
              }, 500)
            }

          } else if (resp.data.statusCode === 310) {
            toast.error(resp.data.message);
          }
        });
    } catch (error) {
      console.log("err", error);
    }
    // if (loginUserData.length) {
    //   console.log("firstname", loginUserData);
    //   setUserData({
    //     email,
    //     firstname: loginUserData["firstname"],
    //     lastname: loginUserData["lastname"],
    //     mobile: loginUserData["mobile"],
    //   });
    // }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  console.log(showPassword);
  return (
    <section className=" container-md PaddingTop">
      <p>
        <Link to="/">
          <span>Home</span>
        </Link>
        /Account
      </p>
      {show&&<div> 
      <div>
      <span>your last transaction was not completed successfully do you want to purchase again</span>
      </div>
   <button onClick={()=>{ handleOkay()} } >Yes</button> <button onClick={()=>{ handleClose()}}>No</button>
     </div>}
      <h5 className="text-center fs-2 fw-medium mb-4">Login</h5>

      <div className="row d-flex gap-4 justify-content-center mb-5">
        <div className="col-md-5 border-1 p-4 order-md-0 order-1">
          <h4 className="fs-3 fw-medium mb-3">Register</h4>
          <h5 className="fs-6 fw-medium mb-3">
            Don’t already have an account please register here
          </h5>
          <Link to="/UserRegister">
            <button className="button1 color-2">Create an account</button>
          </Link>
        </div>

        <div className="col-md-5 border-1 p-4 order-md-1 order-0">
          <h6 className="fs-5 fw-medium">Login</h6>
          <form className=" mt-4" onSubmit={handleLogin}>
            <div>
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

            <div className="mb-3 mt-3">
              <label
                for="Password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <div className="border d-flex justify-content-between align-items-center pe-4 ">
                <input
                  type={showPassword ? "text" : "password"}
                  className="px-3 py-3 w-100 border-0 focus:outline-none"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minlength="6"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={handlePassword}
                  style={{ cursor: "pointer" }}
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

            {/* <div className="mt-4">
              <label className="block text-gray-700">Password *</label>
              <div className="d-flex justify-content-between align-items-center w-full px-4 py-3 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none">
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minlength="6"
                  className=""
                  required
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
            </div> */}
            <div className="row mt-4">
              {/* <div className="col-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" for="gridCheck">
                    Remember me
                  </label>
                </div>
              </div> */}
              <div className="col-12 text-end">
                {" "}
                <Link to="/forgotPassword">Forgot Password ?</Link>
              </div>
            </div>

            {/* <div className='text-center'> */}
            <button type="submit" className="button1 color-2 mt-4 w-100">
              Sign in
            </button>

            {/* </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
