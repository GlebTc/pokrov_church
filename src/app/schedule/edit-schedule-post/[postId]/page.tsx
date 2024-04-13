import EditSchedulePostMain from './EditSchedulePostMain';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseSchedule = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const page = async ({ params }: { params: any }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch User Information
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch Individual Post Data
  const { data, error } = await supabaseSchedule
    .from('schedule_posts')
    .select('*')
    .eq('id', params.postId);

  return (
    <div>
      <EditSchedulePostMain
        user={user}
        postData={data}
      />
    </div>
  );
};

export default page;
