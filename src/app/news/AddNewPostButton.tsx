'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const AddNewPostButton = () => {
  const { language } = useLanguageStore();
  return (
    <button className='bg-gray-500 hover:bg-gray-400 min-w-[200px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400'>
      {language === 'en' ? 'Add New Post' : 'Добавить новость'}
    </button>
  );
};

export default AddNewPostButton;
