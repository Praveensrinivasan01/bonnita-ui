import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/Logo/LogoForBonnita.jpg";
import { AuthPost } from "../../Commons/httpService";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);

  const AdminlogOut = () => {
    console.log("logout");
    sessionStorage.clear();
    navigate('admin/login')
  };

  let getcount = async () => {
    await AuthPost(`admin/get-query-count`, {}, "admin")
      .then((res) => {
        if (res.statusCode == 200) {
          setCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log("err::: ", err);
      });
  };

  useEffect(() => {
    getcount();
  }, []);

  return (
    <>
      <div class="flex flex-col justify-between border-e bg-white w-[250px] sticky">
        <div class="px-3 py-6 ">
          <span class="grid w-32 lace-content-center   text-xs text-gray-600 ">
            <img src={logo} className="" />
          </span>

          <ul class="mt-6 space-y-1">
            <li
              className={
                pathname.includes("dashboard")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              onClick={() => navigate("/admin/dashboard")}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </li>

            {/* <li>
            <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                class="flex cursor-pointer items-center justify-between   px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
                <span class="text-sm font-medium"> Category </span>

                <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    />
                </svg>
                </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
                <li>
                <a
                    href=""
                    class="block   px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    Main Category
                </a>
                </li>

                <li>
                <a
                    href=""
                    class="block   px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    Sub Category
                </a>
                </li>
            </ul>
            </details>
        </li> */}

            <li
              className={
                pathname.includes("categories")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              onClick={() => navigate("/admin/categories")}
              style={{ cursor: "pointer" }}
            >
              Categories
            </li>

            <li
              className={
                pathname.includes("products")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              onClick={() => navigate("/admin/products")}
              style={{ cursor: "pointer" }}
            >
              Products
            </li>

            <li
              className={
                pathname.includes("users")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/users")}
            >
              Users
            </li>
            <li
              className={
                pathname.includes("banner")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/banner")}
            >
              Banner
            </li>
            <li
              className={
                pathname.includes("topfilter")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/topfilter")}
            >
              Top Records
            </li>

            <li
              className={
                pathname.includes("orders")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/orders")}
            >
              Orders
            </li>
            <li
              className={
                pathname.includes("coupon")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/coupon")}
            >
              Coupon
            </li>
            <li
              className={
                pathname.includes("WhyUs")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/WhyUs")}
            >
              LookBook
            </li>
            <li
              className={
                pathname.includes("queries")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white flex justify-between"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 flex justify-between hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/queries")}
            >
              <span> Queries</span>{" "}
              <span class="badge text-black bg-white     badge-light">
                {count}
              </span>
            </li>
            <li
              className={
                pathname.includes("newsletter")
                  ? "block   bg-red-400 px-4 py-3 text-sm font-medium text-white"
                  : "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/newsletter")}
            >
              NewsLetter
            </li>

            <li
              className={
                "block   px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
              style={{ cursor: "pointer" }}
              onClick={AdminlogOut}
            >
              <button className="btn-danger" >
                {" "}
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* <div class=" inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" class="flex items-center gap-2 bg-gray-100 p-4 hover:bg-gray-300">
        <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="h-10 w-10 rounded-full object-cover"
        />

        <div>
            <p class="text-xs">
            <strong class="block font-medium">Admin</strong>

            <span> Admin@example.com </span>
            </p>
        </div>
        </a>
    </div> */}
      </div>
    </>
  );
};

export default Sidebar;
