'use client';

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean; // ✅ 타입 정의
}

export default function TiptapEditor({ content, onChange, readOnly }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: !readOnly, // ✅ 공유 모드에서는 false
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    injectCSS: true,
    autofocus: true,
    immediatelyRender: false,
  });

  return (
    <div className="border p-4 rounded min-h-[300px] cursor-text">
      {editor ? <EditorContent editor={editor} /> : <p>로딩 중...</p>}
    </div>
  );
}
