import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';
import Logout from '@/src/app/(protected)/Logout';

const LogInLogoutButton = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href='/login'
        className='absolute top-4 left-4 md:top-2 md:left-2 bg-gray-500 hover:bg-gray-400 p-1 rounded-md text-white z-[10]'
      >
        <RiAdminFill size={30} />
      </Link>
    );
  }
  return <Logout />;
};

export default LogInLogoutButton;
