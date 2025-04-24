"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DocItem from "./DocItem";

export default function DocList() {
  const [docs, setDocs] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`/docs/${session.user.email}`).then((res) => {
        setDocs(res.data);
      });
    }
  }, [session]);

  return (
    <div className="space-y-2">
      {docs.map((doc: any) => (
        <DocItem key={doc._id} doc={doc} />
      ))}
    </div>
  );
}
