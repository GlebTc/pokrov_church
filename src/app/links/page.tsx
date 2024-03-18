"use client";
import { useLanguageStore } from "@/src/app/utils/languageStore";
import LinksList from "./LinksList";

const Links = () => {
  const { language } = useLanguageStore();
  return (
    <div className="flex flex-col bg-white justify-around">
      <h2 className="text-3xl font-semibold mb-8">
        {language === "en" ? "Links" : "Ссылки"}
      </h2>
      <LinksList />
    </div>
  );
};

export default Links;
