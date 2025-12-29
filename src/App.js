import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* === PUBLIC ROUTES === */}
        {/* Rendered stand-alone without the Sidebar/Header layout */}
        <Route path="/login" element={<Login />} />

        {/* === PROTECTED DASHBOARD ROUTES === */}
        {/* 1. Auth Guard: Checks for token first */}
        <Route element={<ProtectedRoute />}>
          
          {/* 2. Shared Layout: Applies Sidebar, Header, and main content margins */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            
            {/* Dynamic route parameter (:id) for specific product fetching */}
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}