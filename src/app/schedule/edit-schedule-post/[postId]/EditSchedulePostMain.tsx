'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Types
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import { User } from '@supabase/supabase-js';

//Stores
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';

// Components
import EditScheduleImageUpload from '@/src/app/schedule/edit-schedule-post/EditScheduleImageUpload';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

const EditSchedulePostMain = ({
  user,
  postData,
}: {
  user: User | null;
  postData: any;
}) => {
  const { language } = useLanguageStore();
  const router = useRouter();
  const { editPost } = useSchedulePostsStore();

  // States
  const [editImageModal, setEditImageModal] = useState(false);
  const [schedulePostEditData, setSchedulePostEditData] =
    useState<SchedulePostTypes>({
      id: postData[0]?.id,
      title: postData[0]?.title,
      author: postData[0]?.author,
      scheduleImageUrl: postData[0]?.scheduleImageUrl,
      created_at: new Date().toISOString().slice(0, 10),
    });


  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSchedulePostEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editPost(schedulePostEditData.id, schedulePostEditData);
    setSchedulePostEditData({
      id: '',
      title: '',
      author: '',
      scheduleImageUrl: '',
      created_at: '',
    });
    router.push('/schedule');
  };

  // Cancel Function
  const handleCancel = () => {
    router.push('/schedule');
  };

  // Unauthorized User
  if (!user) {
    return (
      <div>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className='ADD_NEW_POST_MAIN_FORM_CONTAINER inset-0 flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-bold mb-4'>
        {language === 'en' ? 'Edit Schedule Post' : 'Редактировать расписание'}
      </h2>
      {editImageModal && (
        <EditScheduleImageUpload
          setAddImageModal={setEditImageModal}
          setSchedulePostEditData={setSchedulePostEditData}
          schedulePostEditData={schedulePostEditData}
        />
      )}
      <form className='w-full'>
        <div className='mb-4'>
          <label
            htmlFor='created_at'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Created At' : 'Дата создания'}
          </label>
          <input
            type='date'
            id='created_at'
            name='created_at'
            value={schedulePostEditData.created_at}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Title' : 'Заголовок'}
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={schedulePostEditData.title}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='author'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Author' : 'Автор'}
          </label>
          <input
            type='text'
            id='author'
            name='author'
            value={schedulePostEditData.author}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
      </form>
      <div className='UPLOADED_IMAGE_CONTAINER mb-4'>
        {schedulePostEditData.scheduleImageUrl && (
          <div className='w-[300px] '>
            <Image
              src={schedulePostEditData.scheduleImageUrl}
              alt={schedulePostEditData.title}
              width={300}
              height={300}
              className='rounded-md'
            />
          </div>
        )}
      </div>
      <div className='BUTTONS_CONTAINER flex flex-col sm:flex-row gap-4'>
        <button
          className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500 duration-300'
          onClick={() => setEditImageModal(true)}
        >
          {language === 'en' ? 'Edit Image' : 'Редактировать изображение'}
        </button>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 duration-300'
          onClick={handleSubmit}
        >
          {language === 'en' ? 'Edit Schedule Post' : 'Редактировать расписани'}
        </button>
        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 duration-300'
          onClick={handleCancel}
        >
          {language === 'en' ? 'Cancel' : 'Отменить'}
        </button>
      </div>
    </div>
  );
};

export default EditSchedulePostMain;
