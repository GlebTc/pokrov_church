'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Link from 'next/link';

const NavbarUserNavShortcuts = () => {
  const { language, toggleLanguage } = useLanguageStore();
  return (
    <div className='NAVBAR_USER_NAVIGATION_SHORTCUTS fixed bottom-4 right-4 z-[30] flex flex-col gap-2'>
      <Link
        href='https://www.canadahelps.org/en/dn/31808'
        className='NAVBAR_SCHEDULE_BUTTON bg-blue-500 hover:bg-blue-400 min-w-[180px] py-1 rounded-md text-white px-2 duration-300 shadow-md shadow-gray-400 text-center animate-pulse font-bold'
      >
        {language === 'en' ? 'Donations' : 'Пожертвования'}
      </Link>
      <Link
        href='/schedule'
        className='bg-gray-500 hover:bg-gray-400 min-w-[180px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400 text-center'
      >
        {language === 'en' ? 'Schedule' : 'Расписание'}
      </Link>
      <button
        className='NAVBAR_USER_NAVIGATION_SHORTCUTS_LANGUAGE_TOGGLE_BUTTON bg-gray-500 hover:bg-gray-400 min-w-[180px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400'
        onClick={toggleLanguage}
      >
        {language === 'en' ? 'Русский' : 'English'}
      </button>
    </div>
  );
};

export default NavbarUserNavShortcuts;
