import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000", // ganti sesuai port backend
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API || "http://localhost:5000"
});

export default api;


