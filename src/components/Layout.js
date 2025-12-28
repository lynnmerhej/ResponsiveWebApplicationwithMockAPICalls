import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

export default function Layout() {
  const location = useLocation();

  const titles = {
    "/": "Welcome",
    "/products": "Products",
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Header title={titles[location.pathname] || "Product Details"} />
        <Outlet />
      </div>
    </div>
  );
}
