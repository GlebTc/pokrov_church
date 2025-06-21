import ScheduleMain from './ScheduleMain';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';

const News = async () => {
  const supabase = createServerSupabaseClient();

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
