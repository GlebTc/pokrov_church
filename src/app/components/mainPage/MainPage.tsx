'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import main_page_content from '@/src/app/utils/content/mainPageContent.json';
import main_image_one from '@/public/main_image_one.webp';
import Image from 'next/image';
import Link from 'next/link';

const MainPage = () => {
  const { language } = useLanguageStore();

  return (
    <div className='MAIN_PAGE_MAIN_CONTAINER flex flex-col gap-4'>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Main Page' : 'Главная Страница'}
      </h2>
      <div className='bg-gray-300 flex flex-col gap-4 p-8 rounded-md'>
        <p className='font-bold'>
          {language === 'en'
            ? main_page_content.en[0]
            : main_page_content.ru[0]}
        </p>
        <p>
          {language === 'en'
            ? main_page_content.en[1]
            : main_page_content.ru[1]}
        </p>
        <p className='font-bold'>
          {language === 'en'
            ? main_page_content.en[2]
            : main_page_content.ru[2]}
        </p>
      </div>
      <p>
        {language === 'en' ? main_page_content.en[3] : main_page_content.ru[3]}
      </p>
      <Image
        src={main_image_one}
        alt='Main Image One | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
        className='rounded-md p-1 border-2 w-full'
      />
      <Link
        href='schedule'
        className='bg-gray-500 hover:bg-gray-400 rounded-md text-white py-2 w-full font-bold text-center duration-300'
      >
        {language === 'en' ? 'Schedule' : 'Расписание'}
      </Link>
    </div>
  );
};

export default MainPage;
