'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const LinksList = () => {
  const { language } = useLanguageStore();

  return (
    <ul className='LINKS text-left list-disc ml-8 flex flex-col gap-8'>
      <li>
        <a
          href='http://www.russianorthodoxchurch.ws/'
          aria-label='Link to Russian Orthodox Church Outside of Russia | Ссылка на Русскую Православную Церковь Заграницей | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Russian Orthodox Church Outside of Russia | Ссылка на Русскую Православную Церковь Заграницей | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Russian Orthodox Church Outside of Russia'
            : 'Русская Православная Церковь Заграницей'}
        </a>
      </li>
      <li>
        <a
          href='http://www.stjohndc.org/'
          aria-label='Link to Russian Orthodox Cathedral of St. John The Baptist | Ссылка на Свято-Иоанно-Предтеченский Собор в Вашингтоне | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Russian Orthodox Cathedral of St. John The Baptist | Ссылка на Свято-Иоанно-Предтеченский Собор в Вашингтоне | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Russian Orthodox Cathedral of St. John The Baptist'
            : 'Свято-Иоанно-Предтеченский Собор в Вашингтоне'}
        </a>
      </li>
      <li>
        <a
          href='http://russtv.ru/'
          aria-label='Link to Russian Orthodox TV | Ссылка на Русское Православное ТВ | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Russian Orthodox TV | Ссылка на Русское Православное ТВ | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Russian Orthodox TV'
            : 'Русское Православное ТВ'}
        </a>
      </li>
      <li>
        <a
          href='http://www.patriarchia.ru/'
          aria-label='Link to Moscow Patriarchate | Ссылка на Сайт Московского Патриархата | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Moscow Patriarchate | Ссылка на Сайт Московского Патриархата | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Moscow Patriarchate'
            : 'Сайт Московского Патриархата'}
        </a>
      </li>
      <li>
        <a
          href='http://www.pravoslavie.ru/'
          aria-label='Link to Orthodox Information Portal | Ссылка на Православный Информационный Портал | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Orthodox Information Portal | Ссылка на Православный Информационный Портал | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Orthodox Information Portal'
            : 'Православный Информационный Портал'}
        </a>
      </li>
      <li>
        <a
          href='http://www.sedmitza.ru/'
          aria-label='Link to Educational Center “Orthodox Encyclopedia” | Ссылка на Церковно-Научный Центр «Православная Энциклопедия» | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Educational Center “Orthodox Encyclopedia” | Ссылка на Церковно-Научный Центр «Православная Энциклопедия» | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Educational Center “Orthodox Encyclopedia”'
            : 'Церковно-Научный Центр «Православная Энциклопедия»'}
        </a>
      </li>
      <li>
        <a
          href='http://mcdiocese.com/'
          aria-label='Link to Official Site of the Montreal and Canadian Diocese; Russian Orthodox Church Abroad | Ссылка на Официальный сайт Монреальской и Канадской Епархии Русской Православной Церкви Заграницей | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          title='Link to Official Site of the Montreal and Canadian Diocese; Russian Orthodox Church Abroad | Ссылка на Официальный сайт Монреальской и Канадской Епархии Русской Православной Церкви Заграницей | Holy Protection of the Mother of God Church | Храм Покрова Пресвятой Богородицы'
          className='text-blue-500 font-bold hover:text-blue-700'
        >
          {language === 'en'
            ? 'Official Site of the Montreal and Canadian Diocese; Russian Orthodox Church Abroad'
            : 'Официальный сайт Монреальской и Канадской Епархии Русской Православной Церкви Заграницей'}
        </a>
      </li>
    </ul>
  );
};

export default LinksList;
