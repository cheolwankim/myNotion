"use client";

export default function NotFoundClient() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-2">🚫 페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500">존재하지 않는 경로이거나, 접근 권한이 없는 페이지입니다.</p>
    </div>
  );
}
