import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://finance-tracker-backend-cvcl.onrender.com/api/auth/register", {
      name,
      email,
      password,
    });

    // Save token & redirect
    localStorage.setItem("token", res.data.token);
    alert("Registration successful! Registration successful. Please log in");
    window.location.href = "/login"; // or navigate("/login");
  } catch (err) {
    alert(err.response?.data?.msg || "Registration failed. Try again later.");
  }
};


  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="form">
  <div className="form-group">
    <input
      type="text"
      placeholder="Name"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="form-group">
    <input
      type="email"
      placeholder="Email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="form-group">
    <input
      type="password"
      placeholder="Password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button type="submit" className="button">Register</button>
</form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
