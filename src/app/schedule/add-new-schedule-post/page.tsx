import AddNewSchedulePostMain from './AddNewSchedulePostMain';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const page = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return (
    <div>
      <AddNewSchedulePostMain user={user}/>
    </div>
  );
};

export default page;
