'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Image from 'next/image';
import administration_page_content from '@/src/app/utils/content/administrationPageContent.json';
import administration_img_one from '@/public/administration/administration_img_one.webp';
import administration_img_two from '@/public/administration/administration_img_two.webp';
import administration_img_three from '@/public/administration/administration_img_three.webp';
import administration_img_four from '@/public/administration/administration_img_four.webp';
import Link from 'next/link';

const Administration = () => {
  const { language } = useLanguageStore();
  return (
    <div className='ADMINISTRATION_PAGE_MAIN_CONTAINER flex flex-col gap-8 text-justify'>
      <h2 className='ADMINISTRATION_PAGE_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-8'>
        {language === 'en' ? `Administration` : `Администрация`}
      </h2>
      <div className='ADMINISTRATION_PAGE_CONTENT_CONTAINER text-gray-700 flex flex-col gap-4 pr-2'>
        <p>
          {language === 'en'
            ? `${administration_page_content.paragraph_one.en}`
            : `${administration_page_content.paragraph_one.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={administration_img_one}
            alt={`${administration_page_content.administration_admin_one.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${administration_page_content.administration_admin_one.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${administration_page_content.administration_admin_one.en}`
              : `${administration_page_content.administration_admin_one.ru}`}
          </p>
          <a
            className='text-blue-500 font-bold hover:text-blue-700'
            href={`${administration_page_content.administration_admin_one.url}`}
          >
            {language === 'en'
              ? `${administration_page_content.administration_admin_one.url_description_en}`
              : `${administration_page_content.administration_admin_one.url_description_ru}`}
          </a>
        </div>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={administration_img_two}
            alt={`${administration_page_content.administration_admin_two.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${administration_page_content.administration_admin_two.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${administration_page_content.administration_admin_two.en}`
              : `${administration_page_content.administration_admin_two.ru}`}
          </p>
          <a
            className='text-blue-500 font-bold hover:text-blue-700'
            href={`${administration_page_content.administration_admin_two.url}`}
          >
            {language === 'en'
              ? `${administration_page_content.administration_admin_two.url_description_en}`
              : `${administration_page_content.administration_admin_two.url_description_ru}`}
          </a>
        </div>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={administration_img_three}
            alt={`${administration_page_content.administration_admin_three.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${administration_page_content.administration_admin_three.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${administration_page_content.administration_admin_three.en}`
              : `${administration_page_content.administration_admin_three.ru}`}
          </p>
          <a
            className='text-blue-500 font-bold hover:text-blue-700'
            href={`${administration_page_content.administration_admin_three.url}`}
          >
            {language === 'en'
              ? `${administration_page_content.administration_admin_three.url_description_en}`
              : `${administration_page_content.administration_admin_three.url_description_ru}`}
          </a>
        </div>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={administration_img_four}
            alt={`${administration_page_content.administration_admin_four.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${administration_page_content.administration_admin_four.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${administration_page_content.administration_admin_four.en}`
              : `${administration_page_content.administration_admin_four.ru}`}
          </p>
          <Link
            className='text-blue-500 font-bold hover:text-blue-700'
            href={`${administration_page_content.administration_admin_four.url}`}
          >
            {language === 'en'
              ? `${administration_page_content.administration_admin_four.url_description_en}`
              : `${administration_page_content.administration_admin_four.url_description_ru}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Administration;
