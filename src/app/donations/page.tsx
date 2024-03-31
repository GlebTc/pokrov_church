'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import church_front from '@/public/church_front.webp';
import Image from 'next/image';

const Donations = () => {
  const { language } = useLanguageStore();
  return (
    <div className='flex flex-col gap-4 bg-white justify-around'>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Donations' : 'Пожертвования'}
      </h2>
      <a
        href='https://www.canadahelps.org/en/dn/31808'
        className='button animate-pulse'
      >
        Donate
      </a>
      <Image
        src={church_front}
        alt='Donations | Пожертвования'
        className='rounded-md p-1 border-2 max-w-[75%] mx-auto'
      />
      <h3 className='font-bold'>
        {language === 'en' ? 'We need your help!' : 'Нам нужна ваша помощь!'}
      </h3>
      <p>
        {language === 'en'
          ? 'Our parish exists on the voluntary donations of Orthodox Christians.'
          : 'Наш приход существует на добровольные пожертвования православных христиан.'}
      </p>
      <div className='flex flex-col gap-4'>
        <p>
          {language === 'en' ? 'You can help us by:' : 'Вы можете помочь нам:'}
        </p>
        <ul className='ml-8 list-disc'>
          <li>
            <p>
              {language === 'en'
                ? 'Bringing your donation to our church or by mailing it to us as a cheque.'
                : 'Принеся ваше пожертвование в нашу церковь или отправив его нам чеком.'}
            </p>
          </li>
          <li>
            <p>
              {language === 'en'
                ? 'Donating with a credit card or Interac through CanadaHelps.org'
                : 'Пожертвовать с помощью кредитной карты или Interac через CanadaHelps.org'}
            </p>
          </li>
        </ul>
      </div>
      <a
        href='https://www.canadahelps.org/en/dn/31808'
        className='button '
      >
        Donate
      </a>
      <div className='flex flex-col gap-4'>
        <h3 className='font-bold'>
          {language === 'en' ? 'In Addition...' : 'А так же…'}
        </h3>
        <p>
          {language === 'en'
            ? 'Our Sisterhood is always in need of donations of the following items:'
            : 'Сестричество нашего Храма постоянно нуждается в пожертвованиях следующих продуктов:'}
        </p>
        <ul className='ml-8 list-disc'>
          <li>
            <p>{language === 'en' ? 'Flour' : 'Мука'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Sugar' : 'Сахар'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Yeast' : 'Дрожжи'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Coffee' : 'Кофе'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Tea' : 'Чай'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Pasta' : 'Макароны'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Rice' : 'Рис'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Butter' : 'Сливочное масло'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Vegetable oil' : 'Постное масло'}</p>
          </li>
          <li>
            <p>{language === 'en' ? 'Spices' : 'Приправы'}</p>
          </li>
        </ul>
        <p>
          {language === 'en'
            ? 'You may leave your donations in the kitchen with the sisters on duty.'
            : 'Оставить пожертвования можно в кухне у дежурных сестёр.'}
        </p>
        <p>{language === 'en' ? 'God bless!' : 'Спаси Господи!'}</p>
      </div>
    </div>
  );
};

export default Donations;
