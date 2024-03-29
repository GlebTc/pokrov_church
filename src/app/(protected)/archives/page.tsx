import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Logout from '../Logout';
import Unauthorized from '../../components/reusable/Unauthorized';
import IndividualPost from './posts/IndivudualPost';

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
      <IndividualPost />
    </div>
  );
};

export default Archives;
