'use client';

import Link from "next/link";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function DocItem({ doc }: { doc: any }) {
  const { data: session } = useSession();

  const handleDelete = async () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await axios.post("/docs/delete", {
        id: doc._id,
        userEmail: session?.user?.email,
      });
      location.reload(); // 간단하게 새로고침
    } catch (err: any) {
      alert(err.response?.data?.message || "삭제 실패");
    }
  };

  return (
    <div className="flex justify-between items-center border p-4 rounded hover:bg-gray-100">
      <Link href={`/docs/${doc._id}`} className="flex-1">
        <p className="font-medium">{doc.title}</p>
        <p className="text-sm text-gray-500">
          {new Date(doc.createdAt).toLocaleString()}
        </p>
      </Link>
      <button
        onClick={handleDelete}
        className="ml-4 text-sm text-red-500 hover:underline"
      >
        삭제
      </button>
    </div>
  );
}
