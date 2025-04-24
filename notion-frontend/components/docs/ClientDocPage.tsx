"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/docs/TiptapEditor"), {
  ssr: false,
});

export default function ClientDocPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isShared = searchParams.get("share") === "true";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        userEmail: session?.user?.email,
      });
      alert("저장 완료!");
      router.push(`/docs/${id}?refresh=${Date.now()}`);
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
        readOnly={isShared || !isOwner}
      />
      <TiptapEditor content={content} onChange={setContent} readOnly={isShared} />
      <p className="text-sm text-gray-500">생성일: {new Date(createdAt).toLocaleString()}</p>
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
