'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types Imports
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';

// Stores Imports
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

// Rendering Components Imports
import ScheduleImageModal from './ScheduleImageModal';
import DeleteSchedulePostButton from './(schedulePostButtons)/DeleteSchedulePostButton';
import EditSchedulePostButton from './(schedulePostButtons)/EditSchedulePostButton';

// Functional Components Imports
import { formatPostDate } from '@/src/app/utils/dateFormat';

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
        {useLanguageStore().language === 'en' ? 'Posted on ' : 'Опубликовано '}
        <span className='text-blue-500'>{formatPostDate(created_at)}</span>
        {useLanguageStore().language === 'en' ? ' by ' : ' от '}
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
            {useLanguageStore().language === 'en'
              ? 'No Image Available'
              : 'Изображение отсутствует'}
          </p>
        )}
      </div>



      {user && (
        <div className='flex flex-col md:flex-row justify-center gap-4'>
          <div
            className='flex justify-center items-center gap-4 mt-4'
            onClick={handleDelete}
          >
            <DeleteSchedulePostButton />
          </div>
          <Link
            href={`/schedule/edit-schedule-post/${id}`}
            className='flex justify-center items-center gap-4 mt-4'
          >
            <EditSchedulePostButton />
          </Link>
        </div>
      )}
      {individualScheduleModal && (
        <ScheduleImageModal
          setIndividualScheduleModal={() => setIndividualScheduleModal(false)}
          scheduleImageUrl={scheduleImageUrl}
        />
      )}
    </div>
  );
};

export default IndividualSchedulePost;
