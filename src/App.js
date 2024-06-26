import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SignIn from "components/Signin";
import SignUp from "components/Signup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

//Admin
import AdminDashboard from "components/Admin/AdminDashboard";
import Shops from "components/Admin/Shops";
import Tours from "components/Admin/Tours";
import TourOrders from "components/Admin/TourOrders";

//Marketplace
import Homepage from "components/Market/Homepage";
import DetailProduct from "components/Market/DetailProduct";
import MarketSearchpage from "components/Market/Searchpage";

//TourOnline
import TourLayout from "layouts/CustomerLayout/TourLayout";
import TourService from "components/TourService/Homepage";
import TourDetail from "components/TourService/TourDetail";
import TourSearchPage from "components/TourService/SearchPage";
//Merchant
import MerchantProducts from "components/Merchant/Products";
import MerchantDashbroad from "components/Merchant/MerchantDashbroad";
import Orders from "components/Merchant/Orders";
import OrderTour from "components/TourService/OrderTour";

import CartProduct from "components/Market/CartProduct";
import Chart from "components/dashboard/Chart";
import Dashboard from "components/dashboard/Dashboard";
import Reports from "components/Merchant/Reports";
import EditProfile from "components/Market/EditProfile";
import Users from "components/Admin/Users";
import Blog from "components/TourService/Blog";
import ReportAdmin from "components/Admin/ReportsTour";
import ReportShopBoatByMonth from "components/Admin/ReportRevenueSB/ReportShopBoatByMonth";
import ReportShopBoatByYear from "components/Admin/ReportRevenueSB/ReportShopBoatByYear";
import ImgQR from "components/Merchant/ImgQR";
import AdminProducts from "components/Admin/Product";


function App() {
  const [cookies] = useCookies(["access_token"]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const clearLocalStorage = () => {
  //     localStorage.clear();
  //   };

  //   window.addEventListener('beforeunload', clearLocalStorage);

  //   return () => {
  //     window.removeEventListener('beforeunload', clearLocalStorage);
  //   };
  // }, []);

  return (
    <div className="App">
      <Routes>
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/shops" element={<Shops />} />
        <Route path="/admin/product" element={<AdminProducts />} />
        <Route path="/admin/tours" element={<Tours />} />
        <Route path="/admin/tour-orders" element={<TourOrders />} />
        <Route path="/admin/reports" element={<ReportAdmin />} />
        <Route path="/admin/reportSBByMonth" element={<ReportShopBoatByMonth />} />
        <Route path="/admin/reportSBByYear" element={<ReportShopBoatByYear />} />


        {/* Merchant */}
        <Route path="/merchant" element={<MerchantDashbroad />} />
        <Route path="/merchant/products" element={<MerchantProducts />} />
        <Route path="/merchant/orders" element={<Orders />} />
        <Route path="/merchant/report" element={<Reports />} />
        <Route path="/merchant/payfee" element={<ImgQR />} />

        {/* TourOnline */}
        <Route path="/tour" element={<TourService />} />
        <Route path="/tour/detail/:slug" element={<TourDetail />} />
        <Route path="/tour/search/:name" element={<TourSearchPage />} />
        <Route path="/tour/search" element={<TourSearchPage />} />
        <Route path="/tour/cart" element={<OrderTour />} />
        <Route path="/tour/blog" element={<Blog />} />

        {/* Marketplace */}
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/marketplace" element={<Homepage />} />
        <Route
          path="/marketplace/search/:name"
          element={<MarketSearchpage />}
        />
        <Route path="/marketplace/search" element={<MarketSearchpage />} />
        <Route
          path="/marketplace/search/category/:categorySlug"
          element={<MarketSearchpage />}
        />
        <Route path="/marketplace/product/:slug" element={<DetailProduct />} />
        <Route path="/marketplace/cart" element={<CartProduct />} />
        <Route path="/marketplace/edit-profile" element={<EditProfile />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />



      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
