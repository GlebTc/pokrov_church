import NewsMain from './NewsMain';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';

const News = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='NEWS_MAIN_CONTAINER'>
      <NewsMain user={user} />
    </div>
  );
};

export default News;
