import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 주소
  withCredentials: true,
});

export default instance;
