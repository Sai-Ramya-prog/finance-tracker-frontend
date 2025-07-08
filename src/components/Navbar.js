import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
<nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">Budget Buddy</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
