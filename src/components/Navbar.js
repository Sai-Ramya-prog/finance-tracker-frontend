import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // remove token from localStorage
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">Budget Buddy</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
