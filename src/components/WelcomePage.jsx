import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to ExpressPass</h1>
      <p className="welcome-text">
        Book your bus and train tickets easily and quickly with ExpressPass.
      </p>
      <div className="button-container">
        <Link to="/signin" className="signin">Sign In</Link>
        <Link to="/signup" className="signup">Sign Up</Link>
        <Link to="/about" className="about">About Us</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
