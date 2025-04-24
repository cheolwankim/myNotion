// components/NotFoundContent.tsx
"use client";

export default function NotFoundContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">🚫 페이지를 찾을 수 없습니다.</h1>
      <p className="mt-2 text-gray-600">
        존재하지 않는 문서거나, 접근 권한이 없습니다.
      </p>
    </div>
  );
}
