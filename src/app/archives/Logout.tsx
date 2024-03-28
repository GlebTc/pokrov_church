'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };
  return (
    <div>
      <button
        onClick={handleSignOut}
        className='bg-red-400 hover:bg-red-500 p-2 px-4 rounded-md text-white font-bold'
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
