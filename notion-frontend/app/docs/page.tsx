import { Suspense } from "react";
import DocsClient from "@/components/DocsClient";

export default function DocsPage() {
  return (
    <Suspense fallback={<div>문서 목록 로딩 중...</div>}>
      <DocsClient />
    </Suspense>
  );
}
