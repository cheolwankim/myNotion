// lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ .env.local에서 가져옴
  withCredentials: true, // 필요 시 (JWT 쿠키 등)
});

export default instance;





// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ 백엔드 주소 + /api  로컬에서 가능
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;
