import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/system";
import Axios from "axios";
import { AuthContextProvider } from "./Context/AuthContext";

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
    </div>`;
    div1.innerHTML = main;
    document.body.appendChild(div1);

    return config;
  },
  function (error) {
    const element = document.getElementById("spinnerloader");
    element?.remove();
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    const element = document.getElementById("spinnerloader");
    element?.remove();
    return response;
  },
  function (error) {
    const element = document.getElementById("spinnerloader");
    element?.remove();
    return Promise.reject(error);
  }
);

const root = document.getElementById("root");

ReactDOM.render(
  <AuthContextProvider>
    <NextUIProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </AuthContextProvider>,
  root
);
