'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Logout = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/'); // Redirect to home page after sign out
      router.refresh(); // Refresh the page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className='absolute top-4 left-4 md:top-2 md:left-2 bg-red-500 hover:bg-red-400 p-1 rounded-md text-white z-[10]'
    >
      <RiLogoutBoxLine size={30} />
    </button>
  );
};

export default Logout;
