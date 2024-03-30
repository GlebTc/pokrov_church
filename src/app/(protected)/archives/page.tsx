import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Unauthorized from '../../components/reusable/Unauthorized';

const Archives = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
