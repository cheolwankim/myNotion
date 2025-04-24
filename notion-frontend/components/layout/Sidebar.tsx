"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useSession, signOut,signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Sidebar() {
  const { data: session } = useSession();
  const [docs, setDocs] = useState([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`/docs/${session.user.email}`).then((res) => {
        setDocs(res.data);
      });
    }
  }, [session, pathname, searchParams]);

  const createDoc = async () => {
    try {
      const res = await axios.post("/docs", {
        title: "새 문서",
        userId: session?.user?.email,
      });
      window.location.href = `/docs/${res.data._id}`;
    } catch (err) {
      alert("문서 생성 실패");
    }
  };

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 border-r flex flex-col">
      <h2 className="text-lg font-semibold mb-4">📝 내 문서</h2>

      {/* 링크 네비게이션 */}
      <nav className="mb-4 space-y-1 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          🏠 홈으로
        </Link>
        <Link href="/docs" className="text-blue-600 hover:underline">
          📚 문서 목록
        </Link>
      </nav>

      {/* 새 문서 생성 버튼 */}
      <button
        onClick={createDoc}
        className="w-full mb-4 bg-blue-500 text-white px-3 py-2 rounded text-sm"
      >
        + 새 문서 만들기
      </button>

      {/* 문서 리스트 */}
      <ul className="space-y-2 overflow-y-auto flex-1">
        {docs.map((doc: any) => (
          <li key={doc._id}>
            <Link
              href={`/docs/${doc._id}`}
              className="block text-sm text-gray-800 hover:text-blue-600"
            >
              {doc.title || "제목 없음"}
            </Link>
          </li>
        ))}
      </ul>

      {/* 로그아웃 또는 로그인 버튼 */}
      {session ? (
        <div className="mt-4 flex flex-col text-xs text-gray-700">
          <span className="mb-1">👤 {session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="text-red-500 hover:underline"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-blue-600 text-xs mt-4 hover:underline"
        >
          Google 로그인
        </button>
      )}
    </aside>
  );
}
