import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token ? token : "",
  },
});

export default axiosInstance;

