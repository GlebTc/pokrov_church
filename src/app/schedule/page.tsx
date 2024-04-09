import ScheduleMain from './ScheduleMain';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const News = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='SCHEDULE_MAIN_CONTAINER'>
      <ScheduleMain user={user} />
    </div>
  );
};

export default News;