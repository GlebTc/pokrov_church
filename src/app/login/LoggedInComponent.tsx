'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const LoggedInComponent = ({
  user,
  language,
}: {
  user: User;
  language: string;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div className='bg-gray-200 p-4 rounded-md flex flex-col justify-center items-center'>
      <p className='text-lg font-semibold text-center mb-8'>
        {language === 'en'
          ? `You are signed in as ${user.email}`
          : `Вы вошли как ${user.email}`}
      </p>
      <button
        className='bg-red-500 text-white rounded-md px-4 py-2 mr-2 w-fit font-bold hover:bg-red-600 duration-300 min-w-[120px]'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default LoggedInComponent;
