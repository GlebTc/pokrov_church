'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Types Imports
import { User } from '@supabase/supabase-js';
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';

// Stores Imports
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsPostsStore } from '@/src/app/utils/stores/newsPostsStore';

// Rendering Components Imports
import NewsImageUpload from '@/src/app/news/add-new-news-post/NewsImageUpload';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

// Functional Components Imports
import Tiptap from '@/src/app/components/reusable/textEditor/Tiptap';
import { createClient } from '@/src/app/utils/supabase';
import deleteImage from '@/src/app/utils/deleteImage';

const AddNewNewsPostMain = ({ user }: { user: User | null }) => {
  // Initializations
  const supabaseNews = createClient();
  const { language } = useLanguageStore();
  const router = useRouter();
  const { createNewsPost } = useNewsPostsStore();

  // States
  const [addImageModal, setAddImageModal] = useState(false);
  const [newNewsPostFormData, setNewNewsPostFormData] = useState<NewsPostTypes>(
    {
      id: '',
      title: '',
      author: user?.email || '',
      content: '',
      newsImageUrl: '',
      created_at: new Date().toISOString().slice(0, 10),
    }
  );

  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNewsPostFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleContentChange Function
  const handleContentChange = (contentInput: any) => {
    setNewNewsPostFormData((prevData) => ({
      ...prevData,
      content: contentInput,
    }));
  };

  // Form Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewsPost(newNewsPostFormData);
    setNewNewsPostFormData({
      id: '',
      title: '',
      author: '',
      content: '',
      newsImageUrl: '',
      created_at: '',
    });
    router.push('/news');
  };

  // Cancel Function
  const handleCancel = async () => {
    // Delete stored image prior to cancel
    if (newNewsPostFormData?.newsImageUrl) {
      await deleteImage({
        imageUrl: newNewsPostFormData.newsImageUrl,
        table_name: 'news-post-images',
      });
    }

    router.push('/news');
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
    <div className='ADD_NEW_NEWS_POST_MAIN_CONTAINER flex flex-col gap-8'>
      <h2 className='ADD_NEW_NEWS_POST_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Add New News Post' : 'Добавить новую новость'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className='ADD_NEW_NEWS_POST_FORM_CONTAINER flex flex-col gap-4'
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
            value={newNewsPostFormData.title}
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
            value={newNewsPostFormData.author}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Content' : 'Содержание'}
          </label>
          <Tiptap
            content={newNewsPostFormData.content}
            onChange={handleContentChange}
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
            value={newNewsPostFormData.created_at}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
      </form>
      <div className='UPLOADED_IMAGE_CONTAINER mb-4'>
        {newNewsPostFormData.newsImageUrl && (
          <div className='w-[300px] '>
            <Image
              src={newNewsPostFormData.newsImageUrl}
              alt={newNewsPostFormData.title}
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
        <NewsImageUpload
          setAddImageModal={setAddImageModal}
          setNewNewsPostFormData={setNewNewsPostFormData}
          newNewsPostFormData={newNewsPostFormData}
        />
      )}
    </div>
  );
};

export default AddNewNewsPostMain;
