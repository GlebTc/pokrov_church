'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import history_page_content from '@/src/app/utils/content/historyPageContent.json';
import Image from 'next/image';
import history_img_one from '@/public/parish_history/history_img_one.webp';
import history_img_two from '@/public/parish_history/history_img_two.webp';
import history_img_three from '@/public/parish_history/history_img_three.webp';
import history_img_four from '@/public/parish_history/history_img_four.webp';
import history_img_five from '@/public/parish_history/history_img_five.webp';
import history_img_six from '@/public/parish_history/history_img_six.webp';
import history_img_seven from '@/public/parish_history/history_img_seven.webp';
import history_img_eight from '@/public/parish_history/history_img_eight.webp';
import history_img_nine from '@/public/parish_history/history_img_nine.webp';
import history_img_ten from '@/public/parish_history/history_img_ten.webp';
import history_img_eleven from '@/public/parish_history/history_img_eleven.webp';

const ParishHistory = () => {
  const { language } = useLanguageStore();
  return (
    <div className='HISTORY_PAGE_MAIN_CONTAINER flex flex-col gap-8 text-justify'>
      <h2 className='HISTORY_PAGE_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-8'>
        {language === 'en' ? `Parish History` : `История Прихода`}
      </h2>
      <h3 className='HISTORY_PAGE_SECONDARY_HEADING_CONTAINER text-xl font-semibold'>
        {language === 'en'
          ? `${history_page_content.title_one.en}`
          : `${history_page_content.title_one.ru}`}
      </h3>
      <div className='HISTORY_PAGE_CONTENT_CONTAINER text-gray-700 flex flex-col gap-4 pr-2'>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_one.en}`
            : `${history_page_content.paragraph_one.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_two.en}`
            : `${history_page_content.paragraph_two.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_three.en}`
            : `${history_page_content.paragraph_three.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_four.en}`
            : `${history_page_content.paragraph_four.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_one}
            alt={`${history_page_content.history_img_one_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_one_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_one_notes.en}`
              : `${history_page_content.history_img_one_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_five.en}`
            : `${history_page_content.paragraph_five.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_two}
            alt={`${history_page_content.history_img_two_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_two_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_two_notes.en}`
              : `${history_page_content.history_img_two_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_six.en}`
            : `${history_page_content.paragraph_six.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_seven.en}`
            : `${history_page_content.paragraph_seven.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_eight.en}`
            : `${history_page_content.paragraph_eight.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_nine.en}`
            : `${history_page_content.paragraph_nine.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_ten.en}`
            : `${history_page_content.paragraph_ten.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_eleven.en}`
            : `${history_page_content.paragraph_eleven.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_three}
            alt={`${history_page_content.history_img_three_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_three_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_three_notes.en}`
              : `${history_page_content.history_img_three_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twelve.en}`
            : `${history_page_content.paragraph_twelve.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_thirteen.en}`
            : `${history_page_content.paragraph_thirteen.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_fourteen.en}`
            : `${history_page_content.paragraph_fourteen.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_four}
            alt={`${history_page_content.history_img_four_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_four_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_four_notes.en}`
              : `${history_page_content.history_img_four_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_fifteen.en}`
            : `${history_page_content.paragraph_fifteen.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_sixteen.en}`
            : `${history_page_content.paragraph_sixteen.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_seventeen.en}`
            : `${history_page_content.paragraph_seventeen.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_eighteen.en}`
            : `${history_page_content.paragraph_eighteen.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_five}
            alt={`${history_page_content.history_img_five_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_five_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_five_notes.en}`
              : `${history_page_content.history_img_five_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_nineteen.en}`
            : `${history_page_content.paragraph_nineteen.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_six}
            alt={`${history_page_content.history_img_six_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_six_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_six_notes.en}`
              : `${history_page_content.history_img_six_notes.ru}`}
          </p>
        </div>
        <h3 className='HISTORY_PAGE_SECONDARY_HEADING_CONTAINER text-xl font-semibold'>
          {language === 'en'
            ? `${history_page_content.title_two.en}`
            : `${history_page_content.title_two.ru}`}
        </h3>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty.en}`
            : `${history_page_content.paragraph_twenty.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_seven}
            alt={`${history_page_content.history_img_seven_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_seven_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_seven_notes.en}`
              : `${history_page_content.history_img_seven_notes.ru}`}
          </p>
        </div>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_eight}
            alt={`${history_page_content.history_img_eight_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_eight_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_eight_notes.en}`
              : `${history_page_content.history_img_eight_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_one.en}`
            : `${history_page_content.paragraph_twenty_one.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_two.en}`
            : `${history_page_content.paragraph_twenty_two.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_nine}
            alt={`${history_page_content.history_img_nine_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_nine_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_nine_notes.en}`
              : `${history_page_content.history_img_nine_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_three.en}`
            : `${history_page_content.paragraph_twenty_three.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_ten}
            alt={`${history_page_content.history_img_ten_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_ten_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_ten_notes.en}`
              : `${history_page_content.history_img_ten_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_four.en}`
            : `${history_page_content.paragraph_twenty_four.ru}`}
        </p>
        <div className='flex flex-col my-4 items-center gap-2'>
          <Image
            src={history_img_eleven}
            alt={`${history_page_content.history_img_eleven_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            title={`${history_page_content.history_img_eleven_notes.en} | Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church`}
            className='rounded-md p-1 border-2'
          />

          <p className='IMAGE_NOTES_CONTAINER text-sm px-12'>
            {language === 'en'
              ? `${history_page_content.history_img_eleven_notes.en}`
              : `${history_page_content.history_img_eleven_notes.ru}`}
          </p>
        </div>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_five.en}`
            : `${history_page_content.paragraph_twenty_five.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_six.en}`
            : `${history_page_content.paragraph_twenty_six.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_seven.en}`
            : `${history_page_content.paragraph_twenty_seven.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_eight.en}`
            : `${history_page_content.paragraph_twenty_eight.ru}`}
        </p>
        <p>
          {language === 'en'
            ? `${history_page_content.paragraph_twenty_nine.en}`
            : `${history_page_content.paragraph_twenty_nine.ru}`}
        </p>
        <div className='HISTORY_FINAL_MESSAGE_CONTAINER bg-gray-300 flex flex-col gap-4 p-8 rounded-md font-bold text-center'>
          <p>
            {language === 'en'
              ? `${history_page_content.history_final_message_pagaraph_one.en}`
              : `${history_page_content.history_final_message_pagaraph_one.en}`}
          </p>
          <p>
            {language === 'en'
              ? `${history_page_content.history_final_message_pagaraph_two.en}`
              : `${history_page_content.history_final_message_pagaraph_two.en}`}
          </p>
          <p>
            {language === 'en'
              ? `${history_page_content.history_final_message_pagaraph_three.en}`
              : `${history_page_content.history_final_message_pagaraph_three.en}`}
          </p>
          <p className='uppercase italic'>
            {language === 'en'
              ? `${history_page_content.history_final_message_pagaraph_four.en}`
              : `${history_page_content.history_final_message_pagaraph_four.en}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParishHistory;
