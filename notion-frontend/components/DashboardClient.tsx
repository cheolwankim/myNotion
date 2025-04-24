"use client";

import { useSession } from "next-auth/react";

export default function DashboardClient() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-6 text-red-500">로그인이 필요합니다.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">📊 대시보드</h1>
      <p className="text-gray-700">안녕하세요, {session.user?.name} 님!</p>
    </div>
  );
}
