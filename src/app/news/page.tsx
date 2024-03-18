"use client";
import { useLanguageStore } from "@/src/app/utils/languageStore";

const News = () => {
  const { language } = useLanguageStore();
  return (
    <div className="flex flex-col bg-white justify-around">
      <h2 className="text-3xl font-semibold mb-8">
        {language === "en" ? "News" : "Новости"}
      </h2>
    </div>
  );
};

export default News;
