"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

interface Props {
  doc: {
    _id: string;
    title: string;
    user: string;
  };
  onDelete?: () => void;
}

export default function DocItem({ doc, onDelete }: Props) {
  const { data: session } = useSession();
  const isOwner = session?.user?.email === doc.user;

  const handleDelete = async () => {
    const confirmDelete = confirm("이 문서를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.post("/docs/delete", {
        id: doc._id,
        userEmail: session?.user?.email,
      });

      alert("삭제 성공");
      onDelete?.(); // 부모에서 문서 목록 다시 불러오게
    } catch (err) {
      alert("삭제 실패");
    }
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <Link
        href={`/docs/${doc._id}`}
        className="flex-1 text-gray-800 hover:text-blue-600"
      >
        {doc.title || "제목 없음"}
      </Link>

      {isOwner && (
        <button
          onClick={handleDelete}
          className="text-red-500 ml-2 text-xs hover:underline"
        >
          삭제
        </button>
      )}
    </div>
  );
}
