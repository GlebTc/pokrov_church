import AddNewSchedulePostMain from './AddNewSchedulePostMain';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';

const page = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AddNewSchedulePostMain user={user} />
    </div>
  );
};

export default page;
