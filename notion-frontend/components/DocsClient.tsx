"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import DocItem from "@/components/docs/DocItem";

export default function DocsClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`/docs/${session.user.email}`).then((res) => {
        setDocs(res.data);
      });
    }
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 내 문서 목록</h1>
      {q && <p className="text-sm text-gray-600">검색어: {q}</p>}

      <div className="space-y-2 mt-4">
        {docs.length === 0 ? (
          <p className="text-gray-500">문서가 없습니다.</p>
        ) : (
          docs.map((doc: any) => (
            <DocItem key={doc._id} doc={doc} />
          ))
        )}
      </div>
    </div>
  );
}
