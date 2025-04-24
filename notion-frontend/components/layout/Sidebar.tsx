"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import DocItem from "@/components/docs/DocItem";

export default function Sidebar() {
  const { data: session } = useSession();
  const [docs, setDocs] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchDocs = () => {
    if (session?.user?.email) {
      axios.get(`/docs/${session.user.email}`).then((res) => {
        setDocs(res.data);
      });
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [session, pathname, searchParams]);

  const createDoc = async () => {
    const res = await axios.post("/docs", {
      title: "새 문서",
      userId: session?.user?.email,
    });
    window.location.href = `/docs/${res.data._id}`;
  };

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 border-r flex flex-col">
      {/* 상단 링크 */}
      <div className="mb-4 space-y-2 text-sm text-blue-600">
        <Link href="/" className="block hover:underline">🏠 홈으로 가기</Link>
        <Link href="/docs" className="block hover:underline">📚 문서 목록 보기</Link>
      </div>

      <h2 className="text-lg font-semibold mb-4">📝 내 문서</h2>

      <button
        onClick={createDoc}
        className="w-full mb-4 bg-blue-500 text-white px-3 py-2 rounded text-sm"
      >
        + 새 문서 만들기
      </button>

      <ul className="space-y-2 overflow-y-auto flex-1 text-sm">
        {docs.map((doc: any) => (
          <li key={doc._id}>
            <DocItem doc={doc} onDelete={fetchDocs} />
          </li>
        ))}
      </ul>

      {/* 유저 정보 */}
      {session?.user && (
        <div className="mt-4 text-xs text-gray-700">
          <span className="block mb-1">👤 {session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="text-red-500 hover:underline"
          >
            로그아웃
          </button>
        </div>
      )}
    </aside>
  );
}
