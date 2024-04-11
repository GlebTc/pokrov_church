'use client';
import { useState } from 'react';

import { useUserStore } from '../../utils/stores/userStore';
import { useLanguageStore } from '../../utils/stores/languageStore';

const Gallery = () => {
  const { language } = useLanguageStore();
  const { user, signInUser } = useUserStore();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Sign In Function
  const handleSignIn = async () => {
    signInUser(loginCredentials);
    setLoginCredentials({ email: '', password: '' });
  };

  return (
    <div>
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
          />
        </form>
        {user ? (
          <div>
            <h1>Welcome {user.email}</h1>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className='bg-green-500 text-white rounded-md px-4 py-2 mr-2 w-fit font-bold hover:bg-green-600 duration-300 min-w-[120px]'
          >
            {language === 'en' ? 'Sign In' : 'Войти'}
          </button>
        )}
      </div>
      {/* <h1>Gallery</h1>
        <UnderConstruction /> */}
    </div>
  );
};

export default Gallery;
