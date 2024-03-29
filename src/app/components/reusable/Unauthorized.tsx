import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-fit'>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        Unauthorized Access
      </h1>
      <p className='text-gray-600 mb-8 text-center'>
        You are not authorized to view this page. Please login or contact
        support.
      </p>
      <Link
        href='/login'
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Login
      </Link>
    </div>
  );
};

export default Unauthorized;
