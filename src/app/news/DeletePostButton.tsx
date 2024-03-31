'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const DeletePostButton = () => {
  const { language } = useLanguageStore();
  return (
    <button className='bg-red-500 hover:bg-red-400 min-w-[200px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400 mt-4'>
      {language === 'en' ? 'Delete Post' : 'Удалить новость'}
    </button>
  );
};

export default DeletePostButton;
