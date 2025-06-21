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

// Functional Components Imports
import { createClient } from '@/src/app/utils/supabase';
import deleteScheduleImage from '@/src/app/utils/deleteImage';

const AddNewSchedulePostMain = ({ user }: { user: User | null }) => {
  // Initializations
  const supabaseSchedule = createClient();
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
  const handleCancel = async () => {
    // Delete stored image prior to cancel
    if (newSchedulePostFormData?.scheduleImageUrl) {
      await deleteScheduleImage({
        imageUrl: newSchedulePostFormData.scheduleImageUrl,
        table_name: 'schedule-post-images',
      });
    }

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
    <div className='ADD_NEW_SCHEDULE_POST_MAIN_CONTAINER flex flex-col gap-8'>
      <h2 className='ADD_NEW_SCHEDULE_POST_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-8'>
        {language === 'en'
          ? 'Add New Schedule Post'
          : 'Добавить новое расписание'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className='ADD_NEW_SCHEDULE_POST_FORM_CONTAINER flex flex-col gap-4'
      >
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
        <div className='mb-4'>
          <label
            htmlFor='created_at'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Date' : 'Дата'}
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
      <div className='BUTTONS_CONTAINER flex gap-4'>
        <button
          onClick={() => setAddImageModal(true)}
          className='bg-blue-500 text-white rounded-md px-4 py-2 font-bold hover:bg-blue-600 duration-300'
        >
          {language === 'en' ? 'Add Image' : 'Добавить изображение'}
        </button>
        <button
          onClick={handleSubmit}
          className='bg-green-500 text-white rounded-md px-4 py-2 font-bold hover:bg-green-600 duration-300'
        >
          {language === 'en' ? 'Submit' : 'Отправить'}
        </button>
        <button
          onClick={handleCancel}
          className='bg-red-500 text-white rounded-md px-4 py-2 font-bold hover:bg-red-600 duration-300'
        >
          {language === 'en' ? 'Cancel' : 'Отмена'}
        </button>
      </div>
      {addImageModal && (
        <ScheduleImageUpload
          setAddImageModal={setAddImageModal}
          setNewSchedulePostFormData={setNewSchedulePostFormData}
          newSchedulePostFormData={newSchedulePostFormData}
        />
      )}
    </div>
  );
};

export default AddNewSchedulePostMain;
