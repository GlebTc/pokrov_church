import NewsMain from './NewsMain';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const News = async () => {
  
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return (
    <div className='NEWS_MAIN_CONTAINER'>
      <NewsMain user={user}/>
    </div>
  );
};

export default News;
