import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // 1. Added useNavigate
import "../styles/sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // 2. Initialize navigate

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // 3. Create the handleLogout function
  const handleLogout = () => {
    // Optional: Clear user data here
    // localStorage.removeItem("token");

    closeSidebar();
    navigate("/login"); // 4. Redirect to login route
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar / Drawer */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>ShopLogo</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className="nav-item" end onClick={closeSidebar}>
            Home
          </NavLink>
          <NavLink to="/products" className="nav-item" onClick={closeSidebar}>
            Products
          </NavLink>
        </nav>

        <div className="sidebar-logout">
          {/* 5. Update onClick to use handleLogout */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
