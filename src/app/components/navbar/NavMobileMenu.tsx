'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import menuItems from '../../utils/menuItems.json';
import { usePathname } from 'next/navigation';

const NavMobileMenu = ({
  mobileMenu,
  handleMobileMenu,
}: {
  mobileMenu: any;
  handleMobileMenu: any;
}) => {
  const pathname = usePathname();
  const { language } = useLanguageStore();
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
            ? 'MOBILE_MENU md:hidden fixed right-0 top-0 w-[75%] sm:w-[50%] md:w-[45%] h-screen bg-gray-400 ease-in duration-1000 z-[50]'
            : 'MOBILE_MENU md:hidden fixed right-[-100%] top-0 w-[75%] sm:w-[50%] md:w-[45%] h-screen bg-slate-300 ease-in duration-1000'
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
          <ul className='flex flex-col gap-4 justify-around items-start text-black text-2xl font-bold'>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex justify-center items-center h-full
          ${
            pathname !== item.url_en
              ? 'p-2 hover:bg-gray-300 hover:text-black duration-500 rounded-lg uppercase'
              : ''
          }
          `}
                onClick={handleMobileMenu}
              >
                <Link
                  href={item.url_en}
                  className={`${
                    pathname === item.url_en
                      ? 'p-2 custom_orange duration-500 rounded-lg uppercase h-[100%]'
                      : ''
                  }`}
                >
                  {language === 'en' ? item.title_en : item.title_ru}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavMobileMenu;
