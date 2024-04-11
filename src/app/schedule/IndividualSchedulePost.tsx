'use client';
import { useState } from 'react';
import { formatPostDate } from '@/src/app/utils/dateFormat';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import Image from 'next/image';
import ScheduleModal from './ScheduleModal';
import DeleteSchedulePostButton from './DeleteSchedulePostButton';
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';

const IndividualSchedulePost: React.FC<any | SchedulePostTypes> = ({
  user,
  id,
  created_at,
  title,
  author,
  scheduleImageUrl,
}) => {
  const [individualScheduleModal, setIndividualScheduleModal] = useState(false);
  const { deletePost } = useSchedulePostsStore();

  // Handle Delete Function
  const handleDelete = () => {
    deletePost(id);
  };

  return (
    <div
      key={id}
      className='flex flex-col mt-8'
    >
      <h3 className='text-xl font-semibold text-center mb-4'>{title}</h3>
      <p className='mb-4 text-center'>
        Posted on{' '}
        <span className='text-blue-500'>{formatPostDate(created_at)}</span> by{' '}
        <span className='text-blue-500'>{author}</span>
      </p>
      <div className='w-full flex justify-center'>
        {scheduleImageUrl ? (
          <Image
            onClick={() => setIndividualScheduleModal(true)}
            src={scheduleImageUrl}
            alt='Schedule Image'
            width={500}
            height={600}
            className='rounded-md p-1 border-2 object-contain cursor-pointer'
          />
        ) : (
          <p className='text-center text-gray-500'>
            No Schedule Image Available
          </p>
        )}
      </div>
      {user && (
        <div
          className='flex justify-center items-center gap-4 mt-4'
          onClick={handleDelete}
        >
          <DeleteSchedulePostButton />
        </div>
      )}
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
