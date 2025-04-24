"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Props {
  content: string;
  onChange: (html: string) => void;
  readOnly: boolean;
}

export default function TiptapEditor({ content, onChange, readOnly }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor]);

  return (
    <div className="border p-4 rounded min-h-[300px]">
      {editor ? <EditorContent editor={editor} /> : <p>로딩 중...</p>}
    </div>
  );
}
