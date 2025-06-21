import { createServerSupabaseClient } from '@/src/app/utils/supabase';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

const Archives = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      Archived posts will render here
    </div>
  );
};

export default Archives;
