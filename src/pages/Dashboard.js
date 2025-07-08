import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import "../styles/style.css";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch Summary
  const fetchSummary = useCallback(async () => {
    try {
      const res = await axios.get("https://finance-tracker-backend-cvcl.onrender.com/api/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (err) {
      alert("Error fetching summary");
    }
  }, [token]);

  // Fetch Transactions
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get("https://finance-tracker-backend-cvcl.onrender.com/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      alert("Error fetching transactions");
    }
  }, [token]);

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, [fetchSummary, fetchTransactions]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://finance-tracker-backend-cvcl.onrender.com/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Transaction deleted!");
      fetchSummary();
      fetchTransactions();
    } catch (err) {
      alert("Failed to delete transaction");
    }
  };

  const pieData = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense },
  ];
  const COLORS = ["#00C49F", "#FF8042"];

  const monthlyExpenseData = useMemo(() => {
    const grouped = {};
    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        const month = new Date(tx.date).toLocaleString("default", { month: "short" });
        grouped[month] = (grouped[month] || 0) + tx.amount;
      }
    });
    return Object.keys(grouped).map((month) => ({
      month,
      expense: grouped[month],
    }));
  }, [transactions]);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p><Link to="/add">➕ Add New Transaction</Link></p>

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
        <p><strong>Total Expense:</strong> ₹{summary.totalExpense}</p>
        <p><strong>Balance:</strong> ₹{summary.balance}</p>
      </div>

      <h3>Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyExpenseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Transactions</h3>
      <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
        {transactions.map((tx) => (
          <li key={tx._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <strong>{tx.type.toUpperCase()}</strong> — {tx.category}: ₹{tx.amount}
            <br />
            <small>{new Date(tx.date).toLocaleDateString()}</small>
            <br />
            <button
              className="button"
              style={{ backgroundColor: "crimson", marginTop: "5px" }}
              onClick={() => handleDelete(tx._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
