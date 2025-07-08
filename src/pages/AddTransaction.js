import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const AddTransaction = () => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
useEffect(() => {
  if (!token) {
    alert("Please login first");
    window.location.href = "/login";
  }
}, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://finance-tracker-backend-cvcl.onrender.com/api/transactions",
        { type, category, amount, date, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Transaction added!");
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          className="input"
          type="text"
          placeholder="Category (e.g., Food, Salary)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="button" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTransaction;
