"use client";
import Image from "next/image";
import nav_hero_image from "@/public/main_hero.webp";
import menuItems from "@/src/app/utils/menuItems.json";
import Link from "next/link";
import { useLanguageStore } from "@/src/app/utils/languageStore";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  const { language, toggleLanguage } = useLanguageStore();
  return (
    <div className="NAVBAR_MAIN_CONTAINER relative bg-white rounded-t-md">
      <div
        className="absolute top-4 right-4 bg-gray-500 text-white rounded-md p-1 shadow-md shadow-gray-400 md:hidden cursor-pointer hover:bg-gray-400 duration-300"
        onClick={handleMobileMenu}
      >
        <IoMdMenu size={25} />
      </div>
      <div className="NAVBAR_HEADER_CONTAINER p-12 flex justify-between items-center">
        <div className="NAVBAR_TITLE_CONTAINER">
          <h1 className="text-2xl font-semibold">
            {language === "en"
              ? "Holy Protection of the Mother of God Church"
              : "Храм Покрова Пресвятой Богородицы"}
          </h1>
          <p className="text-gray-700">
            {language === "en"
              ? "Russian Orthodox Church Abroad (Hamilton, Ontario)"
              : "Русская Православная Церковь Заграницей (Гамильтон, Онтарио)"}
          </p>
        </div>
        <div className="NAVBAR_LANGUAGE_BUTTON_CONTAINER fixed bottom-4 right-4 flex flex-col gap-2">
          <button
            className="bg-gray-500 hover:bg-gray-400 min-w-[100px] py-1 rounded-md text-white duration-300 shadow-md shadow-gray-400"
            onClick={toggleLanguage}
          >
            {language === "en" ? "Русский" : "English"}
          </button>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-400 min-w-[100px] py-1 rounded-md text-white px-2 duration-300 shadow-md shadow-gray-400"
          >
            {language === "en" ? "Main Page" : "Главная страница"}
          </Link>
        </div>
      </div>
      <div className="NAVBAR_HERO_CONTAINER w-full">
        <Image
          src={nav_hero_image}
          alt="Navbar Hero Image | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church"
        />
      </div>
      <ul className="NAVBAR_MENU_CONTAINER h-[50px] bg-gray-500 flex justify-around items-center">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="NAVBAR_MENU_ITEM px-4 py-1 hover:bg-gray-400 rounded-md duration-300 hidden md:block"
          >
            <Link href={item.url_en}>
              <p className="font-bold text-white">
                {language === "en" ? item.title_en : item.title_ru}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
