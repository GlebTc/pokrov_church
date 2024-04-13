'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const AddNewSchedulePostButton = () => {
  const { language } = useLanguageStore();
  return (
    <button className='bg-gray-500 hover:bg-gray-400 min-w-[180px] py-1 px-2 rounded-md text-white duration-300 shadow-md shadow-gray-400'>
      {language === 'en' ? 'Add New Schedule Post' : 'Добавить расписание'}
    </button>
  );
};

export default AddNewSchedulePostButton;
