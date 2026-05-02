import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import MapDashboard from "../pages/admin/MapDashboard";

import DriverHome from "../pages/driver/Home";
import CustomerHome from "../pages/customer/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👨‍💼 Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/map" element={<MapDashboard />} />

        {/* 🚚 Driver */}
        <Route path="/driver" element={<DriverHome />} />

        {/* 👤 Customer */}
        <Route path="/" element={<CustomerHome />} />

      </Routes>
    </BrowserRouter>
  );
}