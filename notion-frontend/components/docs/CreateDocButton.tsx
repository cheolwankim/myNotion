'use client';

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function CreateDocButton() {
  const { data: session } = useSession();

  const createDoc = async () => {
    const res = await axios.post("/docs", {
      title: "새 문서",
      userId: session?.user?.email, // or user id
    });
    location.reload();
  };

  return (
    <button onClick={createDoc} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      + 새 문서 만들기
    </button>
  );
}
