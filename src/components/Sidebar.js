import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css"; 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile drawer state
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    // Cleanup auth state before redirecting
    localStorage.removeItem("auth");
    closeSidebar();
    navigate("/login");
  };

  return (
    <>
      {/* MOBILE TOP BAR:
        Hidden on Desktop via CSS. Only visible on small screens to 
        provide the Hamburger trigger.
      */}
      <header className="mobile-header">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          {/* Hamburger Icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-logo">ShopLogo</div>
      </header>

      {/* BACKDROP OVERLAY:
        Covers the main content when menu is open. Clicking it closes the menu (UX best practice).
      */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* SIDEBAR DRAWER:
        On Desktop: Statically positioned on the left.
        On Mobile: Fixed off-screen (translateX) until 'open' class is added.
      */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {/* Sidebar Internal Header (Logo + Close Button) */}
        <div className="sidebar-header-row">
          <div className="sidebar-logo">
             <h2>ShopLogo</h2>
          </div>
          <button className="close-btn" onClick={closeSidebar}>
            {/* X Icon for mobile closing */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {/* We add onClick={closeSidebar} to auto-close the drawer when a link is clicked on mobile */}
          <NavLink to="/" className="nav-item" end onClick={closeSidebar}>
            Home
          </NavLink>
          <NavLink to="/products" className="nav-item" onClick={closeSidebar}>
            Products
          </NavLink>
        </nav>

        {/* Logout Section - Pushed to bottom via CSS flex-grow/margin logic */}
        <div className="sidebar-logout">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}