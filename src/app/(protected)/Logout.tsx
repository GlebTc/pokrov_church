'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    <div>
      <button
        onClick={handleSignOut}
        className='NAVBAR_MAIN_PAGE_BUTTON bg-red-500 hover:bg-red-400 min-w-[100px] py-1 rounded-md text-white px-2 duration-300 shadow-md shadow-gray-400 text-center'
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
