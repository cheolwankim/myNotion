import { Suspense } from "react";
import DocEditorClient from "@/components/DocEditorClient";

export default function DocEditorPage() {
  return (
    <Suspense fallback={<div>문서 불러오는 중...</div>}>
      <DocEditorClient />
    </Suspense>
  );
}
