'use client';

import React from 'react';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Italic,

} from 'lucide-react';

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const buttonIsActive: string = 'bg-sky-400 p-1 text-white rounded-lg';
  const buttonIsNotActive: string = 'text-sky-400 p-1';

  if (!editor) {
    return null;
  }
  return (
    <div
      className='px-4 py-3 rounded-md flex justify-between items-start
    w-full flex-wrap border border-gray-700'
    >
      <div className='TOOLTIP_TOOLBAR_BOLD_BUTTON flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap '>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? `${buttonIsActive}`
              : `${buttonIsNotActive}`
          }
        >
          <Bold className='w-5 h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic')
              ? `${buttonIsActive}`
              : `${buttonIsNotActive}`
          }
        >
          <Italic className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
