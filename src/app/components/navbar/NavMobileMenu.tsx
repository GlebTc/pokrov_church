'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import menuItems from '../../utils/menuItems.json';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavMobileMenu = ({
  mobileMenu,
  handleMobileMenu,
}: {
  mobileMenu: any;
  handleMobileMenu: any;
}) => {
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
  };
  return (
    <div>
      <div
        className={
          mobileMenu
            ? 'MOBILE_MENU_OVERLAY md:hidden fixed left-0 top-0 w-full h-screen bg-black/60 z-[50]'
            : 'hidden'
        }
      ></div>
      <div
        className={
          mobileMenu
            ? 'MOBILE_MENU md:hidden fixed right-0 top-0 w-screen h-screen bg-gray-400 ease-in duration-[1000ms] z-[50]'
            : 'MOBILE_MENU md:hidden fixed right-[-100%] top-0 w-screen h-screen bg-gray-400 ease-in duration-[1000ms]'
        }
      >
        <div className='MOBILE_MENU_CLOSE_BUTTON_AND_HEADER_CONTAINER h-[80px] flex justify-between items-center px-5 border-b-2 border-black'>
          <div className='absolute top-4 right-4 bg-gray-400 text-black rounded-md p-1 shadow-md shadow-gray-600 md:hidden hover:bg-gray-600 duration-300'>
            <AiOutlineClose
              size={30}
              className='text-white cursor-pointer'
              onClick={handleMobileMenu}
            />
          </div>
        </div>
        <div className='MOBILE_MENU_ITEMS_CONTAINER p-5'>
          <ul className='flex flex-col gap-4 justify-around items-start text-black text-xl font-bold'>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`MOBILE_MENU_ITEM flex justify-center items-center h-full p-2 hover:bg-gray-300 hover:text-black duration-500 rounded-lg uppercase relative`}
                onMouseEnter={() => handleSubMenuHover(index)}
                onMouseLeave={handleSubMenuLeave}
                onClick={handleMenuClick.bind(null, index)}
              >
                <Link href={item.url_en}>
                  {language === 'en' ? item.title_en : item.title_ru}
                </Link>
                {item.subMenu && (
                  <ul
                    className={`MOBILE_MENU_SUBMENU_MAIN_CONTAINER absolute top-0 ${language === 'en' ? 'left-[138px] w-fit' : 'left-[160px] w-fit min-w-[240px]'} bg-gray-300 text-black z-[100] rounded-md shadow-md shadow-gray-600${
                      activeSubMenu === index
                        ? ' z-[100] opacity-100 transition-opacity duration-[500ms]'
                        : ' z-[100] opacity-0 transition-opacity duration-[500ms]'
                    }`}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className='px-4 py-1 hover:bg-gray-400 rounded-md duration-300 hover:text-white'
                        onClick={handleMobileMenu}
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
        </div>
      </div>
    </div>
  );
};

export default NavMobileMenu;
