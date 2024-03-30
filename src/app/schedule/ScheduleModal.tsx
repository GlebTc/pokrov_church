import Image from 'next/image';
import schedule from '@/public/schedule.webp';
import { IoClose } from 'react-icons/io5';

const ScheduleModal = ({ setModal }: { setModal: any }) => {
  return (
    <div className='fixed inset-0 z-[50] flex justify-center items-center bg-gray-900/90 w-full p-8'>
      <div className='CLOSE_BUTTON absolute top-5 right-5 p-1 bg-gray-500 rounded-md hover:bg-gray-600 duration-300 z-[100]'>
        <IoClose
          size={40}
          className='text-white cursor-pointer'
          onClick={setModal}
        />
      </div>
      <div className='relative w-full h-full overflow-auto'>
        <Image
          src={schedule}
          alt='Modal Image'
          fill
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default ScheduleModal;
