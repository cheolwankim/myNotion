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
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    injectCSS: true,
    autofocus: true,
    immediatelyRender: false,
  });

  // readOnly 상태가 변경될 때 editable 업데이트
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [readOnly, editor]);

  // content 변경 시 에디터 내용 갱신
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="border p-4 rounded min-h-[300px]">
      {editor ? <EditorContent editor={editor} /> : <p>로딩 중...</p>}
    </div>
  );
}
