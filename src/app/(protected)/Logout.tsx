'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Logout = async () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };
  return (
    <div className={`${user ? 'block' : 'hidden'}`}>
      <button
        onClick={handleSignOut}
        className='NAVBAR_MAIN_PAGE_BUTTON bg-red-500 hover:bg-red-400 min-w-[180px] py-1 rounded-md text-white px-2 duration-300 shadow-md shadow-gray-400 text-center'
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
