import React from "react";
import "../styles/header.css";

export default function Header({ title }) {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
}
