import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ 꼭 설정되어야 함!
  withCredentials: true, // 필요 시
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
