'use client';
import menuItems from '@/src/app/utils/menuItems.json';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Link from 'next/link';
import { useState } from 'react';

const NavbarDesktopMenu = () => {
  const { language } = useLanguageStore();
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const handleSubMenuHover = (index: number) => {
    setActiveSubMenu(index);
  };

  const handleSubMenuLeave = () => {
    setActiveSubMenu(null);
  };

  const handleMenuClick = (index: number) => {
    setActiveSubMenu(index);
    setActiveSubMenu(null);
  };

  return (
    <ul className='NAVBAR_MENU_CONTAINER h-[50px] bg-gray-500  justify-around items-center hidden md:flex'>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className='NAVBAR_MENU_ITEM relative px-4 py-1 hover:bg-gray-400 rounded-md duration-300'
          onMouseEnter={() => handleSubMenuHover(index)}
          onMouseLeave={handleSubMenuLeave}
          onClick={handleMenuClick.bind(null, index)}
        >
          <Link href={item.url_en}>
            <p className='font-bold text-white'>
              {language === 'en' ? item.title_en : item.title_ru}
            </p>
          </Link>
          {item.subMenu && (
            <ul
              className={`absolute top-8 left-0 w-48 bg-gray-500 text-white rounded-b-md text-left ${
                activeSubMenu === index
                  ? ' z-[100] opacity-100 transition-opacity duration-[500ms]'
                  : ' z-[100] opacity-0 transition-opacity duration-[500ms]'
              }`}
            >
              {item.subMenu.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className='px-4 py-1 hover:bg-gray-400 rounded-md duration-300'
                >
                  <Link href={subItem.subMenuUrl_en}>
                    <p>
                      {language === 'en'
                        ? subItem.subMenuTitle_en
                        : subItem.subMenuTitle_ru}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavbarDesktopMenu;
