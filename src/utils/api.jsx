import axios from "axios";
const token = localStorage.getItem("token");
export const axiosQuery = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})