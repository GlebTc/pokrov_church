'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import Link from 'next/link';

const OurParishLink = () => {
  const { language } = useLanguageStore();
  return (
    <ul className='LINKS text-left list-disc ml-8 flex flex-col gap-2 mt-8'>
      <li>
        <Link
          href='/our-parish/parish-history'
          aria-label='Link to Our Parish, Parish History | Ссылка на Наш Приход, История Прихода | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Our Parish, Parish History | Ссылка на Наш Приход, История Прихода | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en' ? 'Parish History' : 'История Прихода'}
        </Link>
      </li>
      <li>
        <Link
          href='/our-parish/administration'
          aria-label='Link to Our Parish, Administration | Ссылка на Наш Приход, Администрация | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Our Parish, Administration | Ссылка на Наш Приход, Администрация | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en' ? 'Administration' : 'Администрация'}
        </Link>
      </li>
      <li>
        <Link
          href='/our-parish/gallery'
          aria-label='Link to Our Parish, Gallery | Ссылка на Наш Приход, Галерея | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Our Parish, Gallery | Ссылка на Наш Приход, Галерея | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en' ? 'Gallery' : 'Галерея'}
        </Link>
      </li>
    </ul>
  );
};

export default OurParishLink;
