'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useLanguageStore } from '@/src/app/utils/languageStore';

const Login = () => {
  const [email, setEmail] = useState(''); // webdevelopmenthamilton@gmail.com
  const [password, setPassword] = useState(''); // webdev123
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguageStore();

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setEmail('');
    setPassword('');
    router.push("/archives");
    router.refresh();
  };

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setEmail('');
    setPassword('');
    router.refresh();
  };

  if (loading) return <div>Loading...</div>;
  
  if (user)
    return (
      <div>
        {language === 'en'
          ? `You are signed in as ${user.email}`
          : `Вы зарегистрирован как ${user.email}`}
      </div>
    );

  return (
    <div className='flex flex-col gap-2'>
      <input
        name='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className='border border-gray-300 rounded-md px-3 py-2 mb-4'
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className='border border-gray-300 rounded-md px-3 py-2 mb-4'
        placeholder='Password'
      />

      <button
        onClick={handleSignIn}
        className='bg-green-500 text-white rounded-md px-4 py-2 mr-2 w-fit font-bold hover:bg-green-600 duration-300 min-w-[120px]'
      >
        Sign in
      </button>
      <button
        onClick={handleSignUp}
        className='bg-blue-500 text-white rounded-md px-4 py-2 mr-2 w-fit font-bold hover:bg-blue-600 duration-300 min-w-[120px]'
      >
        Sign up
      </button>
    </div>
  );
};

export default Login;
