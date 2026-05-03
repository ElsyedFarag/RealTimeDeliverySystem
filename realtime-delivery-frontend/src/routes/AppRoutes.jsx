import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../features/customer/pages/HomePage";
import CustomerLayout from "../layouts/CustomerLayout";
import Products from "../features/customer/pages/Products";
import ProductDetails from "../features/customer/pages/ProductDetails";
import Orders from "../features/customer/pages/Orders";
import Tracking from "../features/customer/pages/Tracking";
import Profile from "../features/customer/pages/Profile";
import Reviews from "../features/customer/pages/Reviews ";
import Offers from "../features/customer/pages/Offers";
import OfferDetails from "../features/customer/pages/OfferDetails";
import Support from "../features/customer/pages/Support";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews  />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:id" element={<OfferDetails />} />
        <Route path="/support" element={<Support />} />


      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
