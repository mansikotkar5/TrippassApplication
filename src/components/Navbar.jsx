import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Import CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🚆 ExpressPass</Link>
      <div>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
