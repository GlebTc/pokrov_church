'use client';

import { RiLogoutBoxLine } from 'react-icons/ri';
import Link from 'next/link';

const Logout = () => {
  return (
    <Link
      href='/login'
      className='absolute top-4 left-4 md:top-2 md:left-2 bg-red-500 hover:bg-red-400 p-1 rounded-md text-white z-[10]'
    >
      <RiLogoutBoxLine size={30} />
    </Link>
  );
};

export default Logout;
