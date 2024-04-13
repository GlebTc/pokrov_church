'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Types Imports
import { User } from '@supabase/supabase-js';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';

// Stores Imports
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';

// Rendering Components Imports
import ScheduleImageUpload from '@/src/app/schedule/add-new-schedule-post/ScheduleImageUpload';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

const AddNewSchedulePostMain = ({ user }: { user: User | null }) => {
  const { language } = useLanguageStore();
  const router = useRouter();
  const { createSchedulePost } = useSchedulePostsStore();

  // States
  const [addImageModal, setAddImageModal] = useState(false);
  const [newSchedulePostFormData, setNewSchedulePostFormData] =
    useState<SchedulePostTypes>({
      id: '',
      title: '',
      author: user?.email || '',
      scheduleImageUrl: '',
      created_at: new Date().toISOString().slice(0, 10),
    });

  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSchedulePostFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSchedulePost(newSchedulePostFormData);
    setNewSchedulePostFormData({
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
        {language === 'en' ? 'Add New Schedule Post' : 'Добавить Расписание'}
      </h2>
      {addImageModal && (
        <ScheduleImageUpload
          setAddImageModal={setAddImageModal}
          setNewSchedulePostFormData={setNewSchedulePostFormData}
          newSchedulePostFormData={newSchedulePostFormData}
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
            value={newSchedulePostFormData.created_at}
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
            value={newSchedulePostFormData.title}
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
            value={newSchedulePostFormData.author}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
      </form>
      <div className='UPLOADED_IMAGE_CONTAINER mb-4'>
        {newSchedulePostFormData.scheduleImageUrl && (
          <div className='w-[300px] '>
            <Image
              src={newSchedulePostFormData.scheduleImageUrl}
              alt={newSchedulePostFormData.title}
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
          onClick={() => setAddImageModal(true)}
        >
          {language === 'en' ? 'Add Image' : 'Добавить изображение'}
        </button>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 duration-300'
          onClick={handleSubmit}
        >
          {language === 'en' ? 'Add New Schedule Post' : 'Добавить расписание'}
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

export default AddNewSchedulePostMain;
