import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Logout from '../../(protected)/Logout';

const LogInLogoutButton = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });

  if (!user) {
    return (
      <div>
        <Link
          href='/login'
          className='absolute top-4 left-4 bg-gray-500 text-white rounded-md p-1 shadow-md shadow-gray-400 cursor-pointer hover:bg-gray-400 duration-300'
        >
          <RiAdminFill
            size={20}
            className='text-white cursor-pointer'
          />
        </Link>
      </div>
    );
  }
  return (
    <div className='absolute top-4 left-4'>
      <Logout />
    </div>
  );
};

export default LogInLogoutButton;
