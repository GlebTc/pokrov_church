'use client';
import { createClient } from '@/src/app/utils/supabase';
import LoggedInComponent from './LoggedInComponent';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

const LoginComponent = ({ user }: { user: User | null }) => {
  const supabase = createClient();
  const router = useRouter();
  const { language } = useLanguageStore();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    const { email, password } = loginCredentials;
    await supabase.auth.signInWithPassword({ email, password });
    setLoginCredentials({ email: '', password: '' });
    router.refresh();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  if (user)
    return (
      <>
        <LoggedInComponent
          user={user}
          language={language}
        />
      </>
    );

  return (
    <div className='flex flex-col gap-2'>
      <form className='flex flex-col gap-2'>
        <label
          htmlFor='email'
          className='text-sm'
        >
          {language === 'en' ? 'Email' : 'Электронная почта'}
        </label>
        <input
          name='email'
          onChange={handleChange}
          value={loginCredentials.email}
          className='border border-gray-300 rounded-md px-3 py-2 mb-4'
          placeholder='Email'
        />
        <label
          htmlFor='password'
          className='text-sm'
        >
          {language === 'en' ? 'Password' : 'Пароль'}
        </label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={loginCredentials.password}
          className='border border-gray-300 rounded-md px-3 py-2 mb-4'
          placeholder='Password'
          onKeyUp={handleKeyPress}
        />
      </form>

      <button
        onClick={handleSignIn}
        className='bg-green-500 text-white rounded-md px-4 py-2 mr-2 w-fit font-bold hover:bg-green-600 duration-300 min-w-[120px]'
      >
        {language === 'en' ? 'Sign In' : 'Войти'}
      </button>
    </div>
  );
};

export default LoginComponent;
