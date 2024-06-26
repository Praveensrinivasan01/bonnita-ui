import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import Items from '../Pages/Items'
import Profile from '../Pages/Profile'
import Favourites from '../Pages/Favourites'
// import Cart from '../Pages/Cart'
import Customer from '../Pages/CustomerLayout/Customer'
import Admin from '../Pages/AdminLayout/Admin'
import Dashboard from '../Pages/AdminLayout/Dashboard'
import Signup from '../Pages/Signup'
import ChangePassword from '../Pages/Change-Password'
import ResetPassword from '../Pages/CustomerLayout/ResetPassword'
import NotFoundPage from '../Pages/404'
import Categories from '../Pages/AdminLayout/Categories'
import SubCategories from '../Pages/AdminLayout/SubCategories'
import Products from '../Pages/AdminLayout/Products'
import ProductsDetails from '../Pages/AdminLayout/ProductsDetails'
import Shop from '../Pages/CustomerLayout/Collections/Shopsidebar'
import ProductInformation from '../Pages/CustomerLayout/ProductInfo/productDetails'
import Billingdetails from '../Pages/CustomerLayout/Billingdetails'
import UserLogin from '../Pages/CustomerLayout/UserLogin'
import UserRegister from '../Pages/CustomerLayout/UserRegister'
import ForgotPassword from '../Pages/CustomerLayout/ForgotPassword'
import Cart from '../Pages/CustomerLayout/cart'
import Wishlist from '../Pages/CustomerLayout/wishlist'
import Users from '../Pages/AdminLayout/Users'
import Orders from '../Pages/AdminLayout/Orders'
import OrderDetails from '../Pages/AdminLayout/OrderDetails'
import AdminSignup from '../Pages/AdminLayout/Admin-Signup'
import Adminlogin from '../Pages/AdminLayout/Admin-login'
import AdminforgotPassword from '../Pages/AdminLayout/Admin-forgotPassword'
import AdminResetpassword from '../Pages/AdminLayout/Admin-Reset-password'
import AdminChangepassword from '../Pages/AdminLayout/Admin-Change-password'
import Accountinfo from '../Pages/CustomerLayout/AccountInfo'
import AdminAccountinfo from '../Pages/AdminLayout/Account-Info'
import TopFilters from '../Pages/AdminLayout/TopFilters'
import { withAuth } from './SimpleAuth'
import ContactUs from '../Pages/CustomerLayout/ContactUs'
import Coupon from '../Pages/AdminLayout/Coupon'
import { CustomerOrderDetails } from '../Pages/CustomerLayout/OrderDetails'
import Queries from '../Pages/AdminLayout/Queries'
import ShopPage from '../Pages/CustomerLayout/ShopPage'
import Banner from '../Pages/AdminLayout/Banner'
import WhyUs from '../Pages/AdminLayout/WhyUs'
import TermsAndCondition from '../Pages/TermsAndCondition'
import NewsLetter from '../Pages/AdminLayout/NewsLetter'
import ThankYou from '../Pages/Thankyou'
import UserMobileLogin from '../Pages/CustomerLayout/UserMobileLogin'
import DownloadInvoice from '../Pages/CustomerLayout/DownloadInvoice'
import DeliveryCharges from '../Pages/AdminLayout/DeliveryCharges'
// import WhyUs from '../Pages/AdminLayout/WhyUs'

export const Routes = () => {
  const AdminComponent = withAuth(Admin) // Wrap the Admin component

  const routes = useRoutes([
    {
      path: '*',
      element: <NotFoundPage />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    // {
    //   path: "/reset-password",
    //   element: <ResetPassword />,
    // },
    {
      path: '/change-password',
      element: <ChangePassword />
    },
    // {
    //   path: "/admin/signup",
    //   element: <AdminSignup />,
    // },
    {
      path: '/admin/login',
      element: <Adminlogin />
    },
    {
      path: '/admin/forgot-Password',
      element: <AdminforgotPassword />
    },
    {
      path: '/admin/reset-password',
      element: <AdminResetpassword />
    },
    {
      path: '/admin/change-password',
      element: <AdminChangepassword />
    },
    {
      element: <Customer />,
      children: [
        {
          path: '/shop?',
          element: <Shop />
        },
        {
          path: '/billingdetails',
          element: <Billingdetails />
        },
        {
          path: '/billingdetails/:orderid',
          element: <Billingdetails />
        },
        {
          path: '/userRegister',
          element: <UserRegister />
        },
        {
          path: '/userLogin',
          element: <UserLogin />
        },
        {
          path: '/userLoginPhone',
          element: <UserMobileLogin />
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword />
        },
        {
          path: '/resetPassword',
          element: <ResetPassword />
        },
        {
          path: '/downloadReport',
          element: <DownloadInvoice />
        },
        {
          path: '/thankYou',
          element: <ThankYou />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/wishlist',
          element: <Wishlist />
        },
        {
          path: '/product/:id',
          element: <ProductInformation />
        },
        {
          path: '/accountinfo',
          element: <Accountinfo />
        },
        {
          path: '/contactus',
          element: <ContactUs />
        },
        {
          path: '/orderDetails/:id',
          element: <CustomerOrderDetails />
        },
        {
          path: '/shopPage',
          element: <ShopPage />
        },
        {
          path: '/termsAndCondition',
          element: <TermsAndCondition />
        }
      ]
    },
    {
      element: <AdminComponent />,
      children: [
        {
          path: '/admin/dashboard',
          element: <Dashboard />
        },
        {
          path: '/admin/categories',
          element: <Categories />
        },
        {
          path: '/admin/categories/:id',
          element: <SubCategories />
        },
        {
          path: '/admin/products',
          element: <Products />
        },
        {
          path: '/admin/products/add',
          element: <ProductsDetails />
        },
        {
          path: '/admin/products/:id',
          element: <ProductsDetails />
        },
        {
          path: '/admin/users',
          element: <Users />
        },
        {
          path: '/admin/banner',
          element: <Banner />
        },
        {
          path: '/admin/whyus',
          element: <WhyUs />
        },
        {
          path: '/admin/accountinfo',
          element: <AdminAccountinfo />
        },
        {
          path: '/admin/orders',
          element: <Orders />
        },
        {
          path: '/admin/orders/:id',
          element: <OrderDetails />
        },
        {
          path: '/admin/coupon',
          element: <Coupon />
        },
        {
          path: '/admin/topfilter',
          element: <TopFilters />
        },
        {
          path: '/admin/queries',
          element: <Queries />
        },
        {
          path: '/admin/newsletter',
          element: <NewsLetter />
        },
        {
          path: '/admin/deliverycharges',
          element: <DeliveryCharges />
        }
      ]
    }
  ])
  return <>{routes}</>
}
