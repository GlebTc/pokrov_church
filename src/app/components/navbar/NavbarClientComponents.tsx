'use client';
import { IoMdMenu } from 'react-icons/io';
import { useState } from 'react';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Image from 'next/image';
import nav_hero_image from '@/public/main_hero.webp';
import Link from 'next/link';
import NavMobileMenu from './NavMobileMenu';
import menuItems from '@/src/app/utils/menuItems.json';

const NavbarClientComponents = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  const { language } = useLanguageStore();
  return (
    <div className='NAVBAR_HEADER_CONTAINER relative pt-16 text-center border-b-4'>
      <div
        className='NAVBAR_MENU_BUTTON_CONTAINER absolute right-4 top-4  bg-gray-500 text-white rounded-md p-1 shadow-md shadow-gray-400 cursor-pointer hover:bg-gray-400 duration-300 md:hidden'
        onClick={handleMobileMenu}
      >
        <IoMdMenu size={30} />
      </div>
      <Link
        href='/'
        className='NAVBAR_TITLE_CONTAINER'
      >
        <h1 className='text-2xl font-semibold px-4'>
          {language === 'en'
            ? 'Holy Protection of the Mother of God Church'
            : 'Храм Покрова Пресвятой Богородицы'}
        </h1>
        <p className='text-gray-700 px-4'>
          {language === 'en'
            ? 'Russian Orthodox Church Abroad (Hamilton, Ontario)'
            : 'Русская Православная Церковь Заграницей (Гамильтон, Онтарио)'}
        </p>
      </Link>
      <div className='NAVBAR_HERO_CONTAINER w-full mt-8'>
        <Image
          src={nav_hero_image}
          priority
          alt='Navbar Hero Image | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church'
        />
      </div>
      <ul className='NAVBAR_MENU_CONTAINER h-[50px] bg-gray-500  justify-around items-center hidden md:flex'>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className='NAVBAR_MENU_ITEM px-4 py-1 hover:bg-gray-400 rounded-md duration-300 '
          >
            <Link href={item.url_en}>
              <p className='font-bold text-white'>
                {language === 'en' ? item.title_en : item.title_ru}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {mobileMenu && (
        <NavMobileMenu
          mobileMenu={mobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      )}
    </div>
  );
};

export default NavbarClientComponents;
