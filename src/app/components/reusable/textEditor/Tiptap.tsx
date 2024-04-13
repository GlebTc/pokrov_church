'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from "./Toolbar";

const Tiptap = ({ onChange, content }: any) => {

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };


  const editor = useEditor({
    content: content,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800 bg-white max-h-[45dvh] overflow-y-auto',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });



  return <div>
    <Toolbar editor={editor} content={content} />
    <EditorContent editor={editor} />
  </div>;
};

export default Tiptap;

