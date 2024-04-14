'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Image from 'next/image';
import our_parish from '@/public/our_parish.webp';
import OurParishLink from './OurParishLink';

const OurParish = () => {
  const { language } = useLanguageStore();
  return (
    <div className='flex flex-col bg-white justify-around'>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Our Parish' : 'Наш Приход'}
      </h2>
      <div className='w-full flex justify-center'>
        <Image
          src={our_parish}
          alt='Our Parish | Наш Приход'
          className='rounded-md p-1 border-2'
        />
      </div>
      <OurParishLink />
    </div>
  );
};

export default OurParish;
