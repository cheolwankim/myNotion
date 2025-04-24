import { Suspense } from "react";
import LoginClient from "@/components/LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로그인 페이지 로딩 중...</div>}>
      <LoginClient />
    </Suspense>
  );
}
