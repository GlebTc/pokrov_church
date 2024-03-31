'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import administration_img_four from '@/public/administration/administration_img_four.webp';
import Image from 'next/image';

import administration_page_content from '@/src/app/utils/content/administrationPageContent.json';

const FrPeterBiography = () => {
  const { language } = useLanguageStore();
  return (
    <div className='BIOGRAPHY_OF_RECTOR_PETER_PAGE_MAIN_CONTAINER flex flex-col text-justify'>
      <h2 className='BIOGRAPHY_OF_RECTOR_PETER_PAGE_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-4'>
        {language === 'en'
          ? `Biography of Rector Peter`
          : `Биография Настоятеля Петра`}
      </h2>
      <div className='BIOGRAPHY_OF_RECTOR_PETER_PAGE_CONTENT_CONTAINER text-gray-700 flex flex-col gap-4 pr-2'>
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
        </div>
        <h3 className='BIOGRAPHY_OF_RECTOR_PETER_PAGE_SECONDARY_HEADING_CONTAINER text-xl font-semibold'>
          {language === 'en'
            ? `Protopriest Peter Shashkov`
            : `Протоиерей Пётр Шашков`}
        </h3>
        <p>
          {language === 'en'
            ? `Born on the 3rd of August 1966 in Adelaide, South Australia, Australia to Timofey Petrovich and Ekaterina Prokopyevna. Grew up in the Melbourne suburb of Dandenong. Started serving in the altar at the age of 7. At 16 was awarded the right to read the orarion. At the age of 17 was tonsured a reader on April 1, 1984 by the late Archbishop Paul (Sydney and Australian-New Zealand). In September 1987 entered the Holy Trinity Seminary. In 1988 met his future wife at a funeral in a monastery. They were married in Santa Barbara on July 23, 1989. In the same year, on the feast of St. Nicholas the Wonderworker, December 19, was ordained a subdeacon and deacon by the late Metropolitan Laurus, future Archbishop of Troitsk and Syrakus.`
            : `Родился 3-го августа 1966 года В семье Тимофея Петровича и Екатерины Прокопьевны в Аделиаде, штат Южная-Австралия, в Австралии.  Вырос в пригороде Мельбурна, Данденонг.  С 7 лет начал прислуживать в алтаре.  В 16 лет был награжден правом нощения ораря. В 17-ти летнем возрасте был пострижен в чтецы 1-го апреля 1984 приснопамятным Архиепископом Павлом (Сиднейским и Австралийско-Новозеланским)  В сентябре 1987года. поступил в Свято-Троицскую Духовную Семинарию. В 1988-г. познакомился со своей будущей матушкой на отпевании в монастыре. Через год повенчались в Санта Барбаре 23-го июля 1989 года.  В том же году на Св. Николая Чудотворца 19-го декабря, приснопамятным Митрополитом Лавром, будущим архиепископом Троицким и Сиракузким, был рукоположен в Иподиакона и Диакона.`}
        </p>
        <p>
          {language === 'en'
            ? `In 1989, on the feast of the Protection of the Mother of God, October 14, was ordained a priest by the same Metropolitan Laurus. In 1990, on the feast of the Nativity of the Mother of God, September 21, was appointed rector of the parish of the Protection of the Mother of God in Ottawa, Canada.`
            : `До окончания семинарии был снят с семинарской скамьи и 23-го сентября 1990 года в городе Лос Анжелесе, штат Калифорния, США, был рукоположен в священника, приснопамятным Митрополитом Виталием и назначен на первый приход в Канаде.`}
        </p>
        <p>
          {language === 'en'
            ? `In 1991, on the feast of the Protection of the Mother of God, October 14, was appointed rector of the parish of the Protection of the Mother of God in Edmonton, Canada.`
            : `11-го ноября 1991 года прибыл на свой первый приход – Св-Успение Богородицы в г. Лестбридж.`}
        </p>

        <p>
          {language === 'en'
            ? `In 1991, on the feast of the Protection of the Mother of God, October 14, was appointed rector of the parish of the Protection of the Mother of God in Edmonton, Canada.`
            : `11-го ноября 1991 года прибыл на свой первый приход – Св-Успение Богородицы в г. Лестбридж.`}
        </p>

        <p>
          {language === 'en'
            ? `On June 1, 1993, he was appointed rector of the Protection of the Mother of God parish in Hamilton, Ontario.`
            : `1-го июня 1993 года Был назначен настоятелем храма Св-Покрова Богородицы, в городе Гамильтон, Онтарио.`}
        </p>

        <p>
          {language === 'en'
            ? `On February 15, 1996, he was transferred to the Archdiocesan Synod. In the same year, in September, he was appointed rector of the Holy Trinity parish in Oxnard, California.`
            : `15-го февраля 1996 года был переведен в Архиерейский Синод. В том же году в сентябре назначен настоятелем Св-Троицкого прихода в Окснард, Калифорния.`}
        </p>

        <p>
          {language === 'en'
            ? `In 1999, Archbishop Anthony of SF appointed Father Peter to a declining parish in Santa Barbara. Within 6 months, the parish tripled.`
            : `В 1999 году Приснопамятный Архиепископ Антоний СФ назначил о. Петра на распадающий приход в Санта Барбаре. В течение 6 месяцев приход утроился.`}
        </p>

        <p>
          {language === 'en'
            ? `In 2002, Bishop Cyril of SF transferred Father Peter to the Holy Protection parish to revive it. The parish budget was in deficit. Within 3 months, Father Peter managed to balance the financial situation, and three months later, the parish was profitable.`
            : `В 2002 году Владыко Кирилл СФ перевел о. Петра на Св. Покровский приход, чтобы поднять тот приход из руин. Бюджет приход находился в дефиците. В течение 3 месяцев, о Петр сумел сбалансировать финансовое положение, а через еще три месяца приход имел прибыль.`}
        </p>

        <p>
          {language === 'en'
            ? `In 2006, Bishop Cyril gave Father Peter a task to establish a new parish in the suburbs of Los Angeles. Due to a financial crisis, the parish did not recover.`
            : `В 2006 году Владыка Кирилл дал послушание основать новый приход в пригороде Лос Анжелес. Из-за финансового кризиса приход на ноги не встал.`}
        </p>

        <p>
          {language === 'en'
            ? `In 2011, Archbishop Gabriel appointed Father Peter to the Church of All Saints in Calgary, Alberta, Canada.`
            : `В 2011 году Архиепископ Гавриил назначил о. Петра на Храм Всех Святых, Калгари, Альберта, Канада.`}
        </p>

        <p>
          {language === 'en'
            ? `In 2015, he was transferred to the Holy Protection of the Mother of God parish in Hamilton, Ontario, Canada.`
            : `В 2015 году переведен настоятелем Храма Св-Покрова Богородицы в Гамильноте, Онтарио, Канада.`}
        </p>
      </div>
    </div>
  );
};

export default FrPeterBiography;
