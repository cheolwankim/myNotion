import { Suspense } from "react";
import DashboardClient from "@/components/DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>대시보드 로딩 중...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
