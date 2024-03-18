"use client";
import { useLanguageStore } from "@/src/app/utils/languageStore";
import side_bar_content from "@/src/app/utils/content/sideBarContent.json";
import sidebar_icon_one from "@/public/sidebar_icon_one.webp";
import Image from "next/image";

const SideBar = () => {
  const { language } = useLanguageStore();
  return (
    <div className="mt-4 p-2 flex flex-col items-center text-center gap-4">
      <h3>
        {language === "en" ? side_bar_content.en[0] : side_bar_content.ru[0]}
      </h3>
      <Image
        src={sidebar_icon_one}
        alt="Sidebar Icon One | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church"
        className="rounded-md p-1 border-2 shadow-lg shadow-gray-500"
      />
      <div className="border-2 rounded-md p-2">
        <h4 className="font-semibold border-b-4">
          {language === "en" ? "Address" : "Адрес"}
        </h4>
        <p>77 Sanford Ave. South, Hamilton, ON L8M2G7, Canada</p>
      </div>
      <div className="border-2 rounded-md p-2 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.103911473474!2d-79.84983682334648!3d43.24924397846321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9bec10cf6791%3A0x1c9e197ebd8519a5!2s77%20Sanford%20Ave%20S%2C%20Hamilton%2C%20ON%20L8M%202G7!5e0!3m2!1sen!2sca!4v1710764064717!5m2!1sen!2sca"
          loading="lazy"
          className="object-contain w-full"
        ></iframe>
      </div>
      <div className="border-2 rounded-md p-2">
        <h4 className="font-semibold border-b-4">
          {language === "en" ? "Rector of the Church" : "Настоятель Храма"}
        </h4>
        <p>Fr. Dimitry Chemeris (647) 273-5659</p>
      </div>
      <div className="border-2 rounded-md p-2">
  <h4>{language === "en" ? "Service Times" : "Время Богослужений:"}</h4>
  <ul className="text-left list-disc ml-4">
    <li>
      {language === "en"
        ? "Sundays, hours at 9:45, Divine Liturgy at 10:00"
        : "По воскресным дням, часы в 9:45, Божественная Литургия в 10:00"}
    </li>
    <li>
      {language === "en" ? "Saturdays, Vespers at 18:00" : "По субботам, Всенощная в 18:00"}
    </li>
  </ul>
</div>

    </div>
  );
};

export default SideBar;
