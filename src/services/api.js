import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = "https://finance-tracker-backend-cvcl.onrender.com/api";

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/auth/login`, data);

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/auth/register`, data);

export const getSummary = () =>
  axios.get(`${BASE_URL}/summary`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const getTransactions = () =>
  axios.get(`${BASE_URL}/transactions`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const addTransaction = (data) =>
  axios.post(`${BASE_URL}/transactions`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteTransaction = (id) =>
  axios.delete(`${BASE_URL}/transactions/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
