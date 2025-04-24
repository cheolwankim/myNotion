'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <p>로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📄 대시보드</h1>
      <p>안녕하세요, {session?.user?.name} 님!</p>
    </div>
  );
}
