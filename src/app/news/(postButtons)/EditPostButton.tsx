'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const EditPostButton = () => {
  const { language } = useLanguageStore();
  return (
    <button className='EDIT_POST_BUTTON bg-yellow-500 hover:bg-yellow-400 min-w-[200px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400'>
      {language === 'en' ? 'Edit Post' : 'Редактировать новость'}
    </button>
  );
};

export default EditPostButton;
