"use client";
import Image from "next/image";
import schedule from "@/public/schedule.webp";
import { useLanguageStore } from "@/src/app/utils/languageStore";

const Schedule = () => {
  const { language } = useLanguageStore();
  return (
    <div className="bg-white w-full p-8 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold mb-8">
        {language === "en" ? "~Schedule~" : "~Расписание~"}
      </h2>
      <div>
        <Image
          src={schedule}
          alt="Schedule | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church"
          className="rounded-md p-1 border-2 w-full"
        />
      </div>
    </div>
  );
};

export default Schedule;