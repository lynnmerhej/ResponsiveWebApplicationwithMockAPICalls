import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

export default function Layout() {
  const location = useLocation();

  // Simple map to update Header based on current route
  const titles = {
    "/": "Welcome",
    "/products": "Products",
  };

  return (
    <div className="app-layout">
      {/* Sidebar persists across all dashboard pages */}
      <Sidebar />
      
      <div className="content">
        {/* Fallback to generic title for dynamic routes (e.g. /products/123) */}
        <Header title={titles[location.pathname] || "Product Details"} />
        
        {/* Renders the child route (Home, Products, etc.) */}
        <Outlet />
      </div>
    </div>
  );
}