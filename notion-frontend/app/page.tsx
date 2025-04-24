import { Suspense } from "react";
import HomePageClient from "@/components/HomePageClient";

export default function HomePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HomePageClient />
    </Suspense>
  );
}
