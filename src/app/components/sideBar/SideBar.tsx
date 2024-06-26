'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import side_bar_content from '@/src/app/utils/content/sideBarContent.json';
import sidebar_icon_one from '@/public/sidebar_icon_one.webp';
import church_front from '@/public/church_front.webp';
import Image from 'next/image';

const SideBar = () => {
  const { language } = useLanguageStore();
  return (
    <div className='flex flex-col items-center text-center gap-4'>
      <h3>
        {language === 'en' ? side_bar_content.title.en[0] : side_bar_content.title.ru[0]}
      </h3>
      <a
        href='/'
        aria-label='Navigate to Home | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
        title='Navigate to Home | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
      >
        <Image
          src={sidebar_icon_one}
          alt='Sidebar Icon One | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church of the Mother of God Church'
          className='rounded-md p-1 border-2 shadow-md shadow-gray-500'
        />
      </a>
      <div className='border-2 rounded-md p-2 w-full'>
        <h4 className='font-semibold border-b-4 w-[80%] mx-auto pb-2 mb-4'>
          {language === 'en' ? 'Address' : 'Адрес'}
        </h4>
        <p>77 Sanford Ave. South, Hamilton, ON L8M2G7, Canada</p>
      </div>
      <div className='border-2 rounded-md p-2 overflow-hidden w-full'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.103911473474!2d-79.84983682334648!3d43.24924397846321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9bec10cf6791%3A0x1c9e197ebd8519a5!2s77%20Sanford%20Ave%20S%2C%20Hamilton%2C%20ON%20L8M%202G7!5e0!3m2!1sen!2sca!4v1710764064717!5m2!1sen!2sca'
          loading='lazy'
          className='object-contain w-full'
        ></iframe>
      </div>
      <div className='border-2 rounded-md p-2 w-full'>
        <h4 className='font-semibold border-b-4 w-[80%] mx-auto pb-2 mb-4'>
          {language === 'en' ? 'Rector of the Church' : 'Настоятель Храма'}
        </h4>
        <p>Fr. Dimitry Chemeris (647) 273-5659</p>
      </div>
      <div className='border-2 rounded-md p-2 w-full'>
        <h4 className='font-semibold border-b-4 w-[80%] mx-auto pb-2 mb-4'>
          {language === 'en' ? 'Service Times' : 'Время Богослужений:'}
        </h4>
        <ul className='text-left list-disc ml-4'>
          <li>
            {language === 'en'
              ? 'Sundays, hours at 9:45, Divine Liturgy at 10:00'
              : 'По воскресным дням, часы в 9:45, Божественная Литургия в 10:00'}
          </li>
          <li>
            {language === 'en'
              ? 'Saturdays, Vespers at 18:00'
              : 'По субботам, Всенощная в 18:00'}
          </li>
        </ul>
      </div>
      <a
        href='/'
        aria-label='Navigate to Home | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
        title='Navigate to Home | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
      >
        <Image
          src={church_front}
          alt='Church Front | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church of the Mother of God Church'
          className='rounded-md p-1 border-2 shadow-md shadow-gray-500'
        />
      </a>
      <div className='border-2 rounded-md p-2 w-full'>
        <h4 className='font-semibold border-b-4 w-[80%] mx-auto pb-2 mb-4'>
          {language === 'en' ? 'Links' : 'Ссылки'}
        </h4>
        <ul className='text-left list-disc ml-4'>
          <li>
            <a
              href='https://azbyka.ru/days/'
              aria-label='Link to Orthodox Calendar | Православный Календарь | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
              title='Link to Orthodox Calendar | Православный Календарь | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
              className='text-blue-500 font-bold hover:text-blue-700'
            >
              {language === 'en'
                ? 'Orthodox Calendar'
                : 'Православный Календарь'}
            </a>
          </li>
          <li>
            <a
              href='https://pravoslavie.ru/24/'
              aria-label='Link to Orthodox News | Православные Новости | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
              title='Link to Orthodox News | Православные Новости | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
              className='text-blue-500 font-bold hover:text-blue-700'
            >
              {language === 'en' ? 'Orthodox News' : 'Православные Новости'}
            </a>
          </li>
        </ul>
      </div>
      <div className='border-2 rounded-md p-2 w-full'>
        <h4 className='font-semibold border-b-4 w-[80%] mx-auto pb-2 mb-4'>
          {language === 'en' ? 'Archives' : 'Архивы'}
        </h4>
      </div>
    </div>
  );
};

export default SideBar;
