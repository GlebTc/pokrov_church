'use client';
import { useState } from 'react';
import { formatPostDate } from '@/src/app/utils/dateFormat';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import Image from 'next/image';
import ScheduleModal from './ScheduleModal';

const IndividualSchedulePost: React.FC<any | SchedulePostTypes> = ({
  id,
  created_at,
  title,
  author,
  scheduleImageUrl,
}) => {
  const [individualScheduleModal, setIndividualScheduleModal] = useState(false);
  return (
    <div
      key={id}
      className='flex flex-col gap-4'
    >
      <h3 className='text-xl font-semibold text-center '>{title}</h3>

      <div className='w-full flex justify-center'>
        <Image
          onClick={() => setIndividualScheduleModal(true)}
          src={scheduleImageUrl}
          alt='Schedule Image'
          width={500}
          height={600}
          className='rounded-md p-1 border-2 object-contain cursor-pointer'
        />
      </div>

      <p>
        Posted on{' '}
        <span className='text-blue-500'>{formatPostDate(created_at)}</span> by{' '}
        <span className='text-blue-500'>{author}</span>
      </p>
      {individualScheduleModal && (
        <ScheduleModal
          setIndividualScheduleModal={() => setIndividualScheduleModal(false)}
          scheduleImageUrl={scheduleImageUrl}
        />
      )}
    </div>
  );
};

export default IndividualSchedulePost;
