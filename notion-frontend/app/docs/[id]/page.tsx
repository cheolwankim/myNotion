"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const TiptapEditor = dynamic(() => import("@/components/docs/TiptapEditor"), {
  ssr: false, // ✅ 반드시 SSR 끔!
});

export default function DocPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isShared = searchParams.get("share") === "true"; // ✅ 공유 모드 여부

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML
  const [createdAt, setCreatedAt] = useState("");
  const [user, setUser] = useState("");

  const { data: session } = useSession();
  const isOwner = session?.user?.email === user;

  useEffect(() => {
    axios.get(`/docs/item/${id}`).then((res) => {
      const doc = res.data;
      setTitle(doc.title);
      setContent(doc.content || "");
      setCreatedAt(doc.createdAt);
      setUser(doc.user);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`/docs/${id}`, {
        title,
        content,
        userEmail: session?.user?.email, // ✅ 작성자 이메일 함께 보냄
      });
      alert("저장 완료!");
      router.push(`/docs/${id}?refresh=${Date.now()}`); // 사이드바 강제 갱신
    } catch (err) {
      alert("저장 실패");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded text-xl font-bold"
        readOnly={isShared || !isOwner} // 작성자만 편집 가능
      />
      <TiptapEditor
        content={content}
        onChange={setContent}
        readOnly={isShared} // ✅ 아래에서 대응
      />
      <p className="text-sm text-gray-500">
        생성일: {new Date(createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">작성자: {user}</p>

      {isOwner && !isShared && (
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          저장하기
        </button>
      )}

      {isShared && (
        <p className="text-blue-600 font-medium">
          🔗 공유 모드로 열람 중입니다. 편집은 비활성화되어 있습니다.
        </p>
      )}
    </div>
  );
}
