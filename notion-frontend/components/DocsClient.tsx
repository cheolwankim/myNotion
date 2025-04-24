"use client";

import { useSearchParams } from "next/navigation";

export default function DocsClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📚 내 문서 목록</h1>
      {q && <p className="text-sm text-gray-600">검색어: {q}</p>}
    </div>
  );
}
