import React from "react";
import "../styles/header.css";

// Reusable header component, sits at top of dashboard layout
export default function Header({ title }) {
  return (
    <header className="app-header">
      {/* Dynamic title passed down from Layout based on current route */}
      <h1>{title}</h1>
    </header>
  );
}