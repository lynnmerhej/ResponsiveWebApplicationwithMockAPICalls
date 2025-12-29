import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Import global styles and animations here so they apply to the entire app
import "./styles/styles.css";
import "./styles/animations.css";

// React 18 initialization: Create a root targeting the 'root' div in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Mount the main App component
root.render(<App />);