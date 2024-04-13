'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const DeleteNewsPostButton = () => {
  const { language } = useLanguageStore();
  return (
    <button className='DELETE_POST_BUTTON bg-red-500 hover:bg-red-400 min-w-[200px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400'>
      {language === 'en' ? 'Delete Post' : 'Удалить новость'}
    </button>
  );
};

export default DeleteNewsPostButton;
