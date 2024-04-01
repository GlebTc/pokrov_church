import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const NotFound = () => {
  return <div>
    {useLanguageStore.getState().language === 'en' ? 'We are sorry, but the pageyo uare looking for could not be found' : 'Извините, но страница, которую вы ищете, не существует.'}
  </div>;
};

export default NotFound;
