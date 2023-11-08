import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
// import { CartProvider } from './Context/CartContext';
import { NextUIProvider } from "@nextui-org/system";
import Axios from "axios";

Axios.interceptors.request.use(
  function (config) {
    let div1 = document.createElement("div");
    div1.setAttribute("id", "spinnerloader");
   let main = `
   <div class="preloader">
    <div class="">
      <div class="loader">
      
      
 
          <div class="loading">Loading</div>
       
       
        
      </div>
      </div>
    </div>`
    div1.innerHTML= main
    // div1.append(main)
  
      document.body.appendChild(div1);
    
    return config;
  },
  function (error) {
    // document.body.classList.remove(" ");
    // div1.removeChild(div1.firstChild);
    const element = document.getElementById("spinnerloader");
    element?.remove();
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    // div1.removeChild(div1.firstChild);
    // spinning hide
    const element = document.getElementById("spinnerloader");
    element?.remove();
    // document.body.classList.remove("loading-indicator");
    return response;
  },
  function (error) {
    // document.body.classList.remove("loading-indicator");
    const element = document.getElementById("spinnerloader");
    element?.remove();
    // div1.removeChild(div1.firstChild);
    return Promise.reject(error);
  }
);




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
      {/* <CartProvider> */}
      <BrowserRouter>
        <ToastContainer autoClose={2000}     />
        <App />
      </BrowserRouter>
      {/* </CartProvider> */}
    </NextUIProvider>
);
