import { Suspense } from "react";
import NotFoundClient from "@/components/NotFoundClient";

export default function NotFound() {
  return (
    <Suspense fallback={<div>404 로딩 중...</div>}>
      <NotFoundClient />
    </Suspense>
  );
}
