'use client';

import React from 'react';
import { type Editor } from '@tiptap/react';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const buttonIsActive: string = 'bg-gray-400 p-1 text-white rounded-lg';
  const buttonIsNotActive: string = 'text-gray-400 p-1';

  if (!editor) {
    return null;
  }
  return (
    <div
      className='TOOLTIP_TOOLBAR_BOLD_BUTTONS_CONTAINER_ONE px-4 py-3 rounded-md flex justify-between items-start
    w-full flex-wrap border border-gray-700'
    >
      <div className='TOOLTIP_TOOLBAR_BOLD_BUTTONS_CONTAINER_TWO flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap '>
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
          <Bold className='w-7 h-7 hover:bg-gray-200 p-1 rounded-md' />
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
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive('underline')
              ? `${buttonIsActive}`
              : `${buttonIsNotActive}`
          }
        >
          <Underline className='w-5 h-5' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList')
              ? `${buttonIsActive}`
              : `${buttonIsNotActive}`
          }
        >
          <List className='w-5 h-5' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList')
              ? `${buttonIsActive}`
              : `${buttonIsNotActive}`
          }
        >
          <ListOrdered className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
