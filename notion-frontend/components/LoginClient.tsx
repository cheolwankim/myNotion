"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorQuery = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorQuery || "");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // 임시 방식
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "로그인 실패");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
