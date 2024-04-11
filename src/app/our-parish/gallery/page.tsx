'use client';
import UnderConstruction from '../../components/reusable/UnderConstruction';
import { useLanguageStore } from '../../utils/stores/languageStore';

const Gallery = () => {
  const { language } = useLanguageStore();
  return (
    <div>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Gallery' : 'Галерея'}
      </h2>
      <UnderConstruction />
    </div>
  );
};

export default Gallery;
